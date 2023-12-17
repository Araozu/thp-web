![Accurate visual description of THP](/img/desc_thp.jpg)


# Welcome

Welcome to the documentation of the THP programming languague.

THP is a new programming language that compiles to PHP.

<br>

This page discusses some of the design decitions of the language,
if you want to install THP go to the [installation guide](/installation-guide)

If you want to learn the language, go to the learn section.

## Goals

- Bring static typing to PHP: Not just type hints, not use `mixed` for everything
    that isn't a primitive type.
- Avoid automatic type conversion.
- Remove the inconsistencies in the language.
- Organize the stdlib.
- Differentiate between Arrays, Tuples, Maps and Sets.
- Create a **consistent** language.
- Create typings for popular libraries (like TS's `.d.ts`).
- Have a simple instalation and configuration (requiring just Composer).
- Ship a fast, native binary (written in Rust) (why use PHP when we can go native?).
- Sub 10ms watch mode.
- Support in-place compilation.
- Emit readable PHP code.
- Implement a LSP server.


## Not goals

These are **not** aspects that THP looks to solve or implement.

- Be what TypeScript is for JavaScript (PHP with types).
- Use PHP syntax/conventions.
- Be familiar for PHP developers.


## Philosophy

- Consistency over familiarity
- Change over conventions
- Explicit over implicit


## Some differences with PHP

```thp
// PHP
$has_key = str_contains($haystack, 'needle');

// THP
val has_key = haystack.contains("needle")
```

- Explicit variable declaration
- No `$` for variable names (and thus no `$$variable`)
- No semicolons
- Use methods on common datatypes
- Strings use only double quotes

---

```thp
// PHP
[
    'names' => ['Toni', 'Stark'],
    'age' => 33,
    'numbers' => [32, 64, 128]
]

// THP
Obj {
    names: #("Toni", "Stark"), // Tuple
    age: 33,
    numbers: [32, 64, 128]
}
```

- Tuples, Arrays, Sets, Maps are clearly different
- JS-like object syntax

---

```thp
// PHP
$cat = new Cat("Michifu", 7);
$cat->meow();

// THP
val cat = Cat("Michifu", 7)
cat.meow();
```

- No `new` for classes
- Use dot `.` instead of arrow `->` syntax

---


```thp
// PHP
use \Some\Deeply\Nested\Class
use \Some\Deeply\Nested\Interface

// THP
use Some::Deeply::Nested::{Class, Interface}
```

- Different module syntax
- PSR-4 required
- No `include` or `require`

---

Other things:

- Pattern matching
- ADTs


### Runtime changes

THP should add as little runtime as possible.

```thp
// ===== current =======
val name = "John"
var name = "John"

String name = "John"
var String name = "John"



// ===== new? =======
let name = "John"
let mut name = "John"

String name = "John"
mut String name = "John"


// For primitive datatypes (Int, Float, Bool, String?)

// Cloned
fun add(Int x)
// Still cloned, but the x **binding** can be mutated, not the original variable
fun add(mut Int x)
// Same as 1st
fun add(clone Int x)


// For other datatypes

// Pass an immutable reference
fun add(Obj o)
// Pass a mutable reference
fun add(mut Obj o)
// Clone the argument
fun add(clone Obj o)


// Only references are passed, not "variables" (as PHP calls them)
let john = Obj {name: "John"}
/*
    john --------> {name: "John"}
*/

fun set_empty(mut Obj person) {
    /*
        john ------┬-->  {name: "John"}
        person ----┘ 
    */

    // This creates a **new** Obj, and the variable `person` now points to it.
    person = Obj {name: "Alex"}
    /*
        john --------->  {name: "John"}
        person ------->  {name: "Alex"}
    */
}

set_empty(mut obj)

print(obj)  // Obj {name: "John"}

```



## Example

```thp
use PDO
use Globals::Env

val (Some(dbUri) Some(dbUser) Some(dbPassword)) = (
    Env::get("DB_URI")
    Env::get("DB_USERNAME")
    Env::get("DB_PASSWORD")
)
else {
    die("All 3 db environment variables must be set.")
}

match PDO(dbUri dbUser dbPassword)
| Ok(connection) { /* db operations */ }
| Err(pdoException) { /* handle exception */ }
```

