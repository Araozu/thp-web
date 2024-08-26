export type ReferenceItem = {
    symbol_start: number
    symbol_end: number
    reference: string
}

export interface Token {
    token_type: TokenType
    value: string
    position: number
}

export type TokenType =
    "Identifier" |
    "Datatype" |
    "Int" |
    "Float" |
    "String" |
    "Operator" |
    "LeftParen" |
    "RightParen" |
    "LeftBracket" |
    "RightBracket" |
    "LeftBrace" |
    "RightBrace" |
    "NewLine" |
    "Comment" |
    "MultilineComment" |
    "Comma" |
    "INDENT" |
    "DEDENT" |
    "VAL" |
    "VAR" |
    "EOF" |
    "FUN";

export interface Err {
    Lex?: LexError
    Syntax?: SyntaxError
    Semantic?: SemanticError
}

export interface LexError {
    position: number
    reason: string
}

export interface SyntaxError {
    error_start: number
    error_end: number
    reason: string
}

export interface SemanticError {
    error_start: number
    error_end: number
    reason: string
}

export interface TokenizeResult {
    /** All checks passed */
    Ok?: Array<Token>,
    /** There were semantic errors */
    SemanticError?: [Array<Token>, Err],
    /** There were syntax errors */
    SyntaxError?: [Array<Token>, Err],
    /** No checks passed */
    LexError?: Err,
}

export enum HighlightLevel {
    Lexic = 0,
    Syntactic = 1,
    Semantic = 2,
}