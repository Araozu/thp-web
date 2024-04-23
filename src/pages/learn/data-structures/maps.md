---
layout: ../../../layouts/PagesLayout.astro
title: Maps
---

# Maps

Also known as Associative Arrays, or Objects in other languages.

All maps must have a definition, which define their fields and datatypes.
There can also be anonymous maps, which may contain any key.

## Named Maps

```thp
// Here we define a map, called Person
map Person {
    String name,
    String surname,
    Int age,
}

// Here we declare an instance of a Person.
val john_doe = Person {
    name: "John",
    surname: "Doe",
    age: 33,
}

// If the compiler can infer the type of a Map,
// we can omit its type
var Person mary_jane = .{
    name: "Mary",
    surname: "Jane",
    age: 27,
}
```

To access the fields of a map we use square braces `[]`.

```thp
mary_jane["age"] += 1
print(mary_jane["name"])  // Mary
```

Or dot access `.` if the field's name is a valid identifier.

```thp
mary_jane.age += 1
print(mary_jane.name)
```


## Anonymous maps

An anonymous map allows us to store and retrieve any key of any datatype.
They are declared as `Map`.

```thp
val car = Map {
    brand: "Toyota",
    model: "Corolla",
    year: 2012,
}
```

Anonymous maps can also can have their type omitted.

```thp
var car = .{
    brand: "Toyota",
    model: "Corolla",
    year: 2012,
}
```

If the compiler encounters a map without a type (that is, `.{}`)
and doesn't expect a specific type, it will assume it is an
anonymous map.

We can freely assign fields to an anonymous map:

```thp
// Modify an existing field
car["year"] = 2015
// Create a new field
car["status"] = "used"
```

However, if we try to access a field of an anonymous map we'll get
a nullable type, and we must annotate it.

```thp
// This is ok, we are declaring what datatype we expect
String? car_status = car["status"]

// This won't work, the compiler doesn't know what datatype to use
var car_status = car["status"]
```

Instead, we can use the `get` function of the map, which expects a
datatype and returns that type as nullable

```thp
val car_status = car.get[String]("status")
```

Both ways to get a value will check that the key exists in the map,
and that it has the correct datatype. If either the key doesn't exist
or it has a different datatype, it will return `null`.

We can also use dynamic keys, following the same rules:

```thp
val generated_value = "key"

String? v = map[generated_value]
// or
val v = map[String](generated_value)
```
