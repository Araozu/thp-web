
/** 
 * Performs the following:
 * - Removes the first & last line, if they are empty
 * - Picks the indentation level from the first non-white line
 * - Dedents the following lines
*/
export function trimAndDedent(input: string): Array<string> {
    let lines = input.split("\n");

    // Remove empty lines at the start
    while (lines[0] === "") {
        lines = lines.slice(1);
    }

    // Get indentation level
    let indentationLevel = 0;
    for (const char of lines[0]!) {
        if (char === " ") {
            indentationLevel += 1;
        } else {
            break;
        }
    }

    // Enforce indentation, or trim
    for (let i = 0; i < lines.length; i += 1) {
        // If the line is empty, continue
        const characters = lines[i]!.split("");
        if (characters.length === 0) {
            continue;
        }

        // If all characters are whitespace, append just a newline
        const nonWhitespace = characters.find((x) => x !== " ");
        if (nonWhitespace === undefined) {
            lines[i] = "";
            continue;
        }

        // Enforce indentation
        if (characters.length < indentationLevel) {
            throw new Error("Invalid indentation while parsing THP code: " + lines[i]);
        }
        let currentIndentation = 0;
        for (const c of characters) {
            if (c === " ") { currentIndentation += 1 }
            else { break; }
        }
        if (currentIndentation < indentationLevel) {
            throw new Error("Invalid indentation while parsing THP code: " + lines[i]);
        }

        lines[i] = characters.slice(4).join("");
    }


    // Remove empty lines at the end
    let endPosition = lines.length - 1;
    while (true) {
        if (lines[endPosition] === "") {
            lines = lines.slice(0, -1);
            endPosition -= 1;
        } else {
            break;
        }
    }

    return lines;
}

export function leftTrimDedent(input: string): Array<string> {
    let lines = input.split("\n");
    let output: Array<string> = [];

    // Ignore first line
    if (lines[0] === "" && lines.length > 1) {
        lines = lines.slice(1);
    }

    // Get indentation level of the first line
    let indentationLevel = 0;
    for (const char of lines[0]!) {
        if (char === " ") {
            indentationLevel += 1;
        } else {
            break;
        }
    }

    for (const line of lines) {
        // Ignore empty lines
        if (line === "") {
            output.push("");
            continue;
        }
        output.push(trimWhitespace(line, indentationLevel));
    }

    if (output.length > 1 &&  output[output.length - 1] === "") {
        output = output.slice(0, -1);
    }

    return output;
}

function trimWhitespace(input: string, count: number): string {
    let indentCount = 0;

    for (const char of input) {
        if (char === " ") {
            indentCount += 1;
        } else {
            break;
        }
    }

    if (indentCount >= count || indentCount == input.length) {
        return input.slice(count);
    } else {
        throw new Error(`Invalid indentation while trimming: Expected ${count} spaces, got ${indentCount}`);
    }
}

