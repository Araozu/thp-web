---
layout: ../../../layouts/DocsLayout.astro
title: Datatypes
---

# Datatypes

THP requires that all datatypes start their name with an
uppercase letter.

The following are basic datatypes.

## Int

Same as php int

```thp
Int age = 32
// Hexadecimal numbers start with 0x
Int red = 0xff0000
// Octal numbers start with 0o
Int permissions = 0o775
// Binary numbers start with 0b
Int char_code = 0b01000110

// IMPORTANT!
// Since Octal starts with `0o`, using just a leading 0
// will result in a decimal!
Int not_octal = 032     // This is 32, not 26
```


## Float

Same as php float


```thp
Float pi = 3.141592
Float light = 2.99e+8
```


## String

THP strings use **only** double quotes. Single quotes are
used elsewhere.

```thp
String name = "Rose"
```

Strings have interpolation with `{}`.

```thp
print("Hello, {name}")      // Hello, Rose
```


## Bool

THP booleans are `true` and `false`. They are case sensitive,
**only lowercase.**

```thp
Bool is_true = true
Bool is_false = false

// This is a compile error
val invalid = TRUE
```
