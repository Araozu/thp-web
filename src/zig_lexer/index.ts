import { native_lex_sync, type THPZigOutput, type ZigError } from "@/lexer/highlighter";
import { HighlightLevel } from "@/lexer/types";
import { absolute_to_line_column } from "./utils";

type HighlightResult = {
	html: string;
	error_message?: string;
	raw_compiler_output?: THPZigOutput;
}

type OutputLines = Map<number, Array<string>>

export function native_highlighter_sync(
	code: string,
	level = HighlightLevel.Semantic,
): HighlightResult {
	let result = native_lex_sync(code, level);

	// Each item in the array represents a line
	let lines: OutputLines = new Map();

	// add tokenized lines
	render_tokens(code, lines);

	// add error lines
	render_error_lines(code, result.errors, lines);

	const output_html = lines.entries()
		.toArray()
		.toSorted(([line_number_1], [line_number_2]) => line_number_1 - line_number_2)
		.map(([, lines]) => lines.join("\n"))
		.join("\n");

	return {
		html: output_html,
		raw_compiler_output: result,
	};
}

function render_tokens(input: string, output_lines: OutputLines) {
	const input_lines = input.split("\n");
	for (let i = 0; i < input_lines.length; i++) {
		let lines_array = output_lines.get(i);
		if (!lines_array) {
			lines_array = [];
			output_lines.set(i, lines_array);
		}

		lines_array.push(input_lines[i]!);
	}
}


/// Given an array of THP errors,
/// renders lines for each of them.
/// Mutates the passed lines array
function render_error_lines(input: string, errors: Array<ZigError>, lines: OutputLines) {
	const error_base_span = `<span class="relative inline-block w-full before:h-full before:block before:absolute before:left-0 before:w-[calc(100%+1.5rem)] before:-translate-x-3 before:bg-red-200 before:dark:bg-red-950" style="white-space: initial">`;
	const error_message_span = `<span class="relative dark:text-red-200 text-red-900 font-bold">`;

	for (const error of errors) {
		const [line_number, col_number] = absolute_to_line_column(
			input,
			error.start_position,
		);

		// number of leading spaces
		let spaces_len = col_number - 1;
		if (spaces_len < 0) {
			spaces_len = 0;
		}
		const spaces = new Array(spaces_len).fill("&nbsp;").join("");

		let lines_array = lines.get(line_number - 1);
		if (!lines_array) {
			lines_array = [];
			lines.set(line_number, lines_array);
		}

		const error_msg = `${spaces}╰╴${error.reason}`;

		lines_array.push(
			error_base_span +
			error_message_span +
			error_msg +
			"</span>" +
			"</span>"
		)
	}
}
