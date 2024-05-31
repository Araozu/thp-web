---
layout: ../../../layouts/SpecLayout.astro
title: Numbers
---

# Numbers

## Int

```ebnf
Int = hexadecimal_number
    | decimal_number

hexadecimal_number = "0", ("x" | "X"), hexadecimal_digit+
decimal_number     = decimal_digit+
```

```thp
12345
01234   // This is a decimal number, not an octal number
0xff25
0XFfaA
```

`TODO`: Implement octal `0o777` and binary `0b0110`.

`TODO`: Allow underscores `_` between any number: `1_000_000`.


## Float

```ebnf
Float = decimal_number, ".", decimal_number+, scientific_notation?
      | decimal_number, scientific_notation

scientific_notation = "e", ("+" | "-"), decimal_number
```

```thp
123.456
123.456e+4
123.456e-2

123e+10
123e-3
```


All floating point numbers must start with at least 1 digit.
 `.5` is not a valid floating point number.


`TODO`: Allow scientific notation to omit the `+`/`-`: `10e4`.



