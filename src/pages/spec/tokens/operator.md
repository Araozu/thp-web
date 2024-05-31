---
layout: ../../../layouts/SpecLayout.astro
title: Operator
---

# Operator


```ebnf
Operator      = operator_char+

operator_char = "+" | "-" | "=" | "*" | "!" | "/" | "|"
              | "@" | "#" | "$" | "~" | "%" | "&" | "?"
              | "<" | ">" | "^" | "." | ":"
```

```thp
+ - / * % < > <= >= -> =>
```

These are all the characters that can make an operator.

The lexer doesn't know about any operator in particular.
In other languages something like  `+-1` would be interpreted
as `+` `-` `1`. In THP, this is always `+-` `1`, and that
would throw an error because the operator `+-` doesn't exist.

## Comma

Comma is its own token: `,`.
