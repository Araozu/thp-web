---
layout: ../../layouts/DocsLayout.astro
title: Cheatsheet
---

# Language cheatsheet

Comparisons to PHP are noted.

```thp
// THP code is written directly, it's not enclosed in any ?php tag

// Single line comments are written with two slashes 

/*
    Multiline comments use slash-asterisk
    and can be /* nested */
*/

// print writes input to stdout in terminal mode
print("Hello world")
```

## Types and variables

```thp
// Variables are always declared
// Variables don't start with a dollar sign ($)
// Variables are declared with `var`
var age = 32

// Immutable variables are declared with `val`,
// and can't be reassigned
val name = "John"

// A variable name starts with either a:
//  - lowercase letter
//  - underscore
// and then may contain any letter, underscore or number
val my_variable = "my value"

// Datatypes' names start with an uppercase letter, always
// A declaration may optionally specifiy its datatype, after
// the var/val keyword
var String lastname = "Doe"

//
// Bool
//

// Booleans are only `true` and `false`, case sensitive
val condition = true
val accepted  = false

//
// Int
//


```


