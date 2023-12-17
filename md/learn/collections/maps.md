# Maps

Also known as Associative Arrays


## Usage without a declaration

```thp
let mut person = Obj {
    name: "John",
    surname: "Doe",
    age: 33,
}


print("Hello {person.name}")

person.age += 1

print("You just turned {person.age}")
```


## Usage with a declaration

```thp
obj Person = {
    String name,
    String surname,
    Int age,
}


let john_doe = Person {
    name: "John",
    surname: "Doe",
    age: 33,
}
```




