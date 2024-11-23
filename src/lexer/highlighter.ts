import { spawn } from "node:child_process";
import { leftTrimDedent } from "../components/utils";
import { HighlightLevel } from "./types";
import type {
  ErrorLabel,
  MistiErr,
  Token,
  TokenizeResult,
  TokenType,
} from "./types";

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
    return compiler_error(formatted_code, error as MistiErr);
  }
}

/**
 * Highlights code using the compiler
 *
 * Returns:
 * - The tokens as a list of <span /> elements
 * - An error message, if any
 */
function highlight_syntax(
  code: string,
  result: TokenizeResult,
): [string, string | null] {
  if (result.Ok) {
    const tokens_html = render_tokens(code, result.Ok);

    return [tokens_html, null];
  } else if (result.MixedErr) {
    const [tokens, errors] = result.MixedErr;
    // TODO: Implement error rendering, based on the new error schema

    const tokens_html = render_tokens(code, tokens, errors.labels);
    return [tokens_html, `error code ${errors.error_code}`];
  } else if (result.Err) {
    // TODO: Implement error rendering, based on the new error schema

    return [code, `lexical error ${result.Err.error_code}`];
  } else {
    console.error(result);
    throw new Error(
      "Web page error: The compiler returned a case that wasn't handled.",
    );
  }
}

/** A fatal error with the THP compiler */
function compiler_error(code: string, error: MistiErr): [string, string] {
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
  tokens: Array<Token>,
  error_labels: Array<ErrorLabel> = [],
): string {
  const input_chars = input.split("");
  let output = "";

  // Collects all the token ranges in all error labels
  const error_ranges: Array<[number, number]> = error_labels.map((l) => [
    l.start,
    l.end,
  ]);

  let current_pos = 0;
  for (let i = 0; i < tokens.length; i += 1) {
    const t = tokens[i]!;
    const token_start = t.position;
    const token_end = t.position + t.value.length;

    // check if the current token is in any error label
    let is_errored = false;
    for (const range of error_ranges) {
      const [error_start, error_end] = range;

      if (token_start >= error_start && token_end <= error_end) {
        is_errored = true;
        break;
      }
    }

    // Some tokens require processing (like multiline comments)

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
  // now i want to append the label messages:
  // - split the output by newlines
  // - for every label, append a new line after each error

  const lines = output.split("\n");
  let offset = 0;
  for (const label of error_labels) {
    // get the line number of the label
    const [line_number, col_number] = absolute_to_line_column(
      input,
      label.start,
    );
    let spaces_len = col_number - 1;
    if (spaces_len < 0) {
      spaces_len = 0;
    }

    const spaces = new Array(spaces_len).fill("&nbsp;").join("");
    lines.splice(
      line_number + offset,
      0,
      create_inline_error_message(spaces, label.message),
    );
    offset += 1;
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
  if (token_type === "MultilineComment") {
    token_value = `/*${token_value}*/`;
    new_end += 4;
  } else if (token_type === "String") {
    token_value = `"${token_value}"`;
    new_end += 2;
  }

  // Escape html and return
  return [
    token_value.replaceAll(/</g, "&lt;").replaceAll(/>/g, "&gt;"),
    new_end,
  ];
}

function translate_token_type(tt: TokenType, value: string): string {
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
    case "MultilineComment":
      return "comment";
    // keywords:
    case "VAL":
    case "VAR":
    case "FUN":
    case "IF":
    case "ELSE":
    case "FOR":
    case "IN":
    case "WHILE":
    case "MATCH":
    case "CASE":
      return "keyword";
    default:
      return tt;
  }
}

const native_lex = (code: string, level: HighlightLevel) =>
  new Promise<TokenizeResult>((resolve, reject) => {
    // Get binary path from .env
    const binary = import.meta.env.THP_BINARY;
    if (!binary) {
      throw new Error("THP_BINARY not set in .env");
    }

    const subprocess = spawn(binary, ["tokenize", "-l", level.toString()]);
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
