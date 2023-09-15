# Comments

You may have noticed that in some code examples there are some
lines of text explaining the code:

```thp
// This is the variable
val person = "John"
```

Comments are used to explain what the code does. Anything written
in a comment is ignored by THP.

## Single line comments

As the name says, these comments span only 1 line. To create one write
two slashes together `//`. Everything after the slashes and before
the newline will be ignored.

```thp
// This is a single line comment
// You can write anything you want here, although it's usually
// used to describe the code

// The commend ends where the line ends,
so this line will not be ignored by THP, and will throw an error
```



## Multi line comments

As the name says, these comments can span multiple lines.

They have 2 components: a start and a end. To start a multiline comment
write a slash and asterisk `/*`, and to end the comment, the inverse `*/`

```thp
/*
    This is a multiline comment.
    I can write whatever I want here, and across multiple
    lines, as long as I'm before the closing characters (* /)
*/
```


## Using comments to prevent code execution

Since comments are ignored by THP, we can use them to prevent certain
parts of the code from running.

Let's say we have this script:

```thp
print("Hello John")
print("How's your day going?")
```

If I wanted the 2nd line not to execute, I can use a comment:

```thp
print("Hello John")
// print("How's your day going?")
```

Now the second line is ignored, and the message is not printed.

The same can be done with multiline comments.


```thp
print("Hello John")
/*
print("How's your day going?")
*/
```




