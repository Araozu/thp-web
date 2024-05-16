---
layout: ../../../layouts/PagesLayout.astro
title: Operators
---

# Operators


Most of the PHP operators are present in THP.

## Numbers

```thp
var number = 322

number + 1
number - 1
number * 1
number / 1
number % 2

number += 1
number -= 1
number *= 1
number /= 1
number %= 2
```

**There are no prefix/postfix increment**, use `+=` or `-=`.

```thp
// Use
number += 1

// instead of
number++   // This is a compile error 
```

### Comparison

These operators will not do implicit type conversion. They can
only be used with same datatypes.

```thp
v1 < v2
v1 <= v2
v1 > v2
v1 >= v2
```

There is only `==` and `!=`. They are equivalent to `===` and `!==`.

```thp
v1 == v2
v1 != v2
```


### Bitwise

TBD

```thp
number and 1
number or 2
number xor 1
number xand 1
```

## Strings

TBD.

Strings **do not use `.`** for concatenation. They use `+`.

```thp
"Hello " + "world."
```

However, the plus operator `+` does not implicitly convert types.

```thp
"Hello " + 322      // This is an error
```


## Boolean

These operators work **only with booleans**, they do not perform
type coercion.

```thp
c1 && c2
c1 || c2
```

## Ternary

There is no ternary operator. See [Conditionals](/learn/flow-control/conditionals) for alternatives.


## Null

These are detailed in their section: [Nullable types](/learn/error-handling/null)

```thp
val person = some_fun()

person?.name
person?.name ?? "Jane"
person?.greet?.()

if person?
{
    person.name
}
```



