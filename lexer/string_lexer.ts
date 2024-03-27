import type { Token } from "./lexer.ts";

export function scan_string(input: string, starting_position: number): [Token, number] {
    let value = "\"";
    let pos = starting_position + 1;

    while (pos < input.length) {
        const c = input[pos];

        if (c === "\"") {
            value += c;
            pos += 1;
            break;
        }
        if (c === "\n") {
            // todo: error handling, return an error indicator and the caller should render a red wavy underline
            break;
        }
        if (c === "\\") {
            const next_char = input[pos + 1];
            value += handle_escape_char(next_char);
            pos += 2;
            continue;
        }

        value += c;
        pos += 1;
    }

    return [{ v: value, token_type: "string" }, pos];
}

function handle_escape_char(next_char: string): string {
    switch (next_char) {
        case "n":
            return "\\n"
        case "t":
            return "\\t"
        case "r":
            return "\\r"
        case "\"":
            return "\\\""
        case "\\":
            return "\\\\"
        default:
            return "\\" + next_char
    }
}

