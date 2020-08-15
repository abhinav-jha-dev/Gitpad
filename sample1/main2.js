var width = window.innerWidth,
    height = window.innerHeight;

var reqProp = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    mode: 'cors',
    cache: 'default'
};



function convertToNodesAndLinks(data) {
    let nodeId = 0;
    return data.map(function (val, i) {
        let nodes = [];
        let links = [];

        // Creating Root Node
        let rootId = nodeId;
        nodes.push({
            "id": nodeId,
            "title": val.root.title,
            'radius': val.root.size * 0.1,
            'color': 'slateblue',
            'stroke': '#3a5280',
            'strokeWidth': 3,
            "url": val.root.url,
            "isRoot": true
        });

        // Creating Child Nodes
        val.root.children.map(function (val) {
            nodeId += 1;
            nodes.push({
                "id": nodeId,
                "title": val.title,
                'radius': val.size * 0.1,
                'color': 'slateblue',
                'stroke': '#3a5280',
                'strokeWidth': 3,
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

let req = new Request("./data2.json", reqProp);
var svg = d3.select("body").append("svg").attr("width", width).attr("height", height);

var container = svg.append("g");

svg.call(
    d3.zoom()
        .scaleExtent([.1, 4])
        .on("zoom", function () {
            svg.select('g').attr("transform", d3.event.transform);
        })
);

fetch(req)
    .then(function (resp) {
        return resp.json();
    })
    .then(function (data) {
        let count = 0;
        let cartData = convertToNodesAndLinks(data);
        console.log(cartData);
        cartData.forEach(graph => {

            var label = {
                'nodes': [],
                'links': []
            };

            graph.nodes.forEach(function (d, i) {
                label.nodes.push({
                    node: d
                });
                if (!d.isRoot) {
                    let root = label.nodes.filter(ele => ele.node.isRoot)[0];
                    label.links.push({
                        source: i,
                        target: 0,
                    });
                }
            });
            console.log(label);
            var labelLayout = d3.forceSimulation(label.nodes)
                .force("charge", d3.forceManyBody().strength(-50))
                .force("link", d3.forceLink(label.links).distance(0).strength(2));

            var graphLayout = d3.forceSimulation(graph.nodes)
                .force("charge", d3.forceManyBody().strength(-7000))
                .force("center", d3.forceCenter(width / 2, height / 2))
                .force("x", d3.forceX(width / 2).strength(1))
                .force("y", d3.forceY(height / 2).strength(1))
                .force("link", d3.forceLink(graph.links).id(function (d) {
                    return d.id;
                }).distance(200).strength(0))
                .on("tick", ticked);

            var adjlist = [];

            graph.links.forEach(function (d) {
                adjlist[d.source.index + "-" + d.target.index] = true;
                adjlist[d.target.index + "-" + d.source.index] = true;
            });

            function neigh(a, b) {
                return a == b || adjlist[a + "-" + b];
            }
            var cluster = container.append("g")
                .attr("transform", () => {
                    var clusterWidth = width / data.length;
                    var clusterHeight = count > 0 && count % 4 == 0 ? height / 2 : 0;
                    var clusterX = -clusterWidth + (clusterWidth * count);

                    return "translate(" + clusterX + "," + clusterHeight + ")"
                });

            var link = cluster.append("g").attr("class", "links")
                .selectAll("line")
                .data(graph.links)
                .enter()
                .append("line")
                .attr("stroke", "#aaa")
                .attr("stroke-width", "1px");

            var node = cluster.append("g").attr("class", "nodes")
                .selectAll("g")
                .data(graph.nodes)
                .enter()
                .append("circle")
                .attr("id", function (d, i) { return "node" + i; })
                .attr("r", function (d) {
                    return d.radius;
                })
                .style("fill", function (d) {
                    return d.color;
                })
                .attr('stroke', function (d) {
                    return d.stroke;
                })
                .attr('stroke-width', function (d) {
                    return d.strokeWidth;
                });

            node.on("mouseover", focus).on("mouseout", unfocus);

            node.call(
                d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended)
            );

            var labelNode = cluster.append("g").attr("class", "labelNodes")
                .selectAll("text")
                .data(label.nodes)
                .enter()
                .append("text")
                .attr("id", function (d, i) { return "labelNode" + i; })
                .text(function (d, i) {
                    return d.node.title;
                })
                .style("fill", 'black')
                .style("font-family", "Arial")
                .attr("dominant-baseline", "middle")
                .attr("text-anchor", "middle")
                .style("font-size", 12)
                .style("pointer-events", "none"); // to prevent mouseover/drag capture

            node.on("mouseover", focus).on("mouseout", unfocus);
            function wrap(text, width) {
                text.each(function () {
                    var text = d3.select(this),
                        words = text.text().split(/\s+/).reverse(),
                        word,
                        line = [],
                        lineNumber = 0,
                        lineHeight = 1.1, // ems
                        dy = parseFloat(0),
                        tspan = text.text(null).append("tspan").attr("x", 0).attr("dy", dy + "em")
                    while (word = words.pop()) {
                        line.push(word)
                        tspan.text(line.join(" "))
                        if (tspan.node().getComputedTextLength() > width) {
                            line.pop()
                            tspan.text(line.join(" "))
                            line = [word]
                            tspan = text.append("tspan").attr("x", 0).attr("dy", `${++lineNumber * lineHeight + dy}em`).text(word)
                        }
                    }
                });
            }

            labelNode.call(wrap, 100);

            function ticked() {

                node.call(updateNode);
                link.call(updateLink);

                labelLayout.alphaTarget(0).restart();
                labelNode.each(function (d, i) {
                    var b = this.getBBox();
                    d.x = d.node.x;
                    d.y = d.node.y;
                    var diffX = d.x;
                    var diffY = d.y;

                    var dist = Math.sqrt(diffX * diffX + diffY * diffY);

                    var shiftX = b.width * (diffX - dist) / (dist * 2);
                    shiftX = Math.max(-b.width, Math.min(0, shiftX));
                    var shiftY = 16;
                    this.setAttribute("transform", "translate(" + shiftX + "," + shiftY + ")");
                });
                labelNode.call(updateNode);

            }

            function fixna(x) {
                if (isFinite(x)) return x;
                return 0;
            }

            function focus(d) {
                var index = d3.select(d3.event.target).datum().index;
                node.style("opacity", function (o) {
                    return neigh(index, o.index) ? 1 : 0.1;
                });
                labelNode.attr("display", function (o) {
                    return neigh(index, o.node.index) ? "block" : "none";
                });
                link.style("opacity", function (o) {
                    return o.source.index == index || o.target.index == index ? 1 : 0.1;
                });
            }

            function unfocus() {
                labelNode.attr("display", "block");
                node.style("opacity", 1);
                link.style("opacity", 1);
            }

            function updateLink(link) {
                link.attr("x1", function (d) {
                    return fixna(d.source.x);
                })
                    .attr("y1", function (d) {
                        return fixna(d.source.y);
                    })
                    .attr("x2", function (d) {
                        return fixna(d.target.x);
                    })
                    .attr("y2", function (d) {
                        return fixna(d.target.y);
                    });
            }

            function updateNode(node) {
                node.attr("transform", function (d) {
                    return "translate(" + fixna(d.x) + "," + fixna(d.y) + ")";
                });
            }

            function dragstarted(d) {
                d3.event.sourceEvent.stopPropagation();
                if (!d3.event.active) graphLayout.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }

            function dragged(d) {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            }

            function dragended(d) {
                if (!d3.event.active) graphLayout.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }

            count += 1;
        });


    });