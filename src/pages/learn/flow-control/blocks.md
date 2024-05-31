---
layout: ../../../layouts/DocsLayout.astro
title: Blocks
---

# Blocks

Blocks of code are denoted with brackets `{}`.

Blocks can be assigned to variables, in which case
they are executed and their last expression is
returned.

```thp
val result = {
    val temp = 161

    temp * 2    // This will be assigned to `result`
}

print(result)   // 322
```

