import { spawn } from "node:child_process";
import { leftTrimDedent } from "../components/utils";

export interface LexResult {
    Ok?: Token[]
    Err?: Err
}

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
    Lex: LexError
}

export interface LexError {
    position: number
    reason: string
}


export async function native_highlighter(code: string): Promise<string> {
    let formatted_code = leftTrimDedent(code).join("\n");

    const result = await native_lex(formatted_code);

    if (result.Err) {
        throw new Error(JSON.stringify(result.Err.Lex) + "\n" + code);
    }

    const tokens = result.Ok!;

    const input_chars = formatted_code.split("");
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
    const keywords = ["throws", "extends", "constructor", "case", "static", "const", "enum", "union", "loop", "use", "break", "catch", "continue", "as", "do", "else", "finally", "for", "fun", "if", "in", "fn", "nil", "return", "throw", "try", "while", "type", "match", "with", "of", "abstract", "class", "interface", "private", "pub", "override", "open", "init", "val", "var", "mut", "clone"];

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

const native_lex = (code: string) => new Promise<LexResult>((resolve, reject) => {
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
            reject(error);
        }
    });
})
