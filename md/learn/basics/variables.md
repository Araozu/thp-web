# Variables

thp distinguishes between mutable and immutable variables.

## Immutable variables

Defined with `let`, followed by a variable name and a value.

```thp
let surname = "Doe"
let year_of_birth = 1984
```

### Datatype annotation

Written after the `let` keyword but before the variable name.

```thp
let String surname = "Doe"
let Int year_of_birth = 1984
```

When annotating an immutable variable the `let` keyword is optional

```thp
// Equivalent to the previous code
String surname = "Doe"
Int year_of_birth = 1984
```

This means that if a variable has only a datatype, it is immutable.



## Mutable variables

Defined with `let mut`, followed by a variable name and a value.

```thp
let mut name = "John"
let mut age = 32
```

### Datatype annotation

Written after the `let mut` keywords but before the variable name.

```thp
let mut String name = "John"
let mut Int age = 32
```

When annotating a mutable variable the keyword `let` is optional. `mut` is still **required**.

```thp
// Equivalent to the previous code
mut String name = "John"
mut Int age = 32
```




