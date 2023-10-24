# Interfaces



```thp
interface Serializable
{
    // Methods are always public in interfaces
    fun serialize($) -> String
}



class Cat -> Serializable
{
    pub fun Serializable($) -> String
    {
        // code
    }
}

```

No interface inheritance.

