// Set dimensions
var w = 300;
var h = 300;
var margin = {top: 20, right: 20, bottom: 30, left: 40};

var dataset = [
    { apples: 5, oranges: 10, grapes: 22 },
    { apples: 4, oranges: 12, grapes: 28 },
    { apples: 2, oranges: 19, grapes: 32 },
    { apples: 7, oranges: 23, grapes: 35 },
    { apples: 23, oranges: 17, grapes: 43 }
];

var stack = d3.stack()
    .keys(["apples", "oranges", "grapes"])
    .order(d3.stackOrderDescending);  

var series = stack(dataset);

var color = d3.scaleOrdinal()
    .domain(["apples", "oranges", "grapes"])
    .range(["crimson", "orange", "purple"]);

var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .range([margin.left, w - margin.right])
    .padding(0.1);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, function(d) {  
        return d.apples + d.oranges + d.grapes;
    })])
    .range([h - margin.bottom, margin.top]);

// Create main chart SVG
var chartSvg = d3.select("#chart")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

// Add the stacked bars
var groups = chartSvg.selectAll("g.bars")
    .data(series)
    .enter()
    .append("g")
    .classed("bars", true)
    .style("fill", function(d) {
        return color(d.key);
    });

var rects = groups.selectAll("rect")
    .data(function(d) { return d; })
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
        return xScale(i);
    })
    .attr("y", function(d) {
        return yScale(d[1]);
    })
    .attr("height", function(d) {
        return yScale(d[0]) - yScale(d[1]);
    })
    .attr("width", xScale.bandwidth());

// Create separate legend SVG
var legendSvg = d3.select("#legend")
    .append("svg")
    .attr("width", 150)  // Width of legend
    .attr("height", 100);  // Height of legend

// Add legend items
var legendItems = legendSvg.selectAll(".legend-item")
    .data(color.domain())
    .enter()
    .append("g")
    .attr("class", "legend-item")
    .attr("transform", function(d, i) {
        return `translate(10, ${i * 25 + 10})`;  // Position each legend item
    });

// Add colored rectangles to legend
legendItems.append("rect")
    .attr("width", 15)
    .attr("height", 15)
    .style("fill", color);

// Add text labels to legend
legendItems.append("text")
    .attr("x", 25)
    .attr("y", 12)
    .text(function(d) {
        return d.charAt(0).toUpperCase() + d.slice(1);
    })
    .style("font-size", "14px");

// Add some CSS to the container
d3.select("#chart-container")
    .style("display", "flex")
    .style("align-items", "center")
    .style("justify-content", "center")
    .style("gap", "20px");