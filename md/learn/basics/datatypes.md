# Datatypes

Programming is comprised of 2 basic things: instructions and data.

If we compare a program to a cake recipe, the instructions are the steps
(**pour** flour, **add** water, **add** egg, **mix**) and the data are the ingredients 
themselves (flour, water, egg).

![Image](Image)

Then, we can describe the recipe in terms of instructions and data. For example,
"mix flour and egg to produce dough".

![Image](Image)

All code is like a recipe: A list of instructions and data that, when combined
correctly, are able to transform a input to an output. Many advanced concepts
are just ways to organize and abstract those instructions and data.


## Classifying datatypes

As with food, datatypes can be classified. Just like there are fruits, vegetables,
oils, there are `numbers`, `text`, `"booleans"`.



### Int

Int is an abbreviation for "integer numbers", which are numbers without a fractional component.
They can be positive or negative.

In code, they are written just like numbers:

```thp
val age = 33
val children = 0
val money = -15000
```

You can use underscores to help you differentiate thousands, millions, etc.
However, there cannot be spaces in between

```thp
val studentDebt = 3_500_000_000_000  // Valid
val invalid     = 3 500 000 000 000  // Invalid, will throw an error
```

The common operations can be done as in math:

```thp
val result1 = 10 + 20
val result2 = 1779 * 2 - (55 / 5)
```


### Float

Float is an abbreviation for "floating point numbers". In simplified terms, these are numbers
**with** a fractional component.

They are written with a dot `.` to separate the whole part and the fraction.

```thp
val pi = 3.141592
val epsilon = 2.775557
```

Underscore can also be used:

```thp
val reallyLongNumber = 23_870_000.443_879
```

Common operations can be performed the same way:

```thp
val value1 = 552.23 - 32
val value2 = 3.2 * (-0.22 + 23.334) / 0.5
// etc.
```

### String

A string of letters (technically, characters). Strings are used to represent text,
and are wrapped in quotation marks.

```thp
val name = "John"
val lastName = "Doe"

val greeting = "Hello"
```

#### Concatenation

Strings cannot be added, substracted, multiplied, divided.
They have another operation, called "concatenation".

Concatenation "joins" two strings, for example, the concatenation of
`"human"` and `"kind"` is `"humankind"`.

As it is a common operation, string concatenation reuses the operation
for addition `+`.

```thp
val string = "human" + "kind"
```


### Boolean

A boolean represents something that can only be in one of two states.

Booleans are useful in conditionals, which will be explained later.


```thp
val condition = true
val isSunny = false

if isSunny {
    doSomething()
}
```


