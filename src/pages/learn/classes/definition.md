---
layout: ../../../layouts/PagesLayout.astro
title: Classes
---

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
        // `$` is used instead of $this. Mandatory
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
class Cat(
    var String name,
    var Int lives = 9,
    val String surname = "Doe",
)
{
    pub fun get_name() -> String
    {
        $name
    }

    pub fun die()
    {
        $lives -= 1
        if $lives <= 0
        {
            print("Cat {$name} is death")
        }
        else
        {
            print("Cat {$name} is life still")
        }
    }
}

val michifu = Cat("Michifu")
print(michifu.get_name())
```

With kotlin's `init` block.

```thp
class Dog(val String name)
{
    Int name_length = name.length()

    init
    {
        print("Dog has been instantiated")
    }
}
```

## Inheritance

Kotlin style

```thp
class Animal(var String name)
{
    pub fun say_name()
    {
        print($name)
    }
}

class Cat(String name, Int lives) -> Animal(name)

Cat("Michi", 9).say_name()
```

## Mutable methods

By default methods cannot mutate the state of the object.

```thp
class Animal(var String name)
{
    pub fun set_name(String new_name)
    {
        $name = new_name    // Error: Cannot mutate $
    }
}
```

To do so the method must be annotated. The caller must also
declare a mutable variable.

```thp
class Animal(var String name)
{
    pub mut fun set_name(String new_name)
    {
        $name = new_name    // Ok
    }
}

var michi = Animal("Michifu")
michi.set_name("Garfield")
```



