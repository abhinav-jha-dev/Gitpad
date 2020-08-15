# Going Further with Basic Types

Topics to learn:
- Destructing assignments
- Spread operator
- Tuple Type
- Union Type
- Intersection Type
- Mixins Type
- String literal Type
- Types aliases

## Destructing assignments
> The process of assigning the elements of the array or the properties of an individual variables.

``` typescript
// Destructuring Arrays
let medals : string[] = ['gold','silver','bronze'];

let first: string = medals[0];
let second: string = medals[1];
let third: string = medals[2];

let [first, second, third] = medals; // new syntax

// Destructuring Objects
let person = {
    name:"Abhinav",
    address: "mohali",
    phone: "978-678"
};

let name: string = person.name;
let address: string = person.address;
let phone: string = person.phone;

let {name, address, phone} = person; // new syntax
```

## The Spread operator
> ES 2015, Ability to spread the elements of an array across the elements of the new array given in the set of function parameters.

``` typescript

let newBookIDs =[10, 20];

let allBookIDs = [1,2,3, ...newBookIDs];

// [1, 2, 3, 10, 20]

let poets = ['abhinav', 'arthor'];
let authors =['shivam', 'suman', 'pallavi'];

authors.push(...poets);

// ['shivam', 'suman', 'pallavi', 'abhinav', 'arthor']
```

## Tuple operator
> A tuple type combines a set of numerically named properties with the members of an array type. 
> <br>*(TypeScript Language Specification - Section 3.3.3 Version 1.8 - January 2016)*

> *Same as Dictionary(Key, Value) pair in C#*

- Extension to arrays
- Types of a fixed number of elements is specified
- May contain different types

``` typescript
let myTuple : [number, string] = [10, 'testString'];

myTuple[0] = 'testString'; // ERROR (Compile Type)
myTuple[1] = 20; // ERROR (Compile Type)

myTuple[2] = 'testString';
myTuple[2] = 20;

// Creating custom Tuple Type 'KeyValuePair'

interface KeyValuePair<K, V> extends Array<k | V> {
    0:K;
    1:V;
}

let catalog: KeyValuePair<string, int> = ['testString', 10];
```

## Combining Types (Union and Intersection Types)
> Both of them are the ways of describing a type in terms of other type.
> <br> Mixin is a technique of implementing intersection type.

### Union Types
- Specify several valid types for a value
- Vertical bar is used to separate valid types

``` typescript
function PrintIdentifier(id: string | number) {
    // print things here
}
```

### Intersection Types
- Specify a value that will contain all members of several types
- Ampersand is used to separate included types

``` typescript
function CreateCoolNewDevice(): Phone & Tablet {
    // phablet is born
}
```

### Creating a Mixin
> Along with traditional OO hierarchies, another popular way of building up classes from reusable components is to build them by combining simpler partial classes. 

``` typescript
// Disposable Mixin
class Disposable {
    isDisposed: boolean;
    dispose() {
        this.isDisposed = true;
    }

}

// Activatable Mixin
class Activatable {
    isActive: boolean;
    activate() {
        this.isActive = true;
    }
    deactivate() {
        this.isActive = false;
    }
}

class SmartObject implements Disposable, Activatable {
    constructor() {
        setInterval(() => console.log(this.isActive + " : " + this.isDisposed), 500);
    }

    interact() {
        this.activate();
    }

    // Disposable
    isDisposed: boolean = false;
    dispose: () => void;
    // Activatable
    isActive: boolean = false;
    activate: () => void;
    deactivate: () => void;
}
applyMixins(SmartObject, [Disposable, Activatable]);

let smartObj = new SmartObject();
setTimeout(() => smartObj.interact(), 1000);

////////////////////////////////////////
// In your runtime library somewhere
////////////////////////////////////////

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
```

## String Literal Types and Type Aliases
> String literal is treated as distinct string type.
> It can be refereed as Enum in C#

``` typescript
let empCategory: 'Manager';
let empCategory: 'Manager' = 'Manager';
let empCategory: 'Manager' = 'Non-Manager'; // ERROR
let empCategory: 'Manager' | 'Non-Manager' = 'Manager';
```

> Type Aliases are just a way to refer to a type with a different name.

``` typescript
let empCategory: 'Manager' | 'Non-Manager' = 'Manager';

type EmployeeType = 'Manager' | 'Non-Manager';
let empCategory: EmployeeType = 'Manager';
let empCategory: EmployeeType = 'Non-Manager';
let empCategory: EmployeeType = 'Intern'; // ERROR
```