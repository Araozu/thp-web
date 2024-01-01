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
let mut x = 20

let f = fun() {
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
let mut x = 20

let f = fun() clone(x) {
    print(x)
}

f()     // 20

x = 30
f()     // 20
```


## Lambdas


```thp
numbers.map {
    $0 * 2
}
```



