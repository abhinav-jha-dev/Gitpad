# Builder Pattern

> Separate the construction of a complex object from its representation so that the same construction process can create different representations.


## Problem

When we have an application that need to create an object which has to be constructed using many different objects, we find our client code cluttered with the details of the various part objects that needs to be assembled together to create the resulting object.

To illustrate on above point let us take an example of mobile phone manufacturing system. Lets assume that we have a system installed at one of the mobile phone vendors. Now the manufacturer may decide to create a phone based on parameters like Touchscreen, Operating System, Battery and Stylus. Now if we have the objects for all these parts then creation of product with any combination of above parts would lead to a very complex and unmanageable code in the client application i.e. the module that will decide what kind of phone needs to be built.

## Discussion

What this means is that we will have to design the system in such a way that the client application will simply specify the parameters that should be used to create the complex object and the builder will take care of building the complex object. Let us visualize the class diagram of Builder Pattern.

### UML Class Diagram
<img src="../Images/builder.GIF">

## Structure
Now lets see what are the class and objects we are using in the above class diagram:

- **Builder** (MobileBuilder)
    - specifies an abstract interface for creating parts of a Product object
- **ConcreteBuilder** (Touchscreen, OperatingSystem, Battery, Stylus)
    - constructs and assembles parts of the product by implementing the Builder interface
    - defines and keeps track of the representation it creates
    - provides an interface for retrieving the product
- **Director** (Shop)
    - constructs an object using the Builder interface
- **Product** (MobilePhone)
    - represents the complex object under construction. ConcreteBuilder builds the product's internal representation and defines the process by which it's assembled
    - includes classes that define the constituent parts, including interfaces for assembling the parts into the final result

## Structure Code in C#

This structural code demonstrates the Builder pattern in which complex objects are created in a step-by-step fashion. The construction process can create different object representations and provides a high level of control over the assembly of the objects.

```c#
using System;
using System.Collections.Generic;

namespace Builder
{
    public class BuilderStructure
    {
        static void Main(string[] args)
        {
            // Create director and builders

            Director director = new Director();

            Builder b1 = new ConcreteBuilder1();
            Builder b2 = new ConcreteBuilder2();

            // Construct two products

            director.Construct(b1);
            Product p1 = b1.GetResult();
            p1.Show();

            director.Construct(b2);
            Product p2 = b2.GetResult();
            p2.Show();

            // Wait for user

            Console.ReadKey();
        }
    }

    /// <summary>
    /// The 'Director' class
    /// </summary>
    class Director
    {
        // Builder uses a complex series of steps
        public void Construct(Builder builder)
        {
            builder.BuildPartA();
            builder.BuildPartB();
        }
    }

    /// <summary>
    /// The 'Builder' abstract class
    /// </summary>

    abstract class Builder
    {
        public abstract void BuildPartA();
        public abstract void BuildPartB();
        public abstract Product GetResult();
    }

    /// <summary>
    /// The 'ConcreteBuilder1' class
    /// </summary>
    class ConcreteBuilder1 : Builder
    {
        private Product _product = new Product();

        public override void BuildPartA()
        {
            _product.Add("PartA");
        }

        public override void BuildPartB()
        {
            _product.Add("PartB");
        }

        public override Product GetResult()
        {
            return _product;
        }
    }

    /// <summary>
    /// The 'ConcreteBuilder2' class
    /// </summary>

    class ConcreteBuilder2 : Builder
    {
        private Product _product = new Product();

        public override void BuildPartA()
        {
            _product.Add("PartX");
        }

        public override void BuildPartB()
        {
            _product.Add("PartY");
        }

        public override Product GetResult()
        {
            return _product;
        }
    }

    /// <summary>
    /// The 'Product' class
    /// </summary>
    public class Product
    {
        private List<string> _parts = new List<string>();

        public void Add(string part)
        {
            _parts.Add(part);
        }

        public void Show()
        {
            Console.WriteLine("\nProduct Parts -------");
            foreach (string part in _parts)
                Console.WriteLine(part);
        }
    }
}

```

Output:

```
Product Parts -------
PartA
PartB

Product Parts -------
PartX
PartY
```

## Real-world Example

With this example we are going to create Mobile shop with the help of which you can build multiple mobiles by there model names.

```c#
using System;
using System.Collections.Generic;

namespace Builder
{
    public class BuilderStructure
    {
        static void MainApp(string[] args)
        {
            // Create director and builders

            Director director = new Director();

            Builder b1 = new ConcreteBuilder1();
            Builder b2 = new ConcreteBuilder2();

            // Construct two products

            director.Construct(b1);
            Product p1 = b1.GetResult();
            p1.Show();

            director.Construct(b2);
            Product p2 = b2.GetResult();
            p2.Show();

            // Wait for user

            Console.ReadKey();
        }
    }

    /// <summary>
    /// The 'Director' class
    /// </summary>
    class Director
    {
        // Builder uses a complex series of steps
        public void Construct(Builder builder)
        {
            builder.BuildPartA();
            builder.BuildPartB();
        }
    }

    /// <summary>
    /// The 'Builder' abstract class
    /// </summary>

    abstract class Builder
    {
        public abstract void BuildPartA();
        public abstract void BuildPartB();
        public abstract Product GetResult();
    }

    /// <summary>
    /// The 'ConcreteBuilder1' class
    /// </summary>
    class ConcreteBuilder1 : Builder
    {
        private Product _product = new Product();

        public override void BuildPartA()
        {
            _product.Add("PartA");
        }

        public override void BuildPartB()
        {
            _product.Add("PartB");
        }

        public override Product GetResult()
        {
            return _product;
        }
    }

    /// <summary>
    /// The 'ConcreteBuilder2' class
    /// </summary>

    class ConcreteBuilder2 : Builder
    {
        private Product _product = new Product();

        public override void BuildPartA()
        {
            _product.Add("PartX");
        }

        public override void BuildPartB()
        {
            _product.Add("PartY");
        }

        public override Product GetResult()
        {
            return _product;
        }
    }

    /// <summary>
    /// The 'Product' class
    /// </summary>
    public class Product
    {
        private List<string> _parts = new List<string>();

        public void Add(string part)
        {
            _parts.Add(part);
        }

        public void Show()
        {
            Console.WriteLine("\nProduct Parts -------");
            foreach (string part in _parts)
                Console.WriteLine(part);
        }
    }
}

```

Output:
```
---------------------------
Vehicle Type: Scooter
 Frame : Scooter Frame
 Engine : 50 cc
 #Wheels: 2
 #Doors : 0

---------------------------
Vehicle Type: Car
 Frame : Car Frame
 Engine : 2500 cc
 #Wheels: 4
 #Doors : 4

---------------------------
Vehicle Type: MotorCycle
 Frame : MotorCycle Frame
 Engine : 500 cc
 #Wheels: 2
 #Doors : 0
```

Thanks for reading hope it solves your problem.

<== [Previous: Index](../README.md)

==> [Next: Object Pool Pattern](object-pool.md)