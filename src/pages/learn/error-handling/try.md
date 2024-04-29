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
fun invert(Int number) -> Result[Int, DivisonByZero]
{
    if number == 0
    {
        return Err(DivisionByZero())
    }

    return Ok(1 / number)
}
```

In the previous segment, `Result[Int, DivisionByZero]` denotates
that the function may return either an `Int` or an `DivisionByZero`.

To return the error we use `Err(...)`, and to return the succes value
we use `Ok(...)`.

The error may be of any datatype.


### Multiple error returns

If there are multiple error types that the function can return,
you can use the `|` operator:

```thp
fun sample() -> Result[Int, Exception1|Exception2|Exception3]
{ /* ... */}
```



## Handle an error

Since `Result` is an enum we can use pattern matching to
get the ok value, or handle the error:

```thp
val result = match inverse(5)
case ::Ok(value) { value }
case ::Err(error) { return error }
```

However, THP provides syntactic sugar for many common
patterns for error handling.

## Try expressions

There are several try expressions that simplify error handling:

### Naked try

Using a `try` followed by an expression will execute the
expression, and if `Ok` is returned, it will return it's value.
If `Err` is returned, the error will be re-thrown.

```thp
fun sample(Int x) -> Result[Int, DivisionByZero]
{
    val result = try inverse(x)

    result
}
```

If `inverse(x)` fails, the error will be returned again.

If `inverse(x)` succeedes, its value will be assigned to `result`.


### Try/return

Try/return will run a function and assign its value if `Ok` is found.
Otherwise, it will return a new value specified by the programmer.

```thp
fun sample(Int x) -> String
{
    val result = try inverse(x) return "0 was found"

    if result == 2 { "2 was found" }
    else { "other number was found" }
}
```

If `inverse(x)` fails, `"0 was found"` will be returned.

If `inverse(x)` succeedes, its value will be assigned to `result`
and the code will continue to execute normally.


### Try/else

Try/else will run an expression and assign its value if `Ok`.
Otherwise it will assign a second value.

```thp
fun sample(Int x) -> Int
{
    val result = try inverse(x) else 0.0

    result
}
```

If `inverse(x)` fails, `0.0` will be assigned to `result`.

If `inverse(x)` succeedes, its value will be assigned to `result`.


### Try/catch

Try/catch will run an expression and assign its value if `Ok`.
Otherwise it will run a block of code, which will handle
the error and assign a value as well.

```thp
fun sample(Int x)
{
    val result = try inverse(x)
    catch DivisionByZero e
    {
        // Handle `e`
        // ...

        0.0
    }
}
```


