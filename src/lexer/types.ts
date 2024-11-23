export type ReferenceItem = {
  symbol_start: number;
  symbol_end: number;
  reference: string;
};

export interface Token {
  token_type: TokenType;
  value: string;
  position: number;
}

export type TokenType =
  | "Identifier"
  | "Datatype"
  | "Int"
  | "Float"
  | "String"
  | "Operator"
  | "LeftParen"
  | "RightParen"
  | "LeftBracket"
  | "RightBracket"
  | "LeftBrace"
  | "RightBrace"
  | "NewLine"
  | "Comment"
  | "MultilineComment"
  | "Comma"
  | "INDENT"
  | "DEDENT"
  | "VAL"
  | "VAR"
  | "EOF"
  | "FUN"
  | "IF"
  | "ELSE"
  | "ELSE"
  | "FOR"
  | "IN"
  | "WHILE"
  | "MATCH"
  | "CASE";

export interface MistiErr {
  error_code: number;
  error_offset: number;
  labels: Array<ErrorLabel>;
  note: string | null;
  help: string | null;
}

export interface ErrorLabel {
  message: string;
  start: number;
  end: number;
}

export interface TokenizeResult {
  /** All checks passed */
  Ok?: Array<Token>;
  /** A non lexic error was found */
  MixedErr?: [Array<Token>, MistiErr];
  /** A lexic error was found */
  Err?: MistiErr;
}

export enum HighlightLevel {
  Lexic = 0,
  Syntactic = 1,
  Semantic = 2,
}
