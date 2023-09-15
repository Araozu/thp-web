# Input & Output

At the end of the day, a program takes some input,
and transform it to some output. We will explore how to
receive data, and also present it.

## Output

There are many ways to show the result of our programs.
One of them is called `standard output`, which in simplified
terms, is the terminal from where we run our program.

### `print`

Create an empty file, and name it `hello.php`. We will create
a program that shows a result to our screen.

Inside `hello.php` write the following code:

```thp
print("Hello")
```

Then, open a terminal and run the program with the `thp` command.
After you press ENTER, you will see in the terminal the text "Hello".


```sh
$ thp hello.thp  # Copy this command and run it
Hello            # This is the output of our program
```

The thp function `print` allows us to display something in the terminal.

If you change the `hello.php` file, and run it, you'll see how it changes.

```thp
print(322)
```
```sh
$ thp hello.php
322
```

Or, if you copy `print` multiple times, each will show something in the screen.

```thp
print("Hello")
print("This is an example")
print("of having many prints")
```
```sh
$ thp hello.php
Hello
This is an example
of having many prints
```

### Using `print` in a larger program





