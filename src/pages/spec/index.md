---
layout: ../../layouts/SpecLayout.astro
title: Welcome
pagesLayout:
- path: index
- path: tokens
  title: Tokens
  children:
  - path: tokens
  - path: numbers
  - path: identifier
  - path: string
  - path: comments
  - path: operator
  - path: grouping
  - path: newline
- path: ast
  title: THP AST
  children:
  - path: ast
---


# The THP Language Specification

This series of pages define the THP Programming Language.

THP's grammar is context-dependant.

The syntax is specified using a weird mix of Extended Backus Naur Form
and RegExp:

```abnf
; comments

syntax        = concatenation
concatenation = alternation grouping

alternation   = "a" | "b"
              | "c"
grouping      = ("a", "b")

optional      = "a"?
one_or_more   = "a"+
zero_or_more  = "a"*

range         = "1".."9"
literal       = "a"
```

## Compiler architecture

The compiler consists of 5 common phases:

- **Lexical Analysis**: Transforms the source code into tokens
- **Syntactic Analysis**: Parses the tokens and generates an AST
- **Semantic Analysis**: Checks the AST structure and performs type checking
- **IR**: Transforms the THP AST into a PHP AST
- **Codegen**: Generates PHP source code from the PHP AST



## Source Code representation

Source code is encoded in UTF-8, and a single UTF-8 codepoint is
a single character. As THP is implemented using the Rust programming
language, rules around Rust's UTF-8 usage are followed.


## Basic characters

Although the source code must be encoded in UTF-8, most of the actual
source code will use only the basic 128 ASCII characters. String contents may
contain any Unicode code point.

```abnf
underscore    = "_"

decimal_digit = "0".."9"
binary_digit  = "0" | "1"
octal_digit   = "0".."7"
hex_digit     = decimal_digit | "a".."f" | "A".."F"

lowercase_letter = "a".."z"
uppercase_letter = "A".."Z"
```




## Whitespace

THP is partially whitespace sensitive. It uses the following tokens: Indent, Dedent & NewLine
to determine when an expression spans multiple lines.

The lexer stores the indentation level of every line, and when scanning the next line,
compares the previous indentation to the new one. If the amount of whitespace is
greater than before, it emits a Indent token. If it's lower, emits a Dedent token, and
if it's the same it does nothing.


```thp
1 + 2
    + 3
    + 4
```

The previous code would emit the following tokens: `1` `+` `2` `NewLine` `Indent` `+` `3` `NewLine`
`+` `4` `Dedent`


Additionaly, it is a lexical error to have wrong indentation. The lexer stores all
previous indentation levels in a stack, and reports an error if a decrease in indentation
doesn't match a previous level.

```thp
if true {   // 0 indentation
    print() // 4 indentation
  print()   // 2 indentation. Error. There is no 2-indentation level
}
```

These tokens are used to detect when a expression is done, instead of relying on
semicolons. This is performed by the parser.

Every other production of the grammar doesn't care about whitespace/indentation, so
those ignore whitespace.


