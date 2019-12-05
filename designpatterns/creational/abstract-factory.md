# Abstract Factory
`Book Definition`: The Abstract Factory Pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes.

`My Definition`: Abstract factory pattern allows clients(in our case NYStylePizzaFactory) to use an abstract interface to create a set of relative(similar) products(like NYStyleCheesePizza) without actually knowing actual products that are actually produced.

## Problem
I have a successful Pizza Stores so far but, I received some complaints on the quality of pizza produced by `NYStylePizzaFactory`. After investigating this issue, I found they are using low-quality ingredients for preparing pizza which they acquire from the local market place. This problem leads me to a situation where I need to find a solution to monitor and maintain my quality of ingredients that my franchises use for creating pizzas. So I read my Design Pattern Bible `Head First Design Pattern`.

So I found my solution with `Abstract Factory Pattern` this helped me to create an `Ingredients Factory` that will provide the ingredients for `NYStylePizzaFactory` and `ChicagoStylePizzaFactory`. Which I have implemented later in this article.

## Solution
That's fairly complicated class diagram to draw; let's look at it all in terms of our PizzaStore:
<img src="Images/PizzaStore_Abstract_Factory_UML.PNG">

What I have done?

<img src="Images/PizzaStore_Steps_UML.PNG">

### Code Implementation

I have not changed a lot in code for implementing abstract factory. Lets follow few steps to implement new changes.

**Step 1**: Create Ingredients factory to create pizza ingredients.
```c#
// filePath : Factory\IIngredientsFactory.cs
public interface IIngredientsFactory
{
    Dough CreateDough();
    Sauce CreateSauce();
    Cheese CreateCheese();
    Veggies[] CreateVeggies();
    Pepperoni CreatePepperoni();
    Clams CreateClam();
}
```
**Step 2**: Implement `IIngredientsFactory` and create `NYPizzaIngredientFactory` and `ChicagoPizzaIngredientsFactory` for supplying ingredients.
```c#
// filePath : Factory\NYPizzaIngredientFactory.cs
public class NYPizzaIngredientFactory : IIngredientsFactory
{
    public Cheese CreateCheese()
    {
        return new MozzarellaCheese();
    }
    public Clams CreateClam()
    {
        return new FreshClams();
    }
    public Dough CreateDough()
    {
        return new ThinCrustDough();
    }
    public Pepperoni CreatePepperoni()
    {
        return new Pepperoni();
    }
    public Sauce CreateSauce()
    {
        return new MarinaraSauce();
    }
    public Veggies[] CreateVeggies()
    {
        return new Veggies[] { new GarlicVeggie(), newOnionVeggie() };
    }
}
```
**Step 3**: Now you can create your own `ChicagoPizzaIngredientsFactory` by implementing Ingredients.

**Step 4**: For Ingredients I have used class inheritance for implementing different type of ingredients. Let see how I implemented this.
```c#
// filePath: Factory\Ingredients\Cheese.cs
public class Cheese
{
}

// filePath: Factory\Ingredients\Categories\ReggianoCheese.cs
public class ReggianoCheese : Cheese
{
}

// filePath: Factory\Ingredients\Categories\MozzarellaCheese.cs
public class MozzarellaCheese : Cheese
{
}
```
**Step 5**: Follow the same order of this category and create you own classes for `Clams`, `Dough`, `Pepperoni`, `Sauce` and `Veggies`

**Step 6**: We have to change the pizza categories for using Ingredients factory and creating pizza.
```c#
// filePath: PizzaItems\Pizza.cs
public abstract class Pizza
{
    public string name { get; set; }
    public Dough dough { get; set; }
    public Sauce sauce { get; set; }
    public Veggies[] Veggies { get; set; }
    public Cheese cheese { get; set; }
    public Clams clams { get; set; }
    public abstract void prepare();
    public virtual void bake()
    {
        Console.WriteLine("Bake for 25 minute at 350.");
    }
    public virtual void cut(string cutStyle)
    {
        Console.WriteLine("Cutting the pizza into " +cutStyle + " slices.");
    }
    public virtual void box()
    {
        Console.WriteLine("Place pizza in official PizzaStore box.");
    }
    public void setName(string name)
    {
        this.name = name;
    }
    public string getName()
    {
        return name;
    }
}

// filePath: PizzaItems\Types\CheesePizza.cs
public class CheesePizza : Pizza
{
    private readonly IIngredientsFactory _ingredientFactory;
    
    public CheesePizza(IIngredientsFactory ingredientFactory)
    {
        _ingredientFactory = ingredientFactory;
    }
    public override void prepare()
    {
        Console.WriteLine("Preparing " + name);
        dough = _ingredientFactory.CreateDough();
        sauce = _ingredientFactory.CreateSauce();
        cheese = _ingredientFactory.CreateCheese();
        clams = _ingredientFactory.CreateClam();
    }
}
```

**Step 7**: Sit back and relax a bit, now our ingredients factory implementation is completed, so lets pass it to our regional factories. I'm implementing it on NY Pizza Factory you can implement in your Chicago Pizza Factory.

```c#
public class NYStylePizzaStore : PizzaStore
{
    public override Pizza CreatePizza(string type)
    {
        Pizza pizza = null;
        IIngredientsFactory ingredientsFactory = newNYPizzaIngredientFactory();
        switch (type)
        {
            case "Cheese":
                pizza = new CheesePizza(ingredientsFactory);
                pizza.setName("NY StyleCheese Pizza");
                break;
            case "Clam":
                pizza = new ClamPizza(ingredientsFactory);
                pizza.setName("NY StyleClam Pizza");
                break;
            default:
                Console.WriteLine("Please select valid pizza type.");
                break;
        }
        return pizza;
    }
}
```

<== [Previous: Index](../README.md)

==> [Next: Builder Pattern](builder.md)