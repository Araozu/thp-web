import { spawn } from "node:child_process";
import { leftTrimDedent } from "../components/utils";

export interface Token {
    token_type: TokenType
    value: string
    position: number
}

type TokenType =
    "Identifier" |
    "Datatype" |
    "Int" |
    "Float" |
    "String" |
    "Operator" |
    "LeftParen" |
    "RightParen" |
    "LeftBracket" |
    "RightBracket" |
    "LeftBrace" |
    "RightBrace" |
    "NewLine" |
    "Comment" |
    "MultilineComment" |
    "Comma" |
    "INDENT" |
    "DEDENT" |
    "VAL" |
    "VAR" |
    "EOF" |
    "FUN";

export interface Err {
    Lex?: LexError
    Syntax?: SyntaxError
}

export interface LexError {
    position: number
    reason: string
}

export interface SyntaxError {
    error_start: number
    error_end: number
    reason: string
}

export interface TokenizeResult {
    Ok?: Token[],
    TokensOnly?: [Token[], Err],
    Err?: Err,
}

const error_classes = "underline decoration-wavy decoration-red-500";

export async function native_highlighter(code: string): Promise<[string, string, string | null]> {
    let formatted_code = leftTrimDedent(code).join("\n");

    let result: TokenizeResult;
    try {
        result = await native_lex(formatted_code);
    } catch (error) {
        return compiler_error(formatted_code, error as Error);
    }

    if (result.Err) {
        return lex_error_highlighter(formatted_code, result.Err!.Lex!);
    }
    else if (result.TokensOnly) {
        const [tokens, error] = result.TokensOnly!;
        return syntax_error_highlighter(formatted_code, tokens, error.Syntax!);
    }

    const tokens = result.Ok!;

    const output = highlight_tokens(formatted_code, tokens);

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

    // TODO: Transform absolute posijion (error.position) into line:column
    return [all, "Lexical", error.reason + " at position " + error.position]
}

function syntax_error_highlighter(code: string, tokens: Array<Token>, error: SyntaxError): [string, string, string] {
    const highlighted = highlight_tokens(code, tokens, error.error_start, error.error_end);

    const error_message = `${error.reason} from position ${error.error_start} to ${error.error_end}`;
    return [highlighted, "Syntax", error_message];
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

        let is_errored = (token_start == error_start);

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
    const keywords = ["throws", "extends", "constructor", "case", "static", "const",
        "enum", "union", "loop", "use", "break", "catch", "continue", "as", "do",
        "else", "finally", "for", "fun", "if", "in", "fn", "nil", "return", "throw",
        "try", "while", "type", "match", "with", "of", "abstract", "class", "interface",
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
