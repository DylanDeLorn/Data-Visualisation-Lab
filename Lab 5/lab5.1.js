var w = 500;
var h = 150;
var padding = 3;
var fontSize = 10;

var dataset = [14, 5, 26, 23, 9];

var xScale = d3.scaleBand()
                .domain(d3.range(dataset.length))
                .rangeRound([0, w])
                .paddingInner(0.05);

var yScale = d3.scaleLinear()
                .domain([0, d3.max(dataset)])
                .range([h, fontSize * 5]);

var svg = d3.select(".chart-container")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("fill", "rgb(106, 90, 205)");

svg.selectAll("rect") //creates rectangle
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
        return xScale(i);
    })
    .attr("y", function(d){
        return yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) {
        return h - yScale(d);
    });

svg.selectAll("text") //label for rectangles
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d) {
        return d;
    })
    .attr("fill", "black")
    .attr("x", function(d, i) {
        return xScale(i) + xScale.bandwidth() / 2;
    })
    .attr("y", function(d){
        return yScale(d) - 5;
    });
    
d3.select("button.update")
    .on("click", function() {
        var numValues = dataset.length;
        var maxValue = 25;
        dataset = [];

        for (var i=0; i < numValues; i++) {
            var newNumber = Math.floor(Math.random()* maxValue);
            dataset.push(newNumber);
        }

        // Update the y-scale domain to accommodate potential new maximum values
        yScale.domain([0, d3.max(dataset)]);

        svg.selectAll("rect") // Update rectangles
            .data(dataset)
            .attr("y", function(d){
                return yScale(d);
            })
            .attr("height", function(d) {
                return h - yScale(d);
            });

        svg.selectAll("text") // Update text labels
            .data(dataset)
            .text(function(d) {
                return d;
            })
            .attr("x", function(d, i) {
                return xScale(i) + xScale.bandwidth() / 2;
            })
            .attr("y", function(d){
                return yScale(d) - 5; // Position labels above the bars
            });
    });