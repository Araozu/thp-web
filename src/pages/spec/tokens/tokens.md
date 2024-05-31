---
layout: ../../../layouts/SpecLayout.astro
title: Index
---

# Tokens index

These are all the THP tokens:

```rust
pub enum TokenType {
    Identifier,
    Datatype,
    Int,
    Float,
    String,
    Operator,
    LeftParen,
    RightParen,
    LeftBracket,
    RightBracket,
    LeftBrace,
    RightBrace,
    NewLine,
    Comment,
    Comma,
    INDENT,
    DEDENT,
    VAL,
    VAR,
    EOF,
    FUN,
}
```

Every keyword has its own token.


