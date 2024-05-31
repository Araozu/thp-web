---
layout: ../../../layouts/DocsLayout.astro
title: Magic methods
---

# Magic methods

Don't get special treatment.

```thp

class Cat
{
    pub fun __sleep() -> Array[String]
    {
        // logic
    }
}

```


```thp
val option = Some("GAAA")
val Some(value) = option

val colors = Array("red", "green", "blue")
val Array()
```
