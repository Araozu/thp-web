# Hello, world!

This pages shows you how to write and run your first THP script.

## Prerequisites

You will need to have PHP and THP installed. If you haven't already, see the
install page.

## Writing the program

Create a new file called `hello.thp`, and inside write the following (you can
copy and paste):

```thp
print("Hello, world!")
```

Then, save the code.

## Running the program

Open a terminal in the folder where you created the file `hello.thp`.
Then write the following command and press enter:

```sh
thp hello.thp
```

This will run the program, and produce the following result:

```sh
Hello, world!
```

Congratulations! You just wrote your first THP program!

## Explaining the program

Now let's understand the code.

```thp
print("Hello, world!")
```

There are 2 essential components:

- `print` - print is a "function", it takes some value and performs some action with it.
    In this case, it takes a text and displays it in the terminal.
- `"Hello, world!"` - Is the text that the function `print` takes, and displays in
    the terminal. Note that it is enclosed in quotation marks.

## What to do next

You can now experiment with the program you wrote. What happens if you change the text?
What if you don't put quotation marks? And what are the parenthesis for?

To continue learning about THP, continue to the next page, where you'll learn
about "datatypes".

