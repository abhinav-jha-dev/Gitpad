# D3.JS Notes

## D3 Principles

### Selections
```javascript
d3.select("body") //selects the <body> html element
// Note: All the css selectors can be used to select element.
```

### Append Operator
```javascript
d3.select("body")
  .append("svg")//add new <svg> inside body
  .append("rect")//add new <rect> inside body
// Note: You can specify all the type of svg elements with there respective tag name
```

### Style Operator
```javascript
d3.select("body")
  .append("svg")//add new <svg> inside body
  .append("rect")//add new <rect> inside body
    .attr("width", 50)
    .attr("height", 200)
    .style("fill","blue")
// Note: SVG Css properties can be assinged with there respective values.
```
> Note: Minify your code for production use.

## Working with data

Its very simple to manage shape with d3 js. Below example will show you how things are implemented based on data.

```javascript
var w = 200;
var h = 100;
var padding = 2;
var dataset = [5, 10, 15, 20 ,25];

var svgElement = d3.select("body")
                   .append("svg")
                   .attr("width", w)
                   .attr("height", h);

svg.select("rect") // this will select all the rectangle elements that will be added to the svg
  .data(dataset) // specify your dataset over here.
  .enter() // enter function will specify that all the elements after this will be ittrated based on dataset length.
  .append("rect") // add <rect> tags based on dataset length.
    .attr("x", function(d, i){ // this function will be called for every ittration where 'd' is the value of dataset and 'i' is the index of the element.
      return (i * (w/dataset.length)); // here we are adjusting the x axis based on with and dataset element so that it is contained within svg viewport.
    })
    .attr("y", function(d, i){
      return h - (d*4); // here we are adjusting the height of rectangle bar based on svg height.
    })
    .attr("width", w/dataset.length - padding)
    .attr("height", function(d){
      return (d*4);
    });
```

## Basic charting with D3JS

A simple bar chart is implemented above. Feel free to use it.

Now, lets color our Bar Chart.

```javascript
// the simple way to color your bars is to add fill attribute.
var w = 200;
var h = 100;
var padding = 2;
var dataset = [5, 10, 15, 20 ,25];

var svgElement = d3.select("body")
                   .append("svg")
                   .attr("width", w)
                   .attr("height", h);

svg.select("rect") 
  .data(dataset) 
  .enter() 
  .append("rect")
    .attr("x", function(d, i){
      return (i * (w/dataset.length)); 
    })
    .attr("y", function(d, i){
      return h - (d*4); 
    })
    .attr("width", w/dataset.length - padding)
    .attr("height", function(d){
      return (d*4);
    })
    .attr("fill", function(d){
      return "rgb("+(d*10)+",0,0)";  // this will give a beautiful red gradient to bar chart.
    });
```

That is a very rough code example let make it prietier. We can use Json to add attributes in a single go. Look at the below example.

```javascript
// the simple way to color your bars is to add fill attribute.
var w = 200;
var h = 100;
var padding = 2;
var dataset = [5, 10, 15, 20 ,25];

var svgElement = d3.select("body")
                   .append("svg")
                   .attr("width", w)
                   .attr("height", h);

svg.select("rect") 
  .data(dataset) 
  .enter() 
  .append("rect") 
    .attr({
    x: function(d, i){ return (i * (w/dataset.length));},
    y: function(d, i){return h - (d*4); },
    width: w/dataset.length - padding,
    height: function(d){return (d*4);},
    fill: function(d){return "rgb("+(d*10)+",0,0)";}
    });
```
