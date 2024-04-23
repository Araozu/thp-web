import { scan_identifier } from "./identifier_lexer";
import { scan_number } from "./number_lexer";
import { scan_string } from "./string_lexer";
import { is_digit, is_lowercase, is_uppercase } from "./utils";

export type Token = {
    v: string,
    token_type: string,
};

/**
 * Lexes a string of THP code, and returns an array of tokens. Unlike a regular
 * lexer, whitespace and other characters are not ignored, and are instead treated
 * as a default token.
 * 
 * This lexer implements a subset of the grammar defined in the THP language specification,
 * only recognizing the following tokens:
 * - Identifier
 * - Datatype
 * - String
 * - Number
 * - Single line comment
 * - Multi line comment
 * - Keywords
 * 
 * @param code Code to lex
 * @returns An array of all the tokens found
 */
export function lex(code: string): Array<Token> {
    const code_len = code.length;
    const tokens: Array<Token> = [];

    let current_pos = 0;
    let current_default_token = "";

    while (current_pos < code_len) {
        const c = code[current_pos];

        // try to scan a number
        if (is_digit(c)) {
            // if the current default token is not empty, push it to the tokens array
            if (current_default_token !== "") {
                tokens.push({ v: current_default_token, token_type: "" });
                current_default_token = "";
            }

            // lex a number
            const [token, next] = scan_number(code, current_pos);
            current_pos = next;
            tokens.push(token);
            continue;
        }
        // try to scan an identifier/keyword
        else if (is_lowercase(c) || c === "_") {
            // if the current default token is not empty, push it to the tokens array
            if (current_default_token !== "") {
                tokens.push({ v: current_default_token, token_type: "" });
                current_default_token = "";
            }

            const [token, next] = scan_identifier(code, current_pos);
            current_pos = next;
            tokens.push(token);
            continue;
        }
        // try to scan a datatype
        else if (is_uppercase(c)) {
            // if the current default token is not empty, push it to the tokens array
            if (current_default_token !== "") {
                tokens.push({ v: current_default_token, token_type: "" });
                current_default_token = "";
            }

            const [token, next] = scan_identifier(code, current_pos, true);
            current_pos = next;
            tokens.push(token);
            continue;
        }
        // try to scan a string
        else if (c === "\"") {
            // if the current default token is not empty, push it to the tokens array
            if (current_default_token !== "") {
                tokens.push({ v: current_default_token, token_type: "" });
                current_default_token = "";
            }

            const [token, next] = scan_string(code, current_pos);
            current_pos = next;
            tokens.push(token);
            continue;
        }
        // try to scan a comment
        else if (c === "/" && code[current_pos + 1] === "/") {
            // if the current default token is not empty, push it to the tokens array
            if (current_default_token !== "") {
                tokens.push({ v: current_default_token, token_type: "" });
                current_default_token = "";
            }

            let comment = "";
            let pos = current_pos;

            while (pos < code_len) {
                const char = code[pos];

                if (char === "\n") {
                    break;
                }

                comment += char;
                pos++;
            }

            tokens.push({ v: comment, token_type: "comment" });
            current_pos = pos;
            continue;
        }
        // replace < with &lt;
        else if (c === "<") {
            current_default_token += "&lt;";
            current_pos++;
            continue;
        }

        current_default_token += c;
        current_pos++;
    }

    // if there was a default token, push it to the tokens array
    if (current_default_token !== "") {
        tokens.push({ v: current_default_token, token_type: "" });
        current_default_token = "";
    }

    return tokens;
}


