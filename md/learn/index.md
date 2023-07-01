# Welcome

Welcome to the documentation of the THP programming languague.

THP is a new programming language that compiles to PHP.

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
- Emit readable PHP code (but not meant to be edited).
- Implement a LSP server.


## Not goals

These are **not** aspects that THP looks to solve or implement.

- Be what TypeScript is for JavaScript.
- Use PHP syntax/conventions.
- 


## Philosophy



## Compared to PHP

### Differences

### Runtime similarities

## Improvements

```misti
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

match PDO(dbUri dbUser dbPassword) {
    Ok(connection) -> { /* db operations */ }
    Err(pdoException) -> { /* handle exception */ }
}
```

