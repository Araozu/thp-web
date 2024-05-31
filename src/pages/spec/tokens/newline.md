---
layout: ../../../layouts/SpecLayout.astro
title: New line
---

# New line

When there are multiple empty lines, only a single NewLine token
is emitted.

```ebnf
NewLine = "\n", empty_line*

empty_line = " "*, "\n"
```
