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

            svg.selectAll("rect") 
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
            })
            .attr("fill", "slategrey")
            .on("mouseover", function (event, d) {
                d3.select(this)
                .attr("fill", "orange");
                var xPosition = parseFloat(d3.select(this).attr("x"));
                var yPosition = parseFloat(d3.select(this).attr("y"));
                
                svg.append("text")
                .attr("id", "tooltip")
                .attr("x", xPosition + xScale.bandwidth() / 2)
                .attr("y", yPosition + 20)
                .text(d)
                .style("text-anchor", "middle")
                .style("fill", "black");
            })
            .attr("fill", "slategrey").on("mouseout", function() {
                d3.select(this).attr("fill", "slategrey");
            	d3.select("#tooltip").remove();
            }); 
            //.on("mouseover", function() {
                //d3.select(this)
                  //.transition() // Add transition for smooth effect
                  //.duration(200) // Example duration of 200ms
                  //.attr("fill", "orange");
            //})
            //.on("mouseout", function() {
                //d3.select(this)
                  //.transition() // Add transition for smooth effect
                  //.duration(200) // Example duration of 200ms
                  //.attr("fill", "slategrey"); // Return to original color
            //})
            //.append("title")
            //.text(function(d) {
                //return "The value is " + d + ".";
            //});  

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
      .attr("x", function(d, i) {  // Set initial x position
        return xScale(i);
      })
      .attr("y", function(d) {  // Set initial y position
        return yScale(d);
      })
      .attr("width", xScale.bandwidth())
      .attr("height", function(d) {  // Set initial height
        return h - padding - yScale(d);
      })
      .attr("fill", "slategrey")
      //.on("mouseover", function() {
        //d3.select(this)
          //.transition()
          //.duration(200)
          //.attr("fill", "orange");
      //})
      //.on("mouseout", function() {
        //d3.select(this)
          //.transition()
          //.duration(200)
          //.attr("fill", "slategrey");
      //})
      //.append("title")
      //.text(function(d) {
        //return "The value is " + d + ".";
      //})
      .merge(bars)
      .attr("fill", "slategrey")
      .on("mouseover", function (event, d) {
        d3.select(this)
        .attr("fill", "orange");
        var xPosition = parseFloat(d3.select(this).attr("x"));
        var yPosition = parseFloat(d3.select(this).attr("y"));
                
        svg.append("text")
        .attr("id", "tooltip")
        .attr("x", xPosition + xScale.bandwidth() / 2)
        .attr("y", yPosition + 20)
        .text(d)
        .style("text-anchor", "middle")
        .style("fill", "black");
        })
        .attr("fill", "slategrey").on("mouseout", function() {
        d3.select(this).attr("fill", "slategrey");
    	d3.select("#tooltip").remove();
        })
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
  });
  d3.select("button.remove")
  .on("click", function() {
    dataset.shift(); // Remove the first element from the dataset

    // Update the scales
    xScale.domain(d3.range(dataset.length));
    yScale.domain([0, d3.max(dataset)]);

    // Re-bind the data to the bars 
    var bars = svg.selectAll("rect").data(dataset);

    // Exit selection
    bars.exit()
      .transition()
      .duration(500)
      .attr("x", w) // Move exiting bar to the right edge
      .remove();

    // Update remaining bars
    bars
      .transition()
      .duration(500)
      .attr("x", function(d, i) { return xScale(i); }) 
      .attr("y", function(d) { return yScale(d); })
      .attr("width", xScale.bandwidth())
      .attr("height", function(d) { return h - padding - yScale(d); });
  });