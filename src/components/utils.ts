
/** 
 * Performs the following:
 * - Removes the first & last line, if they are empty
 * - Picks the indentation level from the first non-white line
 * - Dedents the following lines
*/
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

