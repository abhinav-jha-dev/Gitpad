var width = 960,
    height = 500,
    padding = 20,
    maxRadius = 1000;

var reqProp = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    mode: 'cors',
    cache: 'default'
};

var link = d3.linkVertical()
    .x(function (d) {
        return d.x;
    })
    .y(function (d) {
        return d.y;
    });

var circleCoordinates = function (items, r, cx, cy) {
    var coordinates = [];
    for (var i = 0; i < items; i++) {
        var x = cx + r * Math.cos(2 * Math.PI * i / items);
        var y = cy + r * Math.sin(2 * Math.PI * i / items);
        coordinates.push({
            'x': x,
            'y': y
        });
    };
    return coordinates;
};

function responsivefy(svg) {
    const container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style('width'), 10),
        height = parseInt(svg.style('height'), 10),
        aspect = width / height;

    svg.attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMinYMid')
        .call(resize);

    d3.select(window).on(
        'resize.' + container.attr('id'),
        resize
    );

    function resize() {
        const w = parseInt(container.style('width'));
        svg.attr('width', w);
        svg.attr('height', Math.round(w / aspect));
    }
}

function convertToNodesAndLinks(data) {
    let nodeId = 1;
    return data.map(function (val, i) {
        let nodes = [];
        let rootId = nodeId;
        let links = [];

        // Creating Root Node
        nodes.push({
            "id": nodeId,
            "title": val.root.title,
            "size": val.root.size,
            "url": val.root.url,
            "isRoot": true
        });

        // Creating Child Nodes
        val.root.children.map(function (val) {
            nodeId += 1;
            nodes.push({
                "id": nodeId,
                "title": val.title,
                "size": val.size,
                "url": val.url,
                "isRoot": false
            });

            links.push({
                "source": rootId,
                "target": nodeId
            });
        });
        return {
            "nodes": nodes,
            "links": links
        }
    });
}

var sectionArea = Math.max(width, height) / 20;

let req = new Request("./data2.json", reqProp);

fetch(req)
    .then(function (resp) {
        return resp.json();
    })
    .then(function (data) {
        console.log(data);
        let cartData = convertToNodesAndLinks(data);

        // let NOC = data.length;
        // var rootx = d3.scalePoint()
        //     .domain(d3.range(NOC))
        //     .range([50, (width - 50)]);


        var nodes = d3.range(cartData.nodes).map(function (val, i) {
            var items = [];
            let rootNode = val.nodes.filter(function (itm) {
                    return itm.isRoot;
                }),
                categoryNodes = val.nodes.filter(function (itm) {
                    return itm.isRoot;
                });

            rootNode.map(function (data) {
                items.push({
                    title: data.title,
                    radius: data.size * 0.1,
                    color: 'slateblue',
                    stroke: '#3a5280',
                    strokeWidth: 3,
                    x: rootx(i),
                    y: height / 2,
                    group: data.group,
                    id: data.id
                });
            });

            let categoryCoordinates = circleCoordinates(categoryNodes.length, sectionArea * 3, rootx(i), height / 2);
            categoryNodes.map(function (data, i) {
                items.push({
                    title: data.title,
                    radius: data.size * 0.1,
                    color: 'slateblue',
                    stroke: '#3a5280',
                    strokeWidth: 3,
                    x: categoryCoordinates[i].x,
                    y: categoryCoordinates[i].y,
                    group: data.group,
                    id: data.id
                });
            });
            return items;
        });

        // var links = d3.range(NOC).map(function (i) {
        //     var items = [];
        //     data[i].links.map(function (d) {
        //         var sourceNode = nodes[i].filter(function (item) {
        //             return item.id == d.sourceId;
        //         });
        //         var targetNodes = nodes[i].filter(function (item) {
        //             return item.group == d.targetId;
        //         });

        //         targetNodes.map(function (d) {
        //             items.push({
        //                 source: {
        //                     "x": sourceNode[0].cx,
        //                     "y": sourceNode[0].cy,
        //                     "id": sourceNode[0].id
        //                 },
        //                 target: {
        //                     "x": d.cx,
        //                     "y": d.cy,
        //                     "id": d.id
        //                 }
        //             });
        //         });
        //     });
        //     return items;
        // });

        // console.log(links);

        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height)
            .call(responsivefy);

        var force = d3.layout.force()
            .size([width, height])
            .nodes(nodes)
            .links(cartData.links);

        force.linkDistance(25);

        var link = svg.selectAll('.link')
            .data(links)
            .enter().append('line')
            .attr('class', 'link');
        var node = svg.selectAll('.node')
            .data(nodes)
            .enter().append('circle')
            .attr('class', 'node');

        force.on('end', function () {
            node.attr('r', 25)
                .attr('cx', function (d) {
                    return d.x;
                })
                .attr('cy', function (d) {
                    return d.y;
                });
            link.attr('x1', function (d) {
                    return d.source.x;
                })
                .attr('y1', function (d) {
                    return d.source.y;
                })
                .attr('x2', function (d) {
                    return d.target.x;
                })
                .attr('y2', function (d) {
                    return d.target.y;
                });
        });

        force.start();

        // var circle = nodes.map(function (node) {
        //     let g = svg.append("g");
        //     return g.selectAll("circle")
        //         .data(node)
        //         .enter().append("circle")
        //         .attr("r", function (d) {
        //             return d.radius;
        //         })
        //         .style("fill", function (d) {
        //             return d.color;
        //         })
        //         .attr('stroke', function (d) {
        //             return d.stroke;
        //         })
        //         .attr('cx', function (d) {
        //             return d.cx;
        //         })
        //         .attr('cy', function (d) {
        //             return d.cy;
        //         })
        //         .attr('stroke-width', function (d) {
        //             return d.strokeWidth;
        //         }).classed("selected", false);
        // });

        // nodes.map(function (node) {
        //     let g = svg.append("g");
        //     return g.selectAll('text')
        //         .data(node)
        //         .enter()
        //         .append('text')
        //         .attr('fill', 'black')
        //         .attr("font-size", function (d) {
        //             return d.size * 0.1 / ((d.size * 0.1 * 10) / 100);
        //         })
        //         .attr('dx', function (d) {
        //             return d.cx;
        //         })
        //         .attr('dy', function (d) {
        //             return d.cy;
        //         })
        //         .attr("dominant-baseline", "middle")
        //         .attr("text-anchor", "middle")
        //         .text(function (d) {
        //             return d.title;
        //         })
        //         .classed("selected", false);
        // });



        // var linkGroup = svg.append("g")
        //     .attr('id', 'linkGroup');

        // linkGroup.append("svg:defs").selectAll("marker")
        //     .data(["end"]) // Different link/path types can be defined here
        //     .enter().append("svg:marker") // This section adds in the arrows
        //     .attr("id", String)
        //     .attr("viewBox", "0 -5 10 10")
        //     .attr("refX", 5)
        //     .attr("refY", 0.5)
        //     .attr("markerWidth", 5)
        //     .attr("markerHeight", 5)
        //     .attr("orient", "auto")
        //     .append("svg:path")
        //     .attr("fill", "white")
        //     .attr("d", "M0,-5L10,0L0,5");

        // var linkPaths = links.map(function (cluster) {
        //     return linkGroup.selectAll(null)
        //         .data(cluster)
        //         .enter()
        //         .append("path")
        //         .attr("fill", "none")
        //         .attr("stroke", "black")
        //         .attr("class", function (d) {
        //             return d.sourceId;
        //         })
        //         .attr("marker-end", "url(#end)")
        //         .attr("d", link);
        // });

    });