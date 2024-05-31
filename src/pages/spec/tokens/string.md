---
layout: ../../../layouts/SpecLayout.astro
title: String
---

# String

A string is single line, delimited by double quotes `"` only.

```ebnf
String       = double_quote, (escape_seq | string_char)*, double_quote

double_quote = '"'
escape_seq   = "\n"
             | '\"'
             | "\r"
             | "\\"
             | "\t"
string_char  = any_unicode_except_newline_and_double_quote
```

```thp
"hello"
""
"it's me"
"\"Mario\""
```

`TODO`: String interpolation
