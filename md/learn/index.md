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
- Ship a fast, native binary (not written in PHP).
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

That is, while there is value in the items on
the right, we value the items on the left more.

## Compared to PHP

### Differences

### Runtime similarities

## Improvements

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

