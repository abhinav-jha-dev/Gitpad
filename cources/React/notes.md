# React and Redux notes

- Created by FB and used in the main applications of Facebook Applications.

Reason to choose react for development:

## Flexibility

- React is a library not a framework.
- React can be used in Web APP's, Static Sites, Mobile APP's(React Native), Desktop APP's(using electron), Server-rendered (Next.js), and Virtual Reality (React VR)
- React renderers are the important part that gives react the power of flexibility. The renderers are `react-dom` for browsers, `react-native` for mobile, `react-vr` for Virtual Reality.
    > To get more on renderers follow this awesome list https://github.com/chentsulin/awesome-react-renderer.
- Server Side rendering can be done using `NEXT.js`, `Gatsby` and `Phenomic`.

## Development Experience

- Small and Simple API's for developing application.
- React is so simple that you can just follow the simple import and declare your class or method.

> jsx and tsx are the special type of Javascript file that will convert simple html to react js or react ts, as shown below.
> ```jsx
> Original HTML: <div class="Test">Hello World!</div>
> Converted React Code: React.createElement("div",{class:"Test"},"Hello World!")
> ```

Functional Implementation:

``` tsx
import { React } from 'React';

function HelloWorld(props){
    return <div>Hello {props.name}</div>;
}

```

Class Implementation:

``` tsx
import { React } from 'React';

export class HelloWorld extends React.Component {
    render(){
        return <div>Hello {props.name}</div>;
    }
}

```

> Comparing with other JS Framework for listing data, where other framework add "JS" in HTML, react add "HTML" in JS.

```html
<!-- "JS" in HTML -->
<div *ngFor="let user of users">

<!-- "HTML" in JS -->
{users.map(createUser)}

```

### Create your first react app

```sh
# install global create react app
> npm install -g create-react-app

# create new application
> create-react-app <app_name>

# start your react app
> npm start

```
> In React each component is atomic, that means you can work on different components in parallel.

> **You can also use online react editor https://codesandbox.io/ where you can write and create your entire app.**

## Corporate Investment

- Many wellknown Corporations are deeply committed to react.
- React facebook blog will keep you updated.
- [x] `react-codemod` will help you to transform breaking changes from previous version. Ref: https://github.com/reactjs/react-codemod

> If you are looking for an alternative library just like React, Inferno is also a light weight library only have file size of 9 KB and Preact is only 3 KB.

## Awesome react list contains all the details related to testing and libraries on github https://github.com/enaqx/awesome-react

## React performance is significantly fast compared to other frameworks. As it avoid layout trash.


# Trade-off of choosing react

## Framework vs Library

| Framework | Library |
|:-:|:-:|
| Clear opinions | Light-weight |
| Less decision fatigue | Sprinkle on existing apps |
| Less setup overhead | Pick what you need |
| More cross-team consistency | Choose best tech/Popular boiler plate available |


