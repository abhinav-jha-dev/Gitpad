# Implementing Asynchronous Patterns

Topics I covered:
- Why asynchronous code is important
- Callback function
- Promises
- Async/await

## Why asynchronous code is important
Asynchronous programming means that the engine runs in an event loop. When a blocking operation is needed, the request is started, and the code keeps running without blocking for the result. When the response is ready, an interrupt is fired, which causes an event handler to be run, where the control flow continues.

## Callback Function
Callbacks are passed as a parameter of the function that perform operation based on specific task. A "higher order" function may be passed function as parameters.

A Callbacks execute after an asynchronous operation is completed which is commonly used to process asynchronous results. A Callback function may have any signature as parameter however conventionally a callback function accept an error and a data parameter to process the results.

``` typescript
interface LibManagerCallback{
    (err: Error, title: string[]): void;
}
function getBooks(cat: Category, callback:LibManagerCallback):void{
    setTimeout(()=>{
        try{
            let foundBooks: string[] = util.GetBookTitlesByCategory(cat);

            if(foundBooks.length>0){
                callback(null, foundBooks);
            }
            else {
                throw new Error('No books found.');
            }
        }
        catch(error){
            callback(error, null);
        }
    },2000)
}

function logCategorySearch(err: Error, title: string[]): void{
    if(err){
        console.log("Error message: $(err.message)");
    }
    else{
        console.log("Found the following titles:");
        console.log(titles);
    }
}

console.log('Beginning search...');
getBooks(Category.Fiction, logCategorySearch);
console.log('Search Completed...');
```

## Promises
The Promise object is used for asynchronous computations. A Promise represents a value which may be available now, or in the future or never.

- Native support in ES2015
  - Requires Typescript --target compiler option set to ES2015
- Simple API
  - then
  - catch
- Similar To Tasks in C#
- May be chained together
- Created by passing a function to the Promise constructor

``` typescript
// Syntax
function doAsyncWork(resolve, reject){
    // perform async calls
    if(success) resolve(data);
    else reject(reason);
}
let p: Promise<string> = new Promise(doAsyncWork);

// Handling Promise Result
let p: Promise<string> = MethodThatReturnsPromise();
p.then(stringData => console.log(stringData))
.catch(reason => console.log(reason));

// Example
function getBooks(cat: Category):Promise<string[]>{
    let p: promise<string[]> = new Promise((resolve, reject)=>{
        setTimeout(()=>{
            let foundBooks: string[] = util.GetBookTitlesByCategory(cat);

            if(foundBooks.length>0){
                resolve(foundBooks);
            }
            else {
                reject('No books found.');
            }
    },2000)
    });
}

console.log('Beginning search...');
getBooks(Category.Fiction)
        .then(titles => console.log('Found titles : ${titles}'))
        .catch(reason => console.log(reason));
console.log('Search Completed...');
```

> NOTE  Before creating a Promise you should edit the *tsconfig.json* within *compilerOptions* add "target" to ES2015. Make sure the browser supports ES2015

## Async/Await Keywords
- Allows code to be written more linearly
- Very similar to async/await in C#
- Uses ES2015 features
  - Promises
  - Generators
  - Iterators
- Coming soon to ES5

``` typescript
async function doAsyncWork(){
    let  results = await GetDataFromServer();
    console.log(results);
}

console.log('Beginning async work...');
doAsyncWork();
console.log('Async work Completed...');
```