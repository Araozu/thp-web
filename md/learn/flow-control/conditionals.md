# Conditionals

- Only `Bool` are accepted. No truthy/falsy.
- Conditionals are expressions.
- Braces are required
- Paretheses for the condition are not required.
- There's no ternary operator


```thp
if condition
{
    // code
}
else if condition2
{
    // more code
}
else
{
    // even more code
}


let result = if condition { value1 } else { value2 }
```



## Check for datatypes

```thp
if variable is Datatype
{
    // code using variable
}
```


## If variable is of enum

```thp
let user_id = POST::get("user_id")

if Some(user_id) = user_id
{
    print("user_id exists: {user_id}")
}

if Some(user_id) = user_id && user_id > 0
{
    print("user_id is greater than 0: {user_id}")
}
```



