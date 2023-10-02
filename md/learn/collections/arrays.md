# Arrays

No destructuring (for now?). There's no `[]` syntax
for constructing arrays

## Usage

```thp
val fruits = Array("apple", "banana", "cherry")
val apple = fruits.[0]

print(apple)


var numbers = Array(0, 1, 2, 3)

// Note the dot
numbers.[3] = 5

print(numbers.[3])  // 5
```


## Type signature


```thp
Array[String]
Array[Int]
```





