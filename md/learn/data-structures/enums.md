# Enums (Tagged unions)

## Basic enums

```thp
enum Suit
{
    Hearts,
    Diamonds,
    Clubs,
    Spades,
}

val suit = Suit::Hearts
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
case IpAddress::V4(ip)
{
    // code..
}
case IpAddress::V6(ip)
{
    // more code..
}

// Without the full qualifier
match addr_1
case ::V4(ip)
{
    // code...
}
case ::V6(ip)
{
    // even more code...
}
```


