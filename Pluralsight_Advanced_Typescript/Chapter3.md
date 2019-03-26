# Creating and using decorators

Topics I covered:
- What are decorators?
- How are they implemented?
- Decorator syntax
- Different type of decorators

## What are decorators?
Decorators are:
- Proposed feature for JavaScript
- Declarative programming
- Implemented as functions
- May be attached to the following:
  - Classes
  - Methods
  - Accessors
  - Properties
  - Parameters

> Currently requires the *experimentalDecorators* compiler option

## How are they implemented?
> Decorators are implemented as TypeScript function.

``` typescript
function uielemnt(target: Function) { // do ui stuff }
function deprecated(t: any, p: string, d: PropertyDescriptor)
{
    console.log("This method will go away soon.");
}

@uielement
class ContactForm{
    @deprecated
    someOldMethod(){// this will be deprecated}
}

```

## Decorator Syntax And Factories
> If we want to customize how a decorator is applied to a declaration, we can write a decorator factory. A Decorator Factory is simply a function that returns the expression that will be called by the decorator at runtime.

``` typescript
// this is a class decorator
function uielemnt(element: string){
    return function(target: Function){
        // do something with 'target' and 'value'...
        console.log('Creating new element: $(element)');
    }
}

@uielement('SampleContentElement')
class ContactForm{
}
```

### Class Decorator
A Class Decorator is declared just before a class declaration. The class decorator is applied to the constructor of the class and can be used to observe, modify, or replace a class definition. A class decorator cannot be used in a declaration file, or in any other ambient context (such as on a declare class).


- Class constructors will be passed as parameter to decorator
- Constructor is replaced if there is a return value
- Return void if constructor is not to be replaced

> NOTE  Should you chose to return a new constructor function, you must take care to maintain the original prototype. The logic that applies decorators at runtime will not do this for you.

``` typescript
// ClassDecorator type
<TFunction extends Function>(target: TFunction) => TFunction | void;

// Example
function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
    return class extends constructor {
        newProperty = "new property";
        hello = "override";
    }
}

@classDecorator
class Greeter {
    property = "property";
    hello: string;
    constructor(m: string) {
        this.hello = m;
    }
}

console.log(new Greeter("world"));
```

> NOTE  Before creating a Class Decorator you should edit the *tsconfig.json* within *compilerOptions* add "experimentalDecorators" to true. Now create *decorators.ts* for creating all the decorators of the application.

### Property Decorator
``` typescript
function MyPropertyDecorator(target: Object, propertyKey: string){
    // do decorator stuff
}
```
- First parameter is either constructor function or class prototype
- Second parameter is the name of the decorated method
  
### Parameter Decorator
``` typescript
function MyParameterDecorator(target: Object, propertyKey: string, parameterIndex: number){
    // do decorator stuff
}
```
- First parameter is either constructor function or class prototype
- Second parameter is the name of the decorated method
- Third parameter is the index of the decorated parameter
  
### Method and Accessor Decorators
``` typescript
function MyMethodDecorator(target: Object, propertyKey: string, descriptor: PropertyDescriptor){
    // do decorator stuff
}
```
- First parameter is either constructor function or class prototype
- Second parameter is the name of the decorated method
- Third parameter is the property descriptor of the decorated member

``` typescript
// Example

export function readonly(target: Object,
propertyKey: string, decorator: PropertyDescriptor){
    console.log("SEtting $(propertyKey) to be read-only.");
    descriptor.writable = false;
}

export class test{
    @readonly
    function MyMethod(){

    }
}
```
