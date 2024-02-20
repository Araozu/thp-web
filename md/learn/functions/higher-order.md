# Higher Order functions


## Function as parameter

```thp
fun map[A, B](Array[A] input, (A) -> B function) -> Array[B]
{
    // implementation
}

```

## Function as return

```thp
fun generate_generator() -> () -> Int
{
    // code...
    return fun() {
        322
    }
}


val generator = generate_generator()  // A function
val value = generate_generator()()    // An Int
```



