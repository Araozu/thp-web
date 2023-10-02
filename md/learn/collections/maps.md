# Maps

Also known as Associative Arrays


## Usage without a declaration

```thp
var person = Obj {
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


val john_doe = Person {
    name: "John",
    surname: "Doe",
    age: 33,
}
```




