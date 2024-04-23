import type { Token } from "./lexer";
import { is_identifier_char } from "./utils";

/**
 * Scans an identifier, at the given position in the input string.
 * This function assumes that the character at the given position is a letter.
 * 
 * @param input the input string
 * @param starting_position the position to start scanning from
 * @param is_datatype whether the identifier is a datatype
 */
export function scan_identifier(input: string, starting_position: number, is_datatype = false): [Token, number] {
    let value = input[starting_position];
    let pos = starting_position + 1;

    while (pos < input.length) {
        const c = input[pos];

        if (is_identifier_char(c)) {
            pos += 1;
            value += c;
        }
        else {
            break;
        }
    }

    if (is_datatype) {
        return [{ v: value, token_type: "class-name" }, pos];
    }
    else {
        return [{ v: value, token_type: check_keyword(value) }, pos];
    }
}

function check_keyword(value: string): string {
    const keywords = ["case", "static", "const", "enum", "loop", "use", "break", "catch", "continue", "do", "else", "finally", "for", "fun", "if", "in", "fn", "nil", "return", "throw", "try", "while", "type", "match", "with", "of", "abstract", "class", "interface", "private", "pub", "override", "open", "init", "val", "var", "mut", "clone"];

    if (keywords.includes(value)) {
        return "keyword";
    }
    return "identifier";
}

