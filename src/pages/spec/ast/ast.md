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

## VariableBinding

```ebnf
VariableBinding = ImplicitBinding
                | ExplicitBinding

ImplicitBinding = Datatype, Identifier, "=", Expression
ExplicitBinding = ("var" | "val"), Datatype?, Identifier, "=", Expression
```

## FunctionDeclaration

```ebnf
FunctionDeclaration = "fun", Identifier, ParameterList, ("->", Datatype)?, Block

ParameterList = "(", (Parameter, ",")*, ")"

Parameter = Datatype, Identifier
```

## Block

```ebnf
Block       = "{", BlockMember*, "}"

BlockMember = Statement
            | Expression
```


