---
layout: ../../../layouts/DocsLayout.astro
title: Arrays
---

# Arrays

Use square brackets as usual.

## Usage

```thp
val fruits = ["apple", "banana", "cherry"]
val apple = fruits[0]

print(apple)  // apple


var numbers = [0, 1, 2, 3]

numbers[3] = 5

print(numbers[3])  // 5
```


## Type signature


```thp
Array[String]
Array[Int]
```

The Array signature __requires__ the word `Array`.
There is no `Int[]` or `[Int]` signature, since that would cause
problems with the language's grammar.




