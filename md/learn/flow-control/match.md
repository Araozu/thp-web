# Match

## Syntax

Braces are **required**.

```thp
val user_id = POST::get("user_id")


match user_id
| Some(id) { print("user_id exists: {id}") }
| None { print("user_id doesn't exist") }

match user_id
| Some(id)
{
    print("user_id exists: {id}")
}
| None
{
    print("user_id doesn't exist")
}


match user_id
| Some(id) if id > 0
{
    print("user_id exists: {id}")
}
| _
{
    print("user_id has other values ")
}


```


