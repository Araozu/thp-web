# The compiler

The compiler is the program that takes your THP code and converts it
into something that the computer can run (in this case, PHP code).



The compiler reads your code and tries to understand it.
When it can't understand some part, it will ask you to clarify what
you meant, with an error.






## Compile time vs runtime

Compile time is when you build your program.

Runtime is when you run your program.

To make an analogy with cars, compile time would be the factory,
while runtime would be using the finished car.



The compiler is very strict. If it finds any errors during compile time
it will refuse to build the program.


### Compile time errors

Compile time errors are errors that happen while the compiler is
building your program. In the car analogy, a compile error would happen
if there's an error in the "blueprint"


### Runtime errors

These are errors that happen to the built program, or in this case,
the finished car. It would be like the car blowing up while on the highway.

To minimize the amount of runtime errors the compiler tries to catch them all
during compile time. It's better if it fails in the factory than in the
real world.


## The compiler and datatypes

The first measure the compiler takes is to check that all the datatypes
match. If an operation requires a number, you can't just give it a string.



For example, if we wanted to add a number to a string, we would get an
error:

```thp
50 + "hello"    // Error: The `+` operator expects two Numbers,
                // but an String was found.
```

This way, we can assure that many errors are avoided (since it doesn't
really make sense to add a number to a text).







