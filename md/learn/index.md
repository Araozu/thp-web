# Welcome

Welcome to the documentation of the THP programming languague.

## Goals

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

