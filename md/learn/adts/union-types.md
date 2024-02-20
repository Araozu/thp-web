# Union types

## Basic enums

```thp
enum Suit
{
    Hearts,
    Diamonds,
    Clubs,
    Spades,
}

let suit = Suit::Hearts
```


## Enums with values

```thp
enum IpAddress
{
    V4(String),
    V6(String),
}

val addr_1 = IpAddress::V4("192.168.0.1")

match addr_1
| IpAddress::V4(ip)
{
    // code..
}
| IpAddress::V6(ip)
{
    // more code..
}

// Without the full qualifier
match addr_1
| ::V4(ip)
{
    // code...
}
| ::V6(ip)
{
    // even more code...
}
```


