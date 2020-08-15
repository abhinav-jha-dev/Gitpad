# Design Patterns
> Artistic approach for Managing your code.

In software engineering, a design pattern is a general repeatable solution to a commonly occurring problem in software design. A design pattern isn't a finished design that can be transformed directly into code. It is a description or template for how to solve a problem that can be used in many different situations.

## Creational design patterns
These design patterns are all about class instantiation. This pattern can be further divided into class-creation patterns and object-creational patterns. While class-creation patterns use inheritance effectively in the instantiation process, object-creation patterns use delegation effectively to get the job done.

> Before jumping into `Factory Method` pattern, I would suggest you to start with [`Simple Factory`][1] to have a basic understanding of how we implement `Factory` pattern.

- [**Factory Method**][2]<br>
  Creates an instance of several derived classes
- [**Abstract Factory**][3]<br>
  Creates an instance of several families of classes
- [**Builder**][4]<br>
  Separates object construction from its representation
- [**Object Pool**][5]<br>
  Avoid expensive acquisition and release of resources by recycling objects that are no longer in use
- [**Prototype**][6]<br>
  A fully initialized instance to be copied or cloned
- [**Singleton**][7]<br>
  A class of which only a single instance can exist

## Structural design patterns
These design patterns are all about Class and Object composition. Structural class-creation patterns use inheritance to compose interfaces. Structural object-patterns define ways to compose objects to obtain new functionality.

- **Adapter**<br>
  Match interfaces of different classes
- **Bridge**<br>
  Separates an object’s interface from its implementation
- **Composite**<br>
  A tree structure of simple and composite objects
- **Decorator**<br>
  Add responsibilities to objects dynamically
- **Facade**<br>
  A single class that represents an entire subsystem
- **Flyweight**<br>
  A fine-grained instance used for efficient sharing
- **Private Class Data**<br>
  Restricts assessor/mutator access
- **Proxy**<br>
  An object representing another object

## Behavioral design patterns
These design patterns are all about Class's objects communication. Behavioral patterns are those patterns that are most specifically concerned with communication between objects.

- **Chain of responsibility**<br>
  A way of passing a request between a chain of objects
- **Command**<br>
  Encapsulate a command request as an object
- **Interpreter**<br>
  A way to include language elements in a program
- **Iterator**<br>
  Sequentially access the elements of a collection
- **Mediator**<br>
  Defines simplified communication between classes
- **Memento**<br>
  Capture and restore an object's internal state
- **Null Object**<br>
  Designed to act as a default value of an object
- **Observer**<br>
  A way of notifying change to a number of classes
- **State**<br>
  Alter an object's behavior when its state changes
- **Strategy**<br>
  Encapsulates an algorithm inside a class
- **Template method**<br>
  Defer the exact steps of an algorithm to a subclass
- **Visitor**<br>
  Defines a new operation to a class without change

## FAQ

> When to think of design patterns?

Before writing code you should create UML diagram of your application flow by using SOLID principles. At this stage you will use different design patterns based on your requirements.

Please post your FAQ or comments regarding design patterns [as an issue](https://github.com/abhinav2127/DesignPattern_CSharp/issues) profile so that we can discuss them later.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## References

### Books
* [Head First Design Pattern](https://www.amazon.in/Head-First-Design-Patterns-Brain-Friendly/dp/9352132777/ref=sr_1_1?s=books&ie=UTF8&qid=1548777791&sr=1-1&keywords=head+first+design+patterns)
  
### Websites
* [Source Making](https://sourcemaking.com)



<!-- Links and Images -->

[1]: creational/simple-factory.md
[2]: creational/factory-method.md
[3]: creational/abstract-factory.md
[4]: creational/builder.md
[5]: creational/object-pool.md
[6]: creational/prototype.md
[7]: creational/singleton.md