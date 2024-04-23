---
layout: ../../../layouts/PagesLayout.astro
title: Try expressions
---

# Try expressions

```thp
fun get_value() -> Result[Int, String] { ... }


// treating errors as normal enums
val result = match get_value()
case Ok(result) { result }
case Err(error) { return error }


// get the value if Ok, otherwise re-throw
val result = try get_value()

// get the value if Ok, return a new value otherwise
val result = try get_value() return Err("new error")

// get the value if Ok, assign a new value otherwise
Int result = try get_value() else 20

// get the value if Ok, otherwise run block with the error value
val result = try get_value()
with error
{
    // handle error
}


fun throws_exception() -> Result[Int, MyException|MyOtherException] { ... }

val result = try throws_exception() catch
case MyException(e)
{
    // deal with MyException
}
case MyOtherException(e)
{
    // deal with MyOtherException
}

```


