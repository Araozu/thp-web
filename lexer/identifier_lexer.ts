import type { Token } from "./lexer.ts";
import { is_identifier_char } from "./utils.ts";

/**
 * Scans an identifier, at the given position in the input string.
 * This function assumes that the character at the given position is a letter.
 */
export function scan_identifier(input: string, starting_position: number): [Token, number] {
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

    return [{ v: value, token_type: check_keyword(value) }, pos];
}

function check_keyword(value: string): string {
    const keywords = ["case", "static", "const", "enum", "loop", "use", "break", "catch", "continue", "do", "else", "finally", "for", "fun", "if", "in", "fn", "nil", "return", "throw", "try", "while", "type", "match", "with", "of", "abstract", "class", "interface", "private", "pub", "map", "override", "open", "init", "val", "var", "mut", "clone"];

    if (keywords.includes(value)) {
        return "keyword";
    }
    return "identifier";
}

