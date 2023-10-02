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
}


val generator = generate_generator()  // A function
val value = generate_generator()()    // An Int
```



