---
layout: ../../../layouts/DocsLayout.astro
title: Variables

---

# Variables

THP distinguishes between mutable and immutable variables.

Variables must be declared in THP to avoid issues with scoping and
to know if they are mutable/immutable.
It's a compile error to use undeclared variables.

Variable names **don't** start with a dollar sign `$`.

Variable names **must** begin with a lowercase letter or an underscore.
Then they may contain lowercase/uppercase letters, numbers and underscores.

As a regex: `[a-z_][a-zA-Z0-9_]*`

## Immutable variables

Defined with `val`, followed by a variable name and a value.

```thp
val surname = "Doe"
val year_of_birth = 1984
```

### Datatype annotation

Written after the `val` keyword but before the variable name.

```thp
val String surname = "Doe"
val Int year_of_birth = 1984
```

When annotating an immutable variable the `val` keyword is optional

```thp
// Equivalent to the previous code
String surname = "Doe"
Int year_of_birth = 1984
```

This means that if a variable only has a datatype, it is immutable.



## Mutable variables

Defined with `var`, followed by a variable name and a value.

```thp
var name = "John"
var age = 32
```

### Datatype annotation

Written after the `var` keywords but before the variable name.

```thp
var String name = "John"
var Int age = 32
```

When annotating a mutable variable the keyword `var` is still **required**.

```thp
// Equivalent to the previous code
var String name = "John"
var Int age = 32
```




