# Static in classes


## Class constants

```thp
static Cat {
    const CONSTANT = "constant value"
}

print(Cat::CONSTANT)
```


## Static methods

aka. plain, old functions


```thp
static Cat {
    fun static_method() -> Int {
        // ...
    }
}

Cat::static_method()
```


## Static properties

aka. global variables


```thp
static Cat {
    public var access_count = 0
}

print(Cat::access_count)    // 0
Cat::access_count += 1
print(Cat::access_count)    // 1
```




