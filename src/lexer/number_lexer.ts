import type { Token } from "./lexer";
import { is_digit } from "./utils";

/**
 * Scans a number, at the given position in the input string.
 * This function assumes that the character at the given position is a digit.
 * It follows this grammar:
 * 
 * @param input the input string
 * @param pos the position to start scanning from
 * @returns 
 */
export function scan_number(input: string, pos: number): [Token, number] {
    const [token_value, next] = scan_decimal(input, pos);

    return [{ v: token_value, token_type: "number" }, next];
}

function scan_decimal(input: string, starting_position: number): [string, number] {
    let current_value = "";
    let pos = starting_position;

    while (pos < input.length) {
        const c = input[pos];

        if (c === ".") {
            // todo
            throw new Error("Not implemented");
        }
        else if (c == "e" || c == "E") {
            // todo
            throw new Error("Not implemented");
        }
        else if (is_digit(c)) {
            current_value += c;
            pos += 1;
        }
        else {
            break;
        }

    }

    return [current_value, pos];
}


