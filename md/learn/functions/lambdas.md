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


```thp
numbers.map {
    it * 2
}
```



