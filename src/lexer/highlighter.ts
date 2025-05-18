import { spawnSync } from "node:child_process";
import { HighlightLevel } from "./types";

/**
 * Output of running the thp-zig compiler
 * with the lex option
 */
export interface THPZigOutput {
  errors: ZigError[]
  tokens: ZigToken[]
  references: ZigReference[]
}

export interface ZigError {
  reason: string
  help?: string
  start_position: number
  end_position: number
  labels: ZigErrorLabel[]
}

type ZigErrorContainer = { static: string, dynamic: undefined } | { static: undefined, dynamic: string }
export interface ZigErrorLabel {
  message: ZigErrorContainer
  start: number
  end: number
}

export interface ZigToken {
  value: string
  token_type: TokenType
  start_pos: number
}

export interface ZigReference {
  symbol_name: string
  t: string
  start: number
  end: number
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

export function native_lex_sync(code: string, _level: HighlightLevel): THPZigOutput {
  // Get binary path from .env
  const binary = import.meta.env.VITE_THP_BINARY;
  if (!binary) {
    console.error("THP_BINARY not set in .env");
    return ({ errors: [], tokens: [], references: [] })
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
