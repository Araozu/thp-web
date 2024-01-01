# Loops

## For loop

Braces are required.

```thp
let numbers = [0, 1, 2, 3]

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
let dict = Obj {
    apple: 10,
    banana: 7,
    cherries: 3,
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
let colors = ["red", "green", "blue"]
let mut index = 0

while index < colors.size()
{
    print("{colors[index]}")
    index += 1
}
```


## Infinite loop

Basically Rust*'s loop.

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

* Rust is a trademark of the Rust Foundation. THP is not affiliated,
endorsed or supported by the Rust Foundation.







