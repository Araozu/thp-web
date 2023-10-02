# Classes

Basically kotlin syntax.

Methods have to have a first parameter `$`.


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
    var String? name;

    // Made public with `public`
    public var String? surname;

    // Methods are private by default
    fun display_name($)
    {
        // `$` is used instead of $this
        print($name)
    }

    public fun get_name($) -> String?
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
    public fun get_name($) -> String
    {
        $name
    }
}

val michifu = Cat("Michifu")
print(michifu.get_name())
```

## Inheritance

Kotlin style

```thp
class Animal(val String name)
{
    public fun say_name($)
    {
        print($name)
    }
}

class Cat(String name, Int lives) -> Animal(name)

Cat("Michi", 9).say_name()
```




