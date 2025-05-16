import type { ZigToken } from "@/lexer/highlighter";

type Reference = { start: number, end: number, info: string }

type OutputLines = Map<number, Array<string>>

export class QueuedHighlighter {
	private current_pos = 0;
	private line_number = 0;

	private readonly code_length: number;
	private line_buffer: Array<string> = [];

	constructor(
		private readonly code: string,
		private tokens: Array<ZigToken>,
		private references: Array<Reference>,
		private output_lines: OutputLines
	) {
		this.code_length = code.length;
	}

	private hasNext(): boolean {
		return this.current_pos < this.code_length;
	}

	private next() {
		const c = this.code[this.current_pos]!;

		if (c === "\n") {
			this.append_output();
			return;
		}

		this.line_buffer.push(c);
		this.current_pos += 1;
	}

	public process() {
		while (this.hasNext()) {
			this.next();
		}

		if (this.line_buffer.length > 0) {
			this.append_output();
		}
	}

	private append_output() {
		let lines = this.output_lines.get(this.line_number);
		if (!lines) {
			lines = [];
			this.output_lines.set(this.line_number, lines);
		}
		lines.push(this.line_buffer.join(""));
		this.line_buffer = [];
		this.current_pos += 1;
		this.line_number += 1;
	}
}
