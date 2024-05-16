---
layout: ../../../layouts/PagesLayout.astro
title: Variables

---

# Variables

thp distinguishes between mutable and immutable variables.

Variables have to be declared in THP, to avoid issues with scopes.
It is a compile error to use undeclared variables.

Variable names **must** begin with a lowercase letter.

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

This means that if a variable has only a datatype, it is immutable.



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




