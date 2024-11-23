---
layout: "../_wrapper.astro"
title: Expression
---

# Expression

The expression parser effectively implements a precedence table.

| Operator  | Precedence |
| --------- | ---------- |
| == !=     | 5          |
| > >= < <= | 4          |
| - + ++    | 3          |
| . ?. !.   | 2          |
| / \* %    | 1          |

```ebnf
Expression = Equality

Equality   = Comparison, (("==" | "!="),             Comparison)*
Comparison = Term,       ((">" | ">=" | "<" | "<="), Term)*
Term       = Factor,     (("-" | "+" | "++"),        Factor)*
Factor     = DotAccess,  (("/" | "*" | "%"),         DotAccess)*
DotAccess  = Unary,      (("."),                     Unary)*
Unary      = ("!" | "-"), Expression
           | CallExpression
```

## CallExpression

It's so hard to properly name these constructions.
This one groups a function call or an array access.

```ebnf
CallExpression = primary, "(", (arguments list)?, ")"
               | primary, "[", (expression, (comma, expression)*, comma?)? "]"
               | primary
```
