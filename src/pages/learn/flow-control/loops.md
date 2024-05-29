---
layout: ../../../layouts/PagesLayout.astro
title: Loops
---

# Loops

## For loop

This is simmilar to PHP's `foreach`. There is no equivalent to PHP's `for`.

Braces are required.

```thp
val numbers = [0, 1, 2, 3]

for #(index, number) in numbers
{
    print(number)
}
```

```thp
val dict = .{
    apple: 10,
    banana: 7,
    cherries: 3,
}

for #(key, value) in dict
{
    print("{key} => {value}")
}
```



## While loop

```thp
val colors = ["red", "green", "blue"]
var index = 0

while index < colors.size()
{
    print("{colors[index]}")
    index += 1
}
```


## Infinite loop

Instead of doing `while true {}` use `loop`.

```thp
loop
{
    print("looping")

    if condition
    {
        break
    }
}
```


## Labelled loops

You can give labels to loops, allowing you to `break` and `continue` in nested loops.

```thp
:top for i in values_1
{
    for j in values_2
    {
        // ...
        break :top
    }
}
```








