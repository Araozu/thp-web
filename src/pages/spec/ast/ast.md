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

A statement is either a variable binding, a function declaration,
a conditional (for now, until those becom expressions),
for loop, while loop, or an assignment.

Assignment includes the operators `= += -= *= /=`, etc. Those operators
cannot be used elsewhere, only as part of an Assignment.

```ebnf
Statement = VariableBinding
          | FunctionDeclaration
          | Conditional
          | ForLoop
          | WhileLoop
          | Assignment
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


## Assignment

The target of an assignment can only be an identifier for now.
In the future this will include other things like maps, arrays,
pattern matching, destructuring, etc.

```ebnf
Assignment         = AssignmentTarget, AssignmentOperator, Expression

AssignmentTarget   = Identifier
AssignmentOperator = "="
                   | "+="
                   | "-="
                   | "*/"
                   | "/="
                   | "%="
```


