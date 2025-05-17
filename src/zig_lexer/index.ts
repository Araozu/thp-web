import { native_lex_sync, type THPZigOutput, type ZigError } from "../lexer/highlighter";
import { HighlightLevel } from "../lexer/types";
import { absolute_to_line_column } from "./utils";
import { QueuedHighlighter } from "./queued";

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
	// FIXME: receive from compiler
	const ref = { start: 5, end: 9, info: ":: String" }

	// Each item in the array represents a line
	let lines: OutputLines = new Map();

	// add tokenized lines
	new QueuedHighlighter(code, lines, result.tokens, [ref], result.errors).process();

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

/// Given an array of THP errors,
/// renders lines for each of them.
/// Mutates the passed lines array
function render_error_lines(input: string, errors: Array<ZigError>, lines: OutputLines) {
	const error_base_span = `<div class="relative inline-block w-full before:h-full before:block before:absolute before:left-0 before:w-[calc(100%+1.5rem)] before:-translate-x-3 before:bg-red-200 before:dark:bg-red-950" style="white-space: initial">`;
	const error_message_span = `<div class="relative flex gap-2 dark:text-red-200 text-red-900 font-bold">`;


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

		const error_msg = `<span>${spaces}╰╴${error.reason}</span>`;
		const tooltip = error.help ? `<span title="${error.help}" class="flex items-center"><i class="ph-bold ph-question"></i></span>` : ""

		lines_array.push(
			error_base_span +
			error_message_span +
			error_msg +
			tooltip +
			"</div>" +
			"</div>"
		)
	}
}
