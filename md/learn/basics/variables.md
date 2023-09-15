# Variables

Variables allows us to store values under a name, so that we can use them
later.

For example, in a program we could have the name of our user, and use it
multiple times:

```thp
print("Hello, where's Joe?")
print("How old is Joe?")
print("Do you know if Joe has kids?")
```

We are using the same value `Joe` many times. Each time we use it we have
to type `Joe`. But what happens if we needed to use a different name?
We'd have to change the name everywhere in our code!

```thp
print("Hello, where's Jane?")
print("How old is Jane?")
print("Do you know if Jane has kids?")
```

## Variables to the rescue

With a variable we can store values so we can use them later, or use them
in multiple times.

In the previous code, we can use a variable to store the person's name,
and then use it everywhere.

```thp
// This is the variable
val person = "John"

print("Hello, where's {person}?")
print("How old is {person}?")
print("Do you know if Joe has {person}?")
```

Now, instead of writing `"John"` every time, we write the name of the
variable instead.

If we wanted to change the person's name to "Jane", we just need to change
it in one place: the variable

```thp
// We change this
val person = "Jane"

// And all these lines will use the new value
print("Hello, where's {person}?")
print("How old is {person}?")
print("Do you know if Joe has {person}?")
```

## Variable rules

To use a variable we do the following:

- Write the special word `val`
- Write the name of our variable
- Write the equal sign `=`
- Write the value of our variable

```thp
    val person = "Jane"
/*  --- ------ - ------
     |    |    |   +- The value of our variable
     |    |    +----- The equal sign
     |    +---------- The name of our variable
     +--------------- The special word (keyword) val
*/
```

The value can be anything: ints, floats, string, bools, even other variables and operations!

```thp
val variable_1 = 322
val variable_2 = 123.456
val variable_3 = "a text"
val variable_4 = false
val variable_5 = variable_1 + variable 2
```

## Variable name rules

- Starts with a lowercase letter (a-z) or underscore (`_`)
- Then can have any letter (a-zA-Z), underscore (`_`) or number (0-9)
- Cannot have spaces
- Cannot have the same name as a keyword (for example, the `val` keyword)


Some examples of valid variable names:

```thp
val name = ...
val age = ...
val my_name = ...
val many_words_joined_by_underscores = ...
val person_2 = ...
val person_3 = ...
```

Some invalid variables and why they are invalid:

```thp
val 1name = ...         // Invalid: starts with a number
val 123_person = ...    // Invalid: starts with a number
val val = ...           // Invalid: same name as a keyword (val)
val Person = ...        // Invalid: starts with an uppercase letter
val person name = ...   // Invalid: contains whitespace
val +@name = ...        // Invalid: contains non-letters (+@)
val name🫠 = ...        // Invalid: contains emoji (🫠)
```


## Variable reassignment

When you create a new variable with the same name of an old variable,
the old is "replaced" with the new one.

```thp
val person_name = "John"
print(person_name)  // Will print "John"

val person_name = "Jane"
print(person_name)  // Will print "Jane"
```

This will have some implications on the future, but for now you should
now that you will always use the value of the last variable you define.






