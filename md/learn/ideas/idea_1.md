# Idea 1


var x = 20
val y = 30

type Something = ...

Something s1 = ...
Something s2 = s1


// Passes `some` by reference, but it's immutable. Cannot call mutable methods
// or use it in mutable operations
fun do_something(Something some) -> Bool {}
do_something(s1)

// Passes `some` by reference, and it's mutable. Can call mutable methods
// or use it in mutable operations
fun do_something(&Something some) -> Bool {}
do_something(&s1)


var arr1 = Array(10, 20, 30)
var arr2 = &arr1


            Owned/Reference     Mutable
Type            Owned              n
&Type         Reference            n
mut Type        Owned              y
&mut Type     Reference            y


            Copy/Reference      Mutable     Equivalent
Some            Copy               n            1           (technically) references the other data
&Some         Reference            n            1           References the other data
mut Some        Copy               y            2           Creates a __mutable__ copy
&mut Some     Reference            y            3           References the other data, __mutable__


## `Array[A]::map`

```thp
fun map[B](this, (A) -> B callback) -> Array[B]
```

Applies `callback` to all the elements of this array, and
returns those new values in a new array.

### Example

```thp
val numbers = Array(1, 2, 3, 4, 5)

val numbers_squared = numbers.map {it ** 2}

print(numbers_squared)  // Array(1, 4, 9, 16, 25)

numbers.map(fun(v) {
    v - 2
})
```



## `Array[A]::reduce`

```thp
fun reduce[B](
    this,
    B initial,
    (A previous, B current) -> B callback,
) -> B
```

Iteratively reduce the array to a single value using `callback`.


### Example

```thp
val numbers = Array(1, 2, 3, 4, 5)

val sum = numbers.reduce(0, \+)
val sum = numbers.reduce(0) {$1 + $2}
val sum = numbers.reduce(0, fun(prev, curr) {prev + curr})

print(sum)  // 15
```


```thp
val numbers = Array(1, 2, 3, 4, 5)

val sum = numbers.reduce("", fun(prev, curr) {prev + curr})

val sum = numbers.reduce("") {prev, curr -> prev + curr}

print(sum)  // "12345"
```


```thp
// Functor

fun fmap(
    (A) -> B,
    f[A],
) -> f[B]

fun (<$)(
    A,
    f[B],
) -> f[A]


// Applicative

fun pure(A) -> f[A]

fun (<*>)(
    f[A -> B],
    f[A],
) -> f[B]

fun (*>)(
    f[_],
    f[B],
) -> f[B]

fun (<*)(
    f[A],
    f[_],
) -> f[A]


// Monad

fun (>>=)[m, A, B](
    m[A],
    (A) -> m[B],
) -> m[B]


(Array[Int], Int -> Array[String]) -> Array[String]

val result = Array(1, 2, 3, 4, 5) >>= {Array($.into[String]())}

print(result)   // Array("1", "2", "3", "4", "5")
```


```thp
Option[Int] result = "322".try_into()
Option[Int] result_halved = result >>= {Some($ / 2)}

print(result_halved)    // Some(161)


Option[Int] result = "abc".try_into()
Option[Int] result_halved = result >>= {Some($ / 2)}

print(result_halved)    // None
```

```thp
fun (<$>)[m, A, B](
    (A) -> B,
    m[A],
) -> m[B]


fun half(Int x) -> Int {
    x / 2
}


Option[Int] result = "322".try_into()
Option[Int] result_halved = result <$> half

print(result_halved)    // Some(161)


Option[Int] result = "abc".try_into()
Option[Int] result_halved = result <$> half

print(result_halved)    // None
```

```thp
fun (>>)[A, B, C](
    (A) -> B,
    (B) -> C,
) -> (A) -> C

val f1 = add1 >> times2

f1(5)   // 12
```

