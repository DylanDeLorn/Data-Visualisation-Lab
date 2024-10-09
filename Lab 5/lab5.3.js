var w = 700;
var h = 400;
var padding = 40;
var fontSize = 10;

var dataset = [14, 5, 26, 23, 9];

var xScale = d3.scaleBand()
                .domain(d3.range(dataset.length))
                .rangeRound([0, w])
                .paddingInner(0.05);

var yScale = d3.scaleLinear()
                .domain([0, d3.max(dataset)])
                .range([h - padding, fontSize * 5]);

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
        return h - padding - yScale(d);
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
    

// Add the functionality to add data points from lab6.1.js
d3.select("button.add")
  .on("click", function() {
    var maxValue = 25;
    var newNumber = Math.floor(Math.random() * maxValue);
    dataset.push(newNumber);

    xScale.domain(d3.range(dataset.length));
    yScale.domain([0, d3.max(dataset)]);

    var bars = svg.selectAll("rect").data(dataset);

    bars.enter()
      .append("rect")
      .merge(bars)
      .transition()
      .duration(500)
      .ease(d3.easeElasticOut)
      .attr("x", function(d, i) {
        return xScale(i);
      })
      .attr("y", function(d) {
        return yScale(d);
      })
      .attr("width", xScale.bandwidth())
      .attr("height", function(d) {
        return h - padding - yScale(d);
      });


    var labels = svg.selectAll("text").data(dataset);

    labels.enter()
      .append("text")
      .merge(labels)
      .transition()
      .duration(500)
      .ease(d3.easeElasticOut)
      .attr("fill", "black")
      .text(function(d) {
        return d;
      })
      .attr("x", function(d, i) {
        return xScale(i) + xScale.bandwidth() / 2;
      })
      .attr("y", function(d) {
        return yScale(d) - 5;
      });
  });


  d3.select("button.remove")
  .on("click", function() {
    dataset.shift(); // Remove the first element from the dataset

    // Update the scales
    xScale.domain(d3.range(dataset.length));
    yScale.domain([0, d3.max(dataset)]);

    // Re-bind the data to the bars and update their attributes
    svg.selectAll("rect")
      .data(dataset)
      .transition()
      .duration(500)
      .attr("x", function(d, i) { return xScale(i); }) // Recalculate x position
      .attr("y", function(d) { return yScale(d); })
      .attr("width", xScale.bandwidth())
      .attr("height", function(d) { return h - padding - yScale(d); });

    // Remove the text labels for the removed data point
    var labels = svg.selectAll("text").data(dataset);
    labels.exit().remove();

    // Update the remaining text labels
    labels
      .transition()
      .duration(500)
      .text(function(d) { return d; })
      .attr("x", function(d, i) { return xScale(i) + xScale.bandwidth() / 2; })
      .attr("y", function(d) { return yScale(d) - 5; });
  });