---
layout: ../../../layouts/PagesLayout.astro
title: Function parameters
---

# Function parameters


## Immutable reference

```thp
fun add_25(Array[Int] numbers) {
    numbers.push(25)    // Error: `numbers` is immutable
}
```

When using a regular type as a parameter, only it's immutable
properties can be used

```thp
fun count(Array[Int] numbers) -> Int {
    val items_count = numbers.size()    // Ok, `size` is pure

    items_count
}
```

To use immutable properties you must use a mutable reference.


## Mutable reference

```thp
fun push_25(mut Array[Int] numbers) {
    numbers.push(25)    // Ok, will also mutate the original array
}
```

Placing a `mut` before the type makes the parameter a mutable
reference. Mutable methods can be used, and the original
data **can** be mutated.

The caller *must* also use `mut`.

```thp
val numbers = Array(0, 1, 2, 3)

push_25(mut numbers)    // Pass `numbers` as reference.

print(numbers(4))   // `Some(25)`
```



## Clone

```thp
fun add_25(clone Array[Int] numbers) {
    numbers.push(25)    // Ok, the original array is unaffected
}
```

Using the `clone` keyword before the type creates a mutable copy
of the parameter (CoW). The original data will **not** be mutated.


```thp
val numbers = Array(1, 2, 3, 4)

add_25(clone numbers)    // Pass `numbers` as clone.

print(numbers(4))   // None
```





