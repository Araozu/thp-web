import { spawn, spawnSync } from "node:child_process";
import { leftTrimDedent } from "../components/utils";
import { HighlightLevel } from "./types";

/**
 * Output of running the thp-zig compiler
 * with the lex option
 */
export interface THPZigOutput {
  errors: ZigError[]
  tokens: ZigToken[]
}

export interface ZigError {
  reason: string
  help?: string
  start_position: number
  end_position: number
  labels: ZigErrorLabel[]
}

export interface ZigErrorLabel {
  message: { static: string }
  start: number
  end: number
}

export interface ZigToken {
  value: string
  token_type: TokenType
  start_pos: number
}

type TokenType =
  | "Int"
  | "Float"
  | "Identifier"
  | "Datatype"
  | "Operator"
  | "Comment"
  | "String"
  | "LeftParen"
  | "RightParen"
  | "LeftBracket"
  | "RightBracket"
  | "LeftBrace"
  | "RightBrace"
  | "Comma"
  | "Newline"
  | "K_Var"



const error_classes =
  "underline underline-offset-4 decoration-wavy decoration-red-500";

/**
 * Highlights code using the compiler
 *
 * Returns:
 * - The tokens as a list of <span /> elements
 * - An error message, if any
 */
export async function native_highlighter(
  code: string,
  level = HighlightLevel.Lexic,
): Promise<[string, string | null]> {
  let formatted_code = leftTrimDedent(code).join("\n");

  try {
    let result = await native_lex(formatted_code, level);
    return highlight_syntax(formatted_code, result);
  } catch (error) {
    return compiler_error(formatted_code, error);
  }
}

export function native_highlighter_sync(
  code: string,
  level = HighlightLevel.Semantic,
): [string, string | null, THPZigOutput] {
  let formatted_code = leftTrimDedent(code).join("\n");

  if (import.meta.env.DEV) {
    try {
      let result = native_lex_sync(formatted_code, level);
      return [...highlight_syntax(formatted_code, result), result];
    } catch (error) {
      return [...compiler_error(formatted_code, error), { errors: [], tokens: [] }];
    }
  }

  const empty_result = { errors: [], tokens: [] };
  try {
    let result = native_lex_sync(formatted_code, level);
    return [...highlight_syntax(formatted_code, result), empty_result];
  } catch (error) {
    return [...compiler_error(formatted_code, error), empty_result];
  }
}

/**
 * Highlights code using the compiler
 *
 * Returns:
 * - The tokens as a list of <span /> elements
 * - An error message, if any
 */
function highlight_syntax(code: string, result: THPZigOutput): [string, string | null] {
  const tokens_html = render_tokens(code, result.tokens, result.errors);
  return [tokens_html, null];
}

/** A fatal error with the THP compiler */
function compiler_error(code: string, error: any): [string, string] {
  console.log(error);
  return [code, "Fatal compiler error"];
}

/**
 * Transforms a list of tokens into colored HTML, and underlines present errors
 *
 * @param input The original source code
 * @param tokens The list of tokens
 * @param error_start Absolute position from where the error starts.
 * @param error_end Absolute position to where the error ends.
 * @returns
 */
function render_tokens(
  input: string,
  tokens: Array<ZigToken>,
  error_labels: Array<ZigError> = [],
): string {
  const input_chars = input.split("");
  let output = "";

  // Collects all the token ranges in all error labels
  const error_ranges: Array<[number, number]> = error_labels.flatMap((error_label) => error_label.labels.map((l): [number, number] => [l.start, l.end]));
  // const error_ranges: Array<[number, number]> = error_labels.map((error_label) => [
  //   error_label.start_position,
  //   error_label.end_position,
  // ]);

  let current_pos = 0;
  for (let i = 0; i < tokens.length; i += 1) {
    const t = tokens[i]!;
    const token_start = t.start_pos;
    const token_end = t.start_pos + t.value.length;

    // check if the current token is in any error label
    let is_errored = false;
    for (const [error_start, error_end] of error_ranges) {
      if (token_start >= error_start && token_end <= error_end) {
        is_errored = true;
        break;
      }
    }

    // There are some tokens that are empty, ignore them
    if (t.value == "") {
      continue;
    }

    // Append all characters before the token
    output += input_chars.slice(current_pos, token_start).join("");

    // Append the token
    const [token_value, new_token_end] = process_token_value_and_end(
      t.value,
      t.token_type,
      token_end,
    );
    const token_type = translate_token_type(t.token_type, token_value);
    output += `<span class="token ${token_type} ${is_errored ? error_classes : ""}">${token_value}</span>`;

    current_pos = new_token_end;
  }

  // at this point `output` is a string with tokens
  // now append the label messages:
  // - split the output by newlines
  // - for every label, append a new line after each error

  const lines = output.split("\n");
  let offset = 0;
  for (const label of error_labels) {
    for (const label2 of label.labels) {

      // get the line number of the label
      const [line_number, col_number] = absolute_to_line_column(
        input,
        label2.start,
      );
      let spaces_len = col_number - 1;
      if (spaces_len < 0) {
        spaces_len = 0;
      }

      const spaces = new Array(spaces_len).fill("&nbsp;").join("");
      lines.splice(
        line_number + offset,
        0,
        create_inline_error_message(spaces, label2.message.static),
      );
      offset += 1;
    }
  }

  return lines.join("\n");
}

function create_inline_error_message(spaces: string, message: string): string {
  return `<span class="relative inline-block w-full before:h-full before:block before:absolute before:left-0 before:w-[calc(100%+1.5rem)] before:-translate-x-3 before:bg-red-200 before:dark:bg-red-950" style="white-space: initial"><span class="relative dark:text-red-200 text-red-900 font-bold">${spaces}╰╴${message}</span></span>`;
}

/**
 * Transform an absolute position in source code to a line:column combination.
 *
 * Both line and column are 1-based
 *
 * @param input the source code
 * @param absolute the absolute position
 */
function absolute_to_line_column(
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

/**
 * Certain tokens store values that differ from the source code representation.
 * For example, the multiline comment token stores the content of the comment
 * without `/*` and `* /`, this function handles those cases.
 *
 * @param value The value of the token
 * @param token_type The type of the token, used to know if it needs preprocessing
 * @param first_end The position where the token ends according to the token value
 * @returns
 */
function process_token_value_and_end(
  value: string,
  token_type: TokenType,
  first_end: number,
): [string, number] {
  let token_value = value;
  let new_end = first_end;

  //if (token_type === "MultilineComment") {
  //  token_value = `/*${token_value}*/`;
  //  new_end += 4;
  // } else if (token_type === "String") {
  if (token_type === "String") {
    token_value = `${token_value}`;
    new_end += 2;
  }

  // Escape html and return
  return [
    token_value.replaceAll(/</g, "&lt;").replaceAll(/>/g, "&gt;"),
    new_end,
  ];
}

export function translate_token_type(tt: TokenType, value: string): string {
  const keywords = [
    "throws",
    "extends",
    "constructor",
    "static",
    "const",
    "enum",
    "union",
    "use",
    "break",
    "catch",
    "continue",
    "as",
    "do",
    "finally",
    "fun",
    "fn",
    "nil",
    "return",
    "throw",
    "try",
    "type",
    "with",
    "of",
    "abstract",
    "class",
    "interface",
    "private",
    "protected",
    "pub",
    "override",
    "open",
    "init",
    "val",
    "var",
    "mut",
    "clone",
  ];

  switch (tt) {
    case "Datatype":
      return "class-name";
    case "Identifier": {
      if (keywords.includes(value)) {
        return "keyword";
      }

      return "identifier";
    }
    case "Int":
      return "number";
    case "Float":
      return "number";
    case "String":
      return "string";
    case "Comment":
      return "comment";
    // keywords:
    case "K_Var":
      return "keyword";
    default:
      return tt;
  }
}

const native_lex = (code: string, _level: HighlightLevel) =>
  new Promise<THPZigOutput>((resolve, reject) => {
    // Get binary path from .env
    const binary = import.meta.env.VITE_THP_BINARY;
    if (!binary) {
      console.error("THP_BINARY not set in .env");
      resolve({ errors: [], tokens: [] })
    }

    const subprocess = spawn(binary, ["lex"]);
    let response = "";
    let error = "";

    subprocess.stdin.write(code);
    subprocess.stdin.end();

    subprocess.stdout.on("data", (data) => {
      response += data.toString();
    });

    subprocess.stderr.on("data", (data) => {
      error += data.toString();
    });

    subprocess.on("close", (code) => {
      if (code === 0) {
        resolve(JSON.parse(response));
      } else {
        reject(new Error(error));
      }
    });
  });

export function native_lex_sync(code: string, _level: HighlightLevel): THPZigOutput {
  // Get binary path from .env
  const binary = import.meta.env.VITE_THP_BINARY;
  if (!binary) {
    console.error("THP_BINARY not set in .env");
    return ({ errors: [], tokens: [] })
  }

  const subprocess = spawnSync(binary, ["lex"], {
    input: code,
    encoding: 'utf-8',
  });

  let response = subprocess.stdout;
  let error = subprocess.stderr;


  if (!!error) {
    throw (new Error(error));
  }

  return (JSON.parse(response));
}
