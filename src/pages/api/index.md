---
layout: ../../layouts/ApiLayout.astro
---

# module `std`

## The THP standard library

This module contains many functions, classes, constant & enums
commonly used in THP programs. These can be used directly,
without having to import them.

This module is not a 1:1 map of the global PHP scope. Instead,
this module contains all those members organized into classes,
objects or other modules.

For example, to find if a string contains another, in PHP you'd do:

```php
if (str_contains("abc", "a")) {
    // ...
}
```

In THP there is no `str_contains` function. Instead, you'd use the
`contains` function inside `String`:

```thp
if String.contains("abc", "a")
{
    // ...
}
```

Or even better, you'd use the function as a method:

```thp data-thp
if "abc".contains("a")
{
    // ...
}
```




