# Declaration


## No parameters, no return

```thp
fun say_hello()
{
    print("Hello")
}

say_hello()
```


## With return type

```thp
fun get_random_number() -> Int
{
    Random::get(0, 35_222)
}

val number = get_random_number()
```

## With parameters and return type

```thp
fun get_secure_random_number(Int min, Int max) -> Int
{
    Random::get_secure(min, max)
}

val number = get_secure_random_number(0, 65535)
```


## Generic types

```thp
fun get_first_item[T](Array[T] array) -> T
{
    array.[0]
}

val first = get_first_item[Int](numbers)
// The type annotation is optional if the compiler can infer the type

val first = get_first_item(numbers)
```


## Signature


```thp
() -> ()
() -> Int
(Int, Int) -> Int
[T](Array[T]) -> T
```








