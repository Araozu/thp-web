# Classes

Basically kotlin syntax.


## Create a new instance of a class

`new` not required, in fact, forbidden.

```thp
val dog = Dog()
```

## Simple class

Why'd you do this tho?

```thp
class SimpleClass

val instance = SimpleClass()
```

## Properties & methods

```thp
class SimpleClass
{
    // Properties are private by default
    var String? name = ...

    // Made public with `pub`
    pub var String? surname = ...

    // Methods are private by default
    fun display_name()
    {
        // `$` is used instead of $this
        print($name)
    }

    pub fun get_name() -> String?
    {
        $name
    }
}
```

## Static members

no


## Constructor

Kotlin style


```thp
class Cat(val String name)
{
    pub fun get_name() -> String
    {
        $name
    }
}

val michifu = Cat("Michifu")
print(michifu.get_name())
```

With kotlin's `init` block.

```thp
class Dog(val String name)
{
    val Int name_length

    init
    {
        print("Dog has been instantiated")
        $name_length = name.length()
    }
}
```

## Inheritance

Kotlin style

```thp
class Animal(val String name)
{
    pub fun say_name()
    {
        print($name)
    }
}

class Cat(String name, Int lives) -> Animal(name)

Cat("Michi", 9).say_name()
```




