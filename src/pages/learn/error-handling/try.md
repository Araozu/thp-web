---
layout: ../../../layouts/PagesLayout.astro
title: Try/Exceptions
---

# Try/exceptions

Unlike PHP, in THP all errors must be explicitly declared
and handled.

## Declare that a function returns an exception

To declare a possible error return value the `Result` enum
is used.

For example, a function that returned a `DivisionByZero`
may be written like this:

```thp
fun invert(Int number) -> Int!DivisionByZero
{
    if number == 0
    {
        return DivisionByZero()
    }

    return 1 / number
}
```

In the previous segment, `Int!DivisionByZero` denotates
that the function may return either an `Int` or an `DivisionByZero`.

We then can return the error or success value;


### Multiple error returns

TODO: fix?



If there are multiple error types that the function can return,
you can use the `|` operator:

```thp
type Exceptions = Exception1 | Exception2 | Exception3

fun sample() -> Int!Exceptions
{ /* ... */}
```



## Error handling

The caller must handle all possible errors, they don't automatically
bubble up the stack.

THP provides syntax for handling errors following certain patterns,
via try expressions:

### Naked try

Use a naked `try` when you want to rethrow an error, if any.

```thp
// May return an Int or an Exception
fun dangerous() -> Int!Exception
{...}

fun run() -> !Exception
{
    // Use a naked `try` to rethrow if there's an error
    val result = try dangerous()
    // Here result is `Int`
    print(result)
}
```

In the previous example:

- If `dangerous()` returns an `Exception`, this exception
    will be returned by `run()`;
- If `dangerous()` succeedes, its value is assigned
    to `result`, and the function continues executing.


### Try/return

Try/return will return a new value if an expression fails,
otherwise will assign the success value and continue.

Try/return will run a function and assign its value if `Ok` is found.
Otherwise, it will return a new value specified by the programmer.

```thp
fun run() -> Int
{
    val result = try dangerous() return 0

    // ...
}
```

In the previous example:

- If `dangerous()` fails, its error will be ignored, and `0` will
    be returned from `run()`.
- If `dangerous()` succeedes, its value will be assigned to `result`,
    and the function continues executing.


### Try/else

Try/return will assign a new value if an expression fails.

```thp
fun run()
{
    val result = try dangerous() else 322

    print(result)
}
```

- If `dangerous()` fails, the value `322` will be assigned to `result`.
- If `dangerous()` succeedes, its value will be assigned to `result`.

Either way, the function will continue executing.


### Try/catch

Try/catch allows the error to be manually used & handled.


```thp
fun run()
{
    val result = try dangerous()
    catch Exception e
    {
        // This is run if `dangerous()` throws.
        // `e` is the thrown error

        // Handle the error
        // ...

        // Return a new value to be assigned to `result`
        0
    }
}
```

A try/catch may have many `catch` clauses:

```thp
try dangerous()
catch Exception1 e
{...}
catch Exception2 e
{...}
catch Exception3 e
{...}
```


