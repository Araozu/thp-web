---
layout: ../../../layouts/DocsLayout.astro
title: Match
---

# Match

## Syntax

Braces are **required**.

```thp
val user_id = POST::get("user_id")


match user_id
case Some(id) { print("user_id exists: {id}") }
case None { print("user_id doesn't exist") }

match user_id
case Some(id)
{
    print("user_id exists: {id}")
}
case None
{
    print("user_id doesn't exist")
}


match user_id
case Some(id) if id > 0
{
    print("user_id exists: {id}")
}
else
{
    print("user_id has other values ")
}

match customer_id
case 1, 2, 3
{
    print("special discount for our first 3 customers!")
}
else
{
    print("hello dear")
}
```

