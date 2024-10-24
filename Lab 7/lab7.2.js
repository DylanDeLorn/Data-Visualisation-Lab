var w = 300;
var h = 300;
var minValue = 5;
var maxValue = 10;

var outerRadius = w /2;
var innerRadius = 0;    //adjust to increase if donut chart is desired

var dataset1 = [5, 10, 15, 20, 25, 30, 35];

var svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

var arc = d3.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);

var color = d3.scaleOrdinal(d3.schemeCategory10);

var pie = d3.pie();  

var arcs = svg.selectAll("g.arc")
                .data(pie(dataset1))
                .enter()
                .append("g")
                .attr("class", "arc")
                .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

arcs.append("path")
                .attr("fill", function(d, i) {
                    return color(i);
                })
                .attr("d", arc);

arcs.append("text")
    .text(function(d) {
        return d.value;
    })
    .attr("transform", function(d) {
        return "translate(" + arc.centroid(d) + ")";
    })
