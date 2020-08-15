# The Simple Factory
The Simple Factory isn't actually a Design Pattern; it's more of a programming idiom. Some developers do mistake this idiom for the "Factory Pattern," so the next time there is an awkward silence between you and another developer, you've got a nice topic to break the ice.

This is a UML diagram shown in [Head First Design Pattern](https://www.amazon.in/Head-First-Design-Patterns-Brain-Friendly/dp/9352132777/ref=sr_1_1?s=books&ie=UTF8&qid=1548777791&sr=1-1&keywords=head+first+design+patterns) :

<img src="../images/SimpleFactory_UML.PNG" data-canonical-src="../images/SimpleFactory_UML.PNG"/>

This is a self explanatory diagram of Simple Factory idiom.

## Problem Statement

I want to start my Pizza Store and want my store to have four types of pizza shown on the above UML diagram. But, since I don't have any knowledge of design patterns, I have created my store application as shown below:

I think this will be the default approach that most of the developers will use to create their pizza store:

``` c#
public Pizza OrderPizza(string type)
{
    Pizza pizza;
    // This is wrong to specify pizza creational logic within orderPizza() method.
    // we need to move this somewhere else lets discuss that below.
    if(type == "CheesePizza")
        pizza = new CheesePizza();
    else if(type == "VeggiePizza")
        pizza = new VeggiePizza();
    else if(type == "ClamPizza")
        pizza = new ClamPizza();
    else if(type == "PepperoniPizza")
        pizza = new PepperoniPizza();
    else
        pizza = new CheesePizza();
    // ----------

    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();

    return pizza;
}
```
This program will work for me but when I read about the object oriented design patterns and came across `Head First Design Pattern` book, I found that I am thinking it in a wrong way.

But being a Software Developer, I wanted my store to be more loosely coupled, as time passes I will have more competitions in my region. So, if I want to add or remove any pizza I have to update my `OrderPizza` method all the time. Which will bring me in a situation where i will end up with pile of garbage code since I have to write all the logic in the same class.

But, where can I move this code from here.
> `Move in the new Method` : Moving this login to a new method will not solve the problem for me as I have to again edit my `Program` class for adding and removing order and when I want my application to calculate the cost of pizza I will end up mixing all the code in a single class which is a voilation of SRP(Single Responsibility Principle).
  
So, how I solved this problem, I have created my store class `PizzaStore` and given it the responsibility to take orders based on the type of pizza, I have also injected my `PizzaFactory` class that will help my store to create pizza using `PizzaFactory`. My `PizzaFactory` will take the type of pizza and by using `IPizza` interface it will prepare, bake, cut and box the pizza and send it back to `PizzaStore`.

So, Lets see how it looks on the directory:

```
- PizzaStore.cs
- PizzaFactory.cs
- PizzaModel
    IPizza.cs
    - Types
        - CheesePizza.cs
        - VeggiePizza.cs
        - ClamPizza.cs
        - PepperoniPizza.cs
```

> So, with this model when ever we have any update in the menu item, we will update the factory and the store will not be effected.

## Usage
Let me run my pizza store application:

```
$ cd SimpleFactory
$ dotnet build
$ dotnet run
Welcome to my Pizza Store!
Please enter your pizza type from
(Cheese)(Veggie)(Clam)(Pepperoni)
Cheese

Preparing Cheese Pizza
Backing Cheese Pizza
Cutting Cheese Pizza
Boxing Cheese Pizza

Thank for Ordering SimpleFactory.PizzaModel.Types.CheesePizza please collect your order from front desk in 15 min.
```

## Moving Forward
Hurray! My pizza store is looking great now and I am getting a lot of profit from it.

Now, my store is going popular and I want to start franchises in the next town to increase my profit. I will update my current architecture with `Factory Method Pattern` and introduce the cost calculator to calculate pizza cost based on item used. To understand how I have expended my store app follow my next design pattern.

<== [Previous: Index](../README.md)

==> [Next: Factory Method Pattern](factory-method.md)