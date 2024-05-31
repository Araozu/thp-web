---
layout: ../../../layouts/SpecLayout.astro
title: Identifiers & Datatypes
---

# Identifiers & Datatypes

Upper and lowercase letters carry different meaning when at the start of a word.

A Datatype must always start with an uppercase letter, and an identifier must start
with either a lowercase letter or an underscore.

## Identifier

```ebnf
Identifier        = (underscore | lowercase_letter), identifier_letter*

identifier_letter = underscore | lowercase_letter | uppercase_letter | decimal_digit
```

```thp
identifier
_identifier
_123
_many_letters
camelCase
```


## Datatype

```ebnf
Datatype = uppercase_letter, indentifier_letter*
```

```thp
Datatype
PDO
WEIRD_DATATYPE
```


## Keywords

The following are (currently) THP keywords:

```thp
val     var     fun
```

Keywords are scanned first as identifiers, then transformed
to their respective tokens.


