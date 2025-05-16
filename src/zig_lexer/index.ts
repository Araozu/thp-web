import { native_lex_sync, translate_token_type, type THPZigOutput, type ZigError, type ZigToken } from "@/lexer/highlighter";
import { HighlightLevel } from "@/lexer/types";
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

	// Each item in the array represents a line
	let lines: OutputLines = new Map();

	// add tokenized lines
	new QueuedHighlighter(code, result.tokens, [], lines).process();

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


function render_tokens(input: string, _tokens: ZigToken[], output_lines: OutputLines) {
	// FIXME: receive from parent
	const ref = { start: 5, end: 9, info: ":: String" }
	const ref_q = [ref]
	const tokens = _tokens.filter(t => t.token_type !== "Newline")

	// iterate over every character
	let current_pos = 0;
	let line_number = 0;
	let line_buffer: Array<string> = []

	while (current_pos < input.length) {
		const c = input[current_pos]!;

		if (c === "\n") {
			let lines = output_lines.get(line_number);
			if (!lines) {
				lines = [];
				output_lines.set(line_number, lines);
			}
			lines.push(line_buffer.join(""));
			line_buffer = [];

			current_pos += 1;
			line_number += 1;
			continue;
		}

		// FIXME: implement polymorphism
		// peek ref queue, check if we are at the start of a ref
		if (!!ref_q[0] && current_pos === ref_q[0]!.start) {
			// process the ref
			const r = ref_q.shift()!;
			const [html, new_pos] = process_ref(input, r);
			current_pos = new_pos;
			line_buffer.push(html);
			continue;
		}
		// check for token
		if (!!tokens[0] && tokens[0]!.start_pos === current_pos) {
			const token = tokens.shift()!;
			const [token_html, new_pos] = process_token(input, token);
			current_pos = new_pos;
			line_buffer.push(token_html);
			continue;
		}

		line_buffer.push(c);
		current_pos += 1;
	}


	if (line_buffer.length > 0) {
		let lines = output_lines.get(line_number);
		if (!lines) {
			lines = [];
			output_lines.set(line_number, lines);
		}
		lines.push(line_buffer.join(""));
		line_buffer = [];
	}
}

type ref_t = { start: number, end: number, info: string }

// processes a single ref, sets styles as neccesary. assumes the current position is at the start of the ref.
// returns the new position from which to conitinue
function process_ref(input: string, r: ref_t): [string, number] {
	const ref_start_tag = `<span 
		class="ref before:hidden hover:before:inline-block before:content-[attr(lsp)] before:absolute before:translate-y-5 before:whitespace-pre-wrap before:px-2 before:rounded-sm before:border before:border-c-thp before:dark:bg-zinc-950 before:bg-zinc-100
		border-b border-dotted"
		lsp="${r.info}">`;
	const text = input.slice(r.start, r.end);

	return [
		ref_start_tag + text + "</span>",
		r.end,
	]
}

function process_token(input: string, t: ZigToken): [string, number] {
	console.log("❤️")
	const token_end = t.start_pos + t.value.length;
	const token_type = translate_token_type(t.token_type, t.value);
	const token_start_tag = `<span class="token ${token_type}">`;
	const text = input.slice(t.start_pos, token_end);

	return [
		token_start_tag + text + "</span>",
		token_end,
	]
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
