# Loops

## For loop

Braces are required.

```thp
val numbers = Array(0, 1, 2, 3)

for number in numbers
{
    print(number)
}

for #(index, number) in numbers.entries()
{
    print("{index} => {number}")
}
```

```thp
val dict = Obj {
    "apple": 10,
    "banana": 7,
    "cherries": 3,
}

for #(key, value) in dict
{
    print("{key} => {value}")
}
```

```thp
for value in collection
{
    if condition
    {
        break
    }
}
```


## While loop

```thp
val colors = Array("red", "green", "blue")
var index = 0

while index < colors.size()
{
    print("{colors.[index]}")
    index += 1
}
```


## Infinite loop

Basically Rust's loop.

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









