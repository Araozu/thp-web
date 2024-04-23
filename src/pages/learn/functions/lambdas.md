---
layout: ../../../layouts/PagesLayout.astro
title: Lambdas
---

# Lambdas / Anonymous functions


## Anonymous function

```thp
fun(Int x, Int y) -> Int {
    x + y
}


numbers.map(fun(x) {
    x * 2
})
```



## Closure types

By default closures **always** capture variables as **references**.


```thp
var x = 20

val f = fun() {
    print(x)
}

f()     // 20

x = 30
f()     // 30
```


You can force a closure to capture variables by value.

```thp
fun(parameters) clone(variables) {
    // code
}
```

```thp
var x = 20

val f = fun() clone(x) {
    print(x)
}

f()     // 20

x = 30
f()     // 20
```


## Lambdas

Lambdas are a short form of anonymous functions. They are declared with `#{}`.

Inside the lambda you can access the parameters as `$1`, `$2`, etc.

Finally, lambdas be written outside of the parenthesis of function calls.

```thp
numbers.map() #{
    $1 * 2
}

// the above lambda is equivalent to:

numbers.map(fun(param1) {
    $1 * 2
})
```



