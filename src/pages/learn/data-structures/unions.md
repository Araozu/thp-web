---
layout: ../../../layouts/DocsLayout.astro
title: Tagged unions
---

# Tagged unions

Tagged unions can hold a value from a fixed selection of types.

```thp
union Shape
{
    Dot,
    Square(Int),
    Rectangle(Int, Int),
}

val dot        = Shape::Dot
val square1    = Shape::Square(10)
val rectangle1 = Shape::Rectangle(5, 15)
```

## Pattern matching

```thp
match shape_1
case ::Square(side)
{
    print("Area of the square: {side * side}")
}
case ::Rectangle(length, height)
{
    print("Area of the rectangle: {length * height}")
}
```

## Internal representation

When compiled down to PHP, tagged unions are a combination of an enum and an array.

THP creates an enum of the same name and with the same cases, and the values
are contained as part of an array.


```php
// The first snippet is compiled to:
enum Shape
{
    case Dot;
    case Square;
    case Rectangle;
}

$dot        = [Shape::Dot];
$square1    = [Shape::Square, 10];
$rectangle1 = [Shape::Rectangle, 5, 15]
```

