# Using Advanced Type Features

Topics to learn:
- Polymorphic this type
- Declaration merging
- Type guards
- Symbols

## Polymorphic this type
> A polymorphic this *type* represents a type that is the *subtype* of the containing class or interface.

``` typescript
class LibraryBook {
    CheckIn():this{
        if(this instanceof ChildrensBook){
        console.log("Checking in a ChildrenBook.");
        }
        if(this instanceof ElectronicBook){
        console.log("Checking in a ElectronicBook.");
        }
        return this;
    }
    CheckOut():this{
        console.log("Checking out a Book.");
        return this;
    }
}

class ChildrensBook extends LibraryBook{
    Clean(): this{
        console.log("cleaning a book.");
        return this;
    }
}

class ElectronicBook extends LibraryBook{
    RemoveFromCustomerDe():this{
        console.log("Cleared from customer device.");
        return this;
    }
}

let kidsBook = new ChildrensBook();
kidsBook.CheckIn()
.Clean()
.CheckOut();

let kidsBook = new ChildrensBook();
kidsBook.CheckIn()
.RemoveFromCustomerDe()
.CheckOut();
```
## Declaration merging
> The compiler merges two separate declarations declared with the same name into a single definition.

``` typescript
interface Box {
    height: number;
    width: number;
}

interface Box {
    scale: number;
}

let box: Box = {height: 5, width: 6, scale: 10};
```

### Allowed merges
- Interfaces
- Enums
- Namespaces
- Namespaces with classes
- Namespaces with functions
- Namespaces with enums
### Disallowed merges
- Classes with classes

## Type Guards
> Type Guards allow you to narrow down the type of an object within a conditional block.

### *typeof* Type Guards
- Uses Javascript *typeof* operator
- Compares results of *typeof* operator to a type name
- Type name may only be 'string', 'number', 'boolean' or 'symbol'

``` typescript
let x: string | number = 123;
if(typeof x=='string'){
    // x is a string
}
else{
    // x is a number
}
```
### *instanceof* Type Guards

``` typescript
class Foo {
    foo = 123;
    common = '123';
}

class Bar {
    bar = 123;
    common = '123';
}

function doStuff(arg: Foo | Bar) {
    if (arg instanceof Foo) {
        console.log(arg.foo); // OK
        console.log(arg.bar); // Error!
    }
    if (arg instanceof Bar) {
        console.log(arg.foo); // Error!
        console.log(arg.bar); // OK
    }

    console.log(arg.common); // OK
    console.log(arg.foo); // Error!
    console.log(arg.bar); // Error!
}

doStuff(new Foo());
doStuff(new Bar());
```
### User-Defined Type Guards
> JavaScript doesn't have very rich runtime introspection support built in. When you are using just plain JavaScript Objects (using structural typing to your advantage), you do not even have access to instanceof or typeof. For these cases you can create User Defined Type Guard functions. These are just functions that return someArgumentName is SomeType.

``` typescript
/**
 * Just some interfaces
 */
interface Foo {
    foo: number;
    common: string;
}

interface Bar {
    bar: number;
    common: string;
}

/**
 * User Defined Type Guard!
 */
function isFoo(arg: any): arg is Foo {
    return arg.foo !== undefined;
}

/**
 * Sample usage of the User Defined Type Guard
 */
function doStuff(arg: Foo | Bar) {
    if (isFoo(arg)) {
        console.log(arg.foo); // OK
        console.log(arg.bar); // Error!
    }
    else {
        console.log(arg.foo); // Error!
        console.log(arg.bar); // OK
    }
}

doStuff({ foo: 123, common: '123' });
doStuff({ bar: 123, common: '123' });
```

## Symbols
> Starting with ECMAScript 2015, symbol is a primitive data type, just like number and string.
> symbol values are created by calling the Symbol constructor.


``` typescript
let sym1 = Symbol();

let sym2 = Symbol("key"); // optional string key

// Symbols are immutable, and unique.
let sym2 = Symbol("key");
let sym3 = Symbol("key");

sym2 === sym3; // false, symbols are unique

// Just like strings, symbols can be used as keys for object properties.
let sym = Symbol();

let obj = {
    [sym]: "value"
};

console.log(obj[sym]); // "value"

// Symbols can also be combined with computed property declarations to declare object properties and class members.
const getClassNameSymbol = Symbol();

class C {
    [getClassNameSymbol](){
       return "C";
    }
}

let c = new C();
let className = c[getClassNameSymbol](); // "C"
```

### Well-known Symbols
> In addition to user-defined symbols, there are well-known built-in symbols. Built-in symbols are used to represent internal language behaviors.

Here is a list of well-known symbols:
- **Symbol.hasInstance**
  A method that determines if a constructor object recognizes an object as one of the constructor’s instances. Called by the semantics of the instanceof operator.

Since, this is rarely used, look for more at [More Well-Known Symbols](https://www.typescriptlang.org/docs/handbook/symbols.html).