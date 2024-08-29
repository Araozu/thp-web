import { spawn } from "node:child_process";
import { leftTrimDedent } from "../components/utils";
import { HighlightLevel } from "./types";
import type { LexError, SyntaxError, Token, TokenizeResult, TokenType } from "./types";

const error_classes = "underline underline-offset-4 decoration-wavy decoration-red-500";

export async function native_highlighter(code: string, level = HighlightLevel.Syntactic): Promise<[string, string, string | null]> {
    let formatted_code = leftTrimDedent(code).join("\n");

    try {
        let result = await native_lex(formatted_code);
        return highlight_syntax(formatted_code, result, level);
    } catch (error) {
        return compiler_error(formatted_code, error as Error);
    }
}

function highlight_syntax(code: string, result: TokenizeResult, level: HighlightLevel): [string, string, string | null] {
    let tokens_final: Array<Token>;

    if (result.SemanticError) {
        const [tokens, semanticError] = result.SemanticError;

        if (level === HighlightLevel.Semantic) {
            return semantic_error_highlighter(code, tokens, semanticError.Semantic!);
        } else {
            tokens_final = tokens;
        }
    } else if (result.SyntaxError) {
        const [tokens, syntaxError] = result.SyntaxError;

        if (level === HighlightLevel.Semantic || level === HighlightLevel.Syntactic) {
            return syntax_error_highlighter(code, tokens, syntaxError.Syntax!);
        } else {
            tokens_final = tokens;
        }
    } else if (result.LexError) {
        // There is no error level that bypasses a lex error
        return lex_error_highlighter(code, result.LexError!.Lex!);
    } else if (result.Ok) {
        tokens_final = result.Ok;
    } else {
        console.error(result);
        throw new Error("Web page error: The compiler returned a case that wasn't handled.");
    }

    // At this point all error cases have been handled
    // and tokens_final contains valid tokens.

    const output = highlight_tokens(code, tokens_final);
    return [output, "", null];
}


/**
 * Highlights code that has a lexic error
 */
function lex_error_highlighter(code: string, error: LexError): [string, string, string] {
    // Create a single error token

    const err_pos = error.position;
    const before_err = code.substring(0, err_pos);
    const err_str = code[err_pos];
    const after_err = code.substring(err_pos + 1);

    const token = `<span class="token ${error_classes}">${err_str}</span>`;

    const all = `${before_err}${token}${after_err}`;
    const [error_line, error_column] = absolute_to_line_column(code, error.position);

    // TODO: Transform absolute posijion (error.position) into line:column
    return [all, "Lexical", error.reason + ` at line ${error_line}:${error_column} `]
}

function syntax_error_highlighter(code: string, tokens: Array<Token>, error: SyntaxError): [string, string, string] {
    const highlighted = highlight_tokens(code, tokens, error.error_start, error.error_end);
    const [error_line, error_column] = absolute_to_line_column(code, error.error_start);

    const error_message = `${error.reason} at line ${error_line}:${error_column}`;
    return [highlighted, "Syntax", error_message];
}

function semantic_error_highlighter(code: string, tokens: Array<Token>, error: SyntaxError): [string, string, string] {
    const highlighted = highlight_tokens(code, tokens, error.error_start, error.error_end);
    const [error_line, error_column] = absolute_to_line_column(code, error.error_start);

    const error_message = `${error.reason} at line ${error_line}:${error_column}`;
    return [highlighted, "Semantic", error_message];
}

function compiler_error(code: string, error: Error): [string, string, string] {
    return [code, "Fatal Compiler", error.message];
}

/**
 * Transforms a list of tokens into colored HTML, and underlines errors
 * if present
 * @param input The original source code
 * @param tokens The list of tokens
 * @param error_start Absolute position from where the error starts.
 * @param error_end Absolute position to where the error ends.
 * @returns 
 */
function highlight_tokens(input: string, tokens: Array<Token>, error_start = -1, error_end = -1): string {
    const input_chars = input.split("");
    let output = "";

    let current_pos = 0;
    for (let i = 0; i < tokens.length; i += 1) {
        const t = tokens[i]!;
        const token_start = t.position;
        const token_end = t.position + t.value.length;

        let is_errored = (token_start >= error_start && token_end <= error_end);

        // Some tokens require processing (like multiline comments)

        // There are some tokens that are empty, ignore them
        if (t.value == "") {
            continue;
        }

        // Append all characters before the token
        output += input_chars.slice(current_pos, token_start).join("");

        // Append the token
        const [token_value, new_token_end] = process_token_value_and_end(t.value, t.token_type, token_end);
        const token_type = translate_token_type(t.token_type, token_value);
        output += `<span class="token ${token_type} ${is_errored ? error_classes : ""}">${token_value}</span>`;

        current_pos = new_token_end;
    }

    return output;
}

/**
 * Transform an absolute position in source code to a line:column combination.
 * 
 * Both line and column are 1-based
 * 
 * @param input the source code
 * @param absolute the absolute position
 */
function absolute_to_line_column(input: string, absolute: number): [number, number] {
    let line_count = 1;
    let last_newline_pos = 0;

    // Count lines
    for (let i = 0; i < input.length; i += 1) {
        if (i === absolute) {
            break;
        }

        if (input[i] === "\n") {
            line_count += 1;
            last_newline_pos = i;
        }
    }

    return [line_count, absolute - last_newline_pos];
}

/**
 * Certain tokens store values that differ from the source code representation.
 * For example, the multiline comment token stores the content of the comment
 * without `/*` and `* /`, this function handles those cases.
 * 
 * @param value The value of the token
 * @param token_type The type of the token, used to know if it needs preprocessing
 * @param first_end The position where the token ends according to the token value
 * @returns 
 */
function process_token_value_and_end(value: string, token_type: TokenType, first_end: number): [string, number] {
    let token_value = value;
    let new_end = first_end;
    if (token_type === "MultilineComment") {
        token_value = `/*${token_value}*/`;
        new_end += 4;
    } else if (token_type === "String") {
        token_value = `"${token_value}"`;
        new_end += 2;
    }

    // Escape html and return
    return [
        token_value.replaceAll(/</g, "&lt;").replaceAll(/>/g, "&gt;"),
        new_end
    ];
}

function translate_token_type(tt: TokenType, value: string): string {
    const keywords = ["throws", "extends", "constructor", "static", "const",
        "enum", "union", "use", "break", "catch", "continue", "as", "do",
        "finally", "fun", "fn", "nil", "return", "throw",
        "try", "type", "with", "of", "abstract", "class", "interface",
        "private", "protected", "pub", "override", "open", "init", "val", "var", "mut", "clone"];

    switch (tt) {
        case "Datatype":
            return "class-name";
        case "Identifier": {
            if (keywords.includes(value)) {
                return "keyword";
            }

            return "identifier";
        }
        case "Int":
            return "number";
        case "Float":
            return "number";
        case "String":
            return "string";
        case "Comment":
        case "MultilineComment":
            return "comment";
        // keywords:
        case "VAL":
        case "VAR":
        case "FUN":
        case "IF":
        case "ELSE":
        case "FOR":
        case "IN":
        case "WHILE":
        case "LOOP":
        case "MATCH":
        case "CASE":
            return "keyword";
        default:
            return tt;
    }
}

const native_lex = (code: string) => new Promise<TokenizeResult>((resolve, reject) => {
    // Get binary path from .env
    const binary = import.meta.env.THP_BINARY;
    if (!binary) {
        throw new Error("THP_BINARY not set in .env");
    }

    const subprocess = spawn(binary, ["tokenize"]);
    let response = "";
    let error = "";

    subprocess.stdin.write(code);
    subprocess.stdin.end();

    subprocess.stdout.on("data", (data) => {
        response += data.toString();
    });

    subprocess.stderr.on("data", (data) => {
        error += data.toString();
    });

    subprocess.on("close", (code) => {
        if (code === 0) {
            resolve(JSON.parse(response));
        } else {
            reject(new Error(error));
        }
    });
})
