# Creational - Factory Method Pattern
Factory method pattern encapsulates object creation by letting subclasses decide what object to create. Here is the class diagram showing how this pattern works:

<img src="../Images/Creator_Class_Factory_Method_UML.PNG" data-canonical-src="../Images/Creator_Class_Factory_Method_UML.PNG"/>
<img src="../Images/Product_Class_Factory_Method_UML.PNG" data-canonical-src="../Images/Product_Class_Factory_Method_UML.PNG"/>

> This self explanatory UML diagram is the example stated in [Head First Design Pattern](https://www.amazon.in/Head-First-Design-Patterns-Brain-Friendly/dp/9352132777/ref=sr_1_1?s=books&ie=UTF8&qid=1548777791&sr=1-1&keywords=head+first+design+patterns).

## Problem Statement
Hello guys, I am glad that you have followed my story with my `Simple Pizza Factory`, I have earned huge success and got offers to start franchises of my Pizza Store in `New York` and `California`.

Before modifying my code for these franchises, I want to list out my `quality control rules` and `cost calculation` as I don't want them to misuse my name by not maintaining the quality that I give to my customers, and also I want them to feel free for taking orders and inventing pizza based on the competition.

### Franchises Requirements
- I want all the franchise pizza store to leverage my PizzaStore code, so that pizzas are prepared in the same way.
- NY style pizza will have thin crust, tasty sauce and little cheese. (based on the requirements)
- Chicago style pizza will have thick crust, rich sauce and tons of cheese. (based on the requirements)
- Need to control quality control to prevent mistake in Cutting and Boxing pizza.
  
## Solution
There is a way to localize all the pizza making activities in the pizza store.
First, lets look into the changes in the `Pizza Store`:
```C#
// Making Pizza Store abstract helped me to move our CreatePizza logic
// to sub classes (NYStylePizzaStore) (ChicagoStylePizzaStore)
public abstract class PizzaStore
{
    public IPizza OrderPizza(string type)
    {
        IPizza pizza;
        pizza = CreatePizza(type);

        pizza.prepare();
        pizza.bake();
        pizza.cut();
        pizza.box();
        
        return pizza;
    }

    // All the responsibility for instantiating Pizzas has been moved into
    // a method that acts as a factory.
    public abstract IPizza CreatePizza(string type);  // Now this method will create factory.

    // Other methods here
}
```

> One more thing I want to change in my PizzaStore, I have to change my IPizza Interface to Pizza abstract class, with the help of which I can force the steps required in pizza making process. This abstract class will help my franchises to follow the basic steps mention in this abstract class and can override their step if they want to update the process.

```c#
public abstract class Pizza
{
    public abstract string name { get; set; }
    public abstract string dough { get; set; }
    public abstract string sauce { get; set; }
    public abstract List<string> toppings { get; set; }
    public virtual void prepare()
    {
        Console.WriteLine("Preparing " + name);
        Console.WriteLine("Tossing dough...");
        Console.WriteLine("Adding sauce...");
        Console.WriteLine("Adding toppings: ");
        foreach (string topping in toppings)
        {
            Console.WriteLine(" " + topping);
        }
    }
    public virtual void bake()
    {
        Console.WriteLine("Bake for 25 minute at 350.");
    }
    public virtual void cut()
    {
        Console.WriteLine("Cutting the pizza into diagonal slices.");
    }
    public virtual void box()
    {
        Console.WriteLine("Place pizza in official PizzaStore box.");
    }
    public string getName()
    {
        return name;
    }
}
```

> You must be wondering how this will help me, wait for a min and look into some of the pizza class.

```c#
// My NY Style Sauce and Cheese Pizza
public class NYStyleCheesePizza : Pizza
{
    public override string name { get; set; }
    public override string dough { get; set; }
    public override string sauce { get; set; }
    public override List<string> toppings { get; set; }= new List<string>();
    public NYStyleCheesePizza()
    {
        name = "NY Style Sauce and Cheese Pizza";
        dough = "Thin Crust Dough";
        sauce = "Marinara Sauce";
        toppings.Add("Grated Reggiano Cheese");
    }
}

// My Chicago Style Sauce and Cheese Pizza
public class ChicagoStyleCheesePizza : Pizza
{
    public override string name { get; set; }
    public override string dough { get; set; }
    public override string sauce { get; set; }
    public override List<string> toppings { get; set; } = new List<string>();
    public ChicagoStyleCheesePizza()
    {
        name = "Chicago Style Deep Dish Cheese Pizza";
        dough = "Extra Thick Crust Dough";
        sauce = "Plum Tomato Sauce";
        toppings.Add("Shredded Mozzarella Cheese");
    }
    public override void cut()
    {
        Console.WriteLine("Cutting the pizza into square slices.");
    }
}
```

> In the above implementation you can see the difference from `Simple Factory` to `Factory Method`.

## Usage
You've waited long enough. Time for some pizzas!

```
$ cd FactoryMethod
$ dotnet build
$ dotnet run
Welcome to my Pizza Store!
Please enter your pizza type from
(Cheese)(Clam)

Cheese

Preparing NY Style Sauce and Cheese Pizza
Tossing dough...
Adding sauce...
Adding toppings:
Grated Reggiano Cheese

Bake for 25 minute at 350.

Cutting the pizza into diagonal slices.

Place pizza in official PizzaStore box.

Thank for Ordering FactoryMethod.PizzaItems.Types.NYStyleCheesePizza please collect your order from front desk in 15 min

Preparing Chicago Style Deep Dish Cheese Pizza

Tossing dough...
Adding sauce...
Adding toppings:
 Shredded Mozzarella Cheese

Bake for 25 minute at 350.

Cutting the pizza into square slices. 

Place pizza in official PizzaStore box.
Thank for Ordering FactoryMethod.PizzaItems.Types.ChicagoStyleCheesePizza please collect your order from front desk in 15 min
```

## Moving Forward
Hurray! My pizza franchises are thanking me for this great effort that I have put to create my stores.

Now, my stores is going popular and I will look for `Abstract Factory Pattern` to make implement some more compatibility with my Pizza Store.


<== [Previous: Index](../README.md)

==> [Next: Abstract Factory Pattern](abstract-factory.md)