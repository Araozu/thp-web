---
layout: ../../../layouts/SpecLayout.astro
title: AST
---

# THP AST

Created during the syntax analysis phase, from the stream of
tokens produced by the lexic analysis phase.

## File and modules

Every file has its own AST, and every file is a module.

```ebnf
AST = Module

Module = (Statement | Expression)*
```

## Statement

(At the moment) a statement is either a variable binding or a function declaration

```ebnf
Statement = VariableBinding
          | FunctionDeclaration
```

## Expression

See the Expression section




