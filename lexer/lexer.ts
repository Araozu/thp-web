import { lex_number } from "./number_lexer.ts";
import { is_digit } from "./utils.ts";

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

        let next_token: Token | null = null;
        let next_position: number | null = null;

        if (is_digit(c)) {
            // if the current default token is not empty, push it to the tokens array
            if (current_default_token !== "") {
                tokens.push({ v: current_default_token, token_type: "" });
                current_default_token = "";
            }

            // lex a number
            const [token, next] = lex_number(code, current_pos);
            current_pos = next;
            tokens.push(token);
            continue;
        }

        // here, check if a token was found
        if (next_token !== null && next_position !== null) {
            // if there was a default token, push it to the tokens array
            if (current_default_token !== "") {
                tokens.push({ v: current_default_token, token_type: "" });
                current_default_token = "";
            }

            // then push the new token found
            tokens.push(next_token);
            current_pos = next_position;
            continue;
        }
        // otherwise, add the current character to the default token
        else {
            current_default_token += c;
            current_pos++;
        }
    }

    // if there was a default token, push it to the tokens array
    if (current_default_token !== "") {
        tokens.push({ v: current_default_token, token_type: "" });
        current_default_token = "";
    }

    return tokens;
}


