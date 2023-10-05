# Anonymous classes


```thp
class Logger
{
    pub fun log(String msg)
    {
        print(msg)
    }
}

// Using a class instance
setLogger(Logger())

// Using an anonymous class
setLogger(class {
    pub fun log(String msg)
    {
        print(msg)
    }
})
```

```thp
setLogger(class(Int param1) -> SomeClass(param1), SomeInterface {
    pub fun method()
    {
        // code
    }
})
```
