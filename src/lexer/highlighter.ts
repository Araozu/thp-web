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
        // TODO
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

    const token = `<span class="token underline decoration-wavy decoration-red-500">${err_str}</span>`;

    const all = `${before_err}${token}${after_err}`;

    // TODO: Transform absolute posijion (error.position) into line:column
    return [all, "Lexical", error.reason + " at position " + error.position]
}

function syntax_error_highlighter(code: string, tokens: Array<Token>, error: SyntaxError): [string, string, string] {
    const highlighted = highlight_tokens(code, tokens);

    const error_message = `${error.reason} from position ${error.error_start} to ${error.error_end}`;
    return [highlighted, "Syntax", error_message];
}

function compiler_error(code: string, error: Error): [string, string, string] {
    return [code, "Fatal Compiler", error.message];
}

function highlight_tokens(input: string, tokens: Array<Token>): string {
    const input_chars = input.split("");
    let output = "";

    let current_pos = 0;
    for (let i = 0; i < tokens.length; i += 1) {
        const t = tokens[i]!;
        const token_start = t.position;
        const token_end = t.position + t.value.length;

        // There are some tokens that are empty, ignore them
        if (t.value == "") {
            continue;
        }

        // Append all characters before the token
        output += input_chars.slice(current_pos, token_start).join("");

        // Append the token
        const token_value = t.value.replaceAll(/</g, "&lt;").replaceAll(/>/g, "&gt;");
        const token_type = translate_token_type(t.token_type, token_value);
        output += `<span class="token ${token_type}">${token_value}</span>`;

        current_pos = token_end;
    }

    return output;
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
