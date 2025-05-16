import { translate_token_type, type ZigToken } from "@/lexer/highlighter";

type Reference = { start: number, end: number, info: string }

type OutputLines = Map<number, Array<string>>

type AnnotationEvent = {
	position: number
	is_start: boolean
	data: TokenAnnotation | ReferenceAnnotation
	priority?: number
}

type TokenAnnotation = ZigToken & { type: "token" }
type ReferenceAnnotation = Reference & { type: "reference" }

export class QueuedHighlighter {
	private line_number = 0;
	private readonly events: Array<AnnotationEvent>;

	constructor(
		private readonly code: string,
		tokens: Array<ZigToken>,
		references: Array<Reference>,
		private output_lines: OutputLines
	) {
		// build events from tokens/references
		const events: Array<AnnotationEvent> = []
		for (const token of tokens) {
			events.push({
				position: token.start_pos,
				is_start: true,
				data: { type: "token", ...token },
			});
			events.push({
				position: token.start_pos + token.value.length,
				is_start: false,
				data: { type: "token", ...token },
			});
		}

		// Sort by position, then by isStart (false before true for same position), 
		// then by priority (higher priority closes first, opens last)
		this.events = events.toSorted((a, b) => {
			if (a.position !== b.position) return a.position - b.position;
			if (a.is_start !== b.is_start) return a.is_start ? 1 : -1;
			if (a.is_start) return (b.priority || 0) - (a.priority || 0);
			return (a.priority || 0) - (b.priority || 0);
		});
	}

	public process() {
		const active_annotations = {
			token: [],
			reference: [],
		}

		let currentPos = 0;
		for (const event of this.events) {
			this.outputText(this.code.slice(currentPos, event.position));
			currentPos = event.position;

			if (event.is_start) {
				this.outputAnnotationStart(event);
			} else {
				this.outputAnnotationEnd(event);
			}
		}

		// Output any remaining text
		this.outputText(this.code.substring(currentPos));
	}

	private outputAnnotationStart(event: AnnotationEvent) {
		let token_class = ""
		if (event.data.type === "token") {
			token_class = translate_token_type(event.data.token_type, event.data.value)
		}
		this.push_to_current_line(`<span class="token ${token_class}">`);
	}

	private outputAnnotationEnd(event: AnnotationEvent) {
		this.push_to_current_line(`</span>`)
	}

	private outputText(text: string) {
		if (text.length === 0) return;
		const lines = text.split("\n");

		this.push_to_current_line(lines.shift()!);

		// for all other lines, increase line counter and add
		for (const l of lines) {
			this.line_number += 1;
			this.push_to_current_line(l);
		}
	}

	private push_to_current_line(text: string) {
		const line = this.get_current_line();
		line.push(text);
	}

	private get_current_line() {
		let line = this.output_lines.get(this.line_number);
		if (!line) {
			line = [];
			this.output_lines.set(this.line_number, line);
		}
		return line;
	}
}
