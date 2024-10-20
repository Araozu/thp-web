---
layout: ../../../layouts/SpecLayout.astro
title: Expression
---

# Expression

The expression parser effectively implements a precedence table.

| Operator   | Precedence |
|------------|------------|
| == !=      | 4          |
| > >= < <=  | 3          |
| - + ++     | 2          |
| / * %      | 1          |



```ebnf
Expression = Equality

Equality   = Comparison, (("==" | "!="),             Comparison)*
Comparison = Term,       ((">" | ">=" | "<" | "<="), Term)*
Term       = Factor,     (("-" | "+" | "++"),        Factor)*
Factor     = Unary,      (("/" | "*" | "%"),         Unary)*
Unary      = ("!" | "-"), Expression
           | FunctionCallExpression
```


