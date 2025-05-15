
/**
 * Transform an absolute position in source code to a line:column combination.
 *
 * Both line and column are 1-based
 *
 * @param input the source code
 * @param absolute the absolute position
 */
export function absolute_to_line_column(
	input: string,
	absolute: number,
): [number, number] {
	let line_count = 1;
	let last_newline_pos = 0;

	// Count lines
	for (let i = 0; i < input.length; i += 1) {
		if (i === absolute) {
			break;
		}

		if (input[i] === "\n") {
			line_count += 1;
			last_newline_pos = i;
		}
	}

	return [line_count, absolute - last_newline_pos];
}
