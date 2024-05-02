---
layout: ../../../layouts/PagesLayout.astro
title: Classes
---

# Classes

Syntax and semantics heavily inspired by Kotlin.


## Create a new instance of a class

To create an instance of a class call it as if it were a function,
without `new`.

```thp
val animal = Animal()
```

## Simple class 

Classes are declared with the `class` keyword.

```thp
class Animal

val instance = Animal()
```

## Properties

Properties are declared with `var`/`val`.
They **must** declare their datatype.

```thp
class Person
{
    // This is an error. Properties must declare their datatype,
    // even if the compiler can infer it.
    val name = "Jane Doe"

    // This is correct
    val String name = "Jane Doe"
}
```

Properties are private by default,
but can be made public with `pub`.

```thp
class Person
{
    // Properties are private by default
    val String name = "John Doe"

    // To make a property public use `pub`
    pub var Int age = 30
}
```

More information about how properties interact with the constructor
is found in the contructor section.


## Methods

Methods are declared with `fun`, as regular functions.

```thp
class Person
{
    fun greet()
    {
        print("Hello")
    }
}
```

Methods are private by default, and are made public with `pub`.

```thp
class Person
{
    // This method is private
    fun private_greet()
    {
        print("Hello from private method")
    }

    // Use `pub` to make a method public
    pub fun greet()
    {
        print("Hello from greet")
    }
}

val p = Person()
p.greet()           //: Hello from greet
p.private_greet()   // Compile time error. Private method.
```

## This

THP uses the dollar sign `$` as this. It is **required** when
using a class property/method.

```thp
class Person
{
    val String name = "Jane Doe"

    pub fun get_name() -> String
    {
        return $name
    }

    pub fun greet()
    {
        val person_name = $get_name()
        print("Hello, I'm {person_name}")
    }
}
```

## Static members

Static members are detailed in their own page.


## Constructor

(for now) THP's constructors are inspired by Kotlin.

PHP only allows a single constructor, and so does THP.
The basic constructor has the syntax of function parameters.

```thp
//          |this is the constructor |
class Animal(String fullname, Int age)

val a1 = Animal("Nal", 4)
```

The class properties can be declared in the constructor,
using the keywords `pub`, `var`, `val`:

```thp
class Animal(
    // Since we are using val/var, these are promoted to class properties
    val String fullname,
    var Int age,
)
{
    pub fun say()
    {
        // Here we are using the properties declared in the constructor
        print("My name is {$fullname} and i'm {$age} years old")
    }
}

val a1 = Animal("Nal", 4)
a1.say()    //: My name is Nal and i'm 4 years old
```

By using this syntax you are declaring properties and assigning them
at the same time.

The contructor parameters can also have default values.


### Constructor visibility

The constructor is public by default. It can be made private/protected
like this:

```thp
class Animal
private constructor(
    val String fullname,
    var Int age,
)
{...}
```


### Derived properties

You can declare properties whose values depend on values
on the constructor.

```thp
class Animal(
    val String fullname,
)
{
    // A property whose value depends on `fullname`
    // This is executed after the contructor
    pub val Int name_length = $fullname.length
}

val a2 = Animal("Doa")
print(a2.name_length)   //: 3
```


### Init block

If you need to additional logic in the constructor you can
use a `init` block.

```thp
class Animal(
    val String fullname,
)
{
    init
    {
        print("{$fullname} in contruction...")
    }
}

val a3 = Animal("Lola")     //: Lola in construction
```


## Inheritance


```thp
// Base class
class Animal(var String name)
{
    pub fun say_name()
    {
        print($name)
    }
}

// Child class
class Cat(String name, Int lives) 
extends Animal(name)

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

## Class constructor that may return an error

Working theory:

```thp
class Fish(
    val String name,
    var Int lives = 9,
)
extends Animal(name)
throws Error

val fish_result = Fish("bubble")   // fish_result will be a `Result[Fish,Error]`
val fish = try fish_result
```



