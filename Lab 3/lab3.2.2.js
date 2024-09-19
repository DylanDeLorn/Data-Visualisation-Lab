var w = 550;
var h = 400;
padding = 55; //20,90,33,95,12,44,67,21,88,50

var dataset = [
    [2, 8, 5],
    [3, 5, 4],
    [5, 17, 5],
    [6, 6, 6],
    [6, 12, 11],
    [7, 20, 4],
    [8, 22, 4],
    [10, 11, 9],
    [5, 12, 4],
    [6, 16, 5]
];

var xScale = d3.scaleLinear()
                .domain([d3.min(dataset, function(d) {
                    return d[0];
                }),
                d3.max(dataset, function(d) {
                    return d[0];
                })])
                .range([padding, w - padding]);

var yScale = d3.scaleLinear()    
                .domain([0, d3.max(dataset, function(d) {
                    return d[1];
                }),
                d3.max(dataset, function(d) {
                    return d[1];
                })])
                .range([h - padding, padding]);

var svg = d3.select(".chart-container")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("fill", "rgb(106, 90, 205)");

//Define x-axis
var xAxis = d3.axisBottom()
                .scale(xScale)
                .ticks(10);

//Create x-axis
svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis);

//Define y-axis
var yAxis = d3.axisLeft()
                .scale(yScale)
                .ticks(8);

//Create y-axis
svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);

svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d, i) {
        return xScale(d[0]);
    })
    .attr("cy", function(d) {
    return yScale(d[1]);
    })
    .attr("r", function(d) {
    return d[2];  // radius based on array subposition 2. -> [0, 1, 2]
    })
    .attr("fill", function(d) {
    //Conditional to style red 
    if (d[0] < 6) {  
        return "red";
    } else {
        return "slategrey";  
    }
    })

svg.selectAll("label")
    .data(dataset)
    .enter()
    .append("text")
    .attr("class", "label")
    .text(function(d) {
        return d[0] + "," +d[1];
    })
    //Labelling
    .attr("x", function(d) {
        return xScale(d[0]) +10;
    })
    .attr("y", function(d) {
    return yScale(d[1]);
    });

// Add X axis label
svg.append("text")
    .attr("class", "axis-label")
    .attr("text-anchor", "middle")
    .attr("x", w / 2)
    .attr("y", h - padding / 3)
    .text("Tree Age (year)");

// Add Y axis label
svg.append("text")
    .attr("class", "axis-label")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("x", -h / 2)
    .attr("y", padding / 3)
    .text("Tree Height (m)");

window.onload = init;