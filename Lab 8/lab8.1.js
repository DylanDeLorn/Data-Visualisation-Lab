var w = 800;
var h = 500;

var projection = d3.geoMercator()
                    .center([145, -36.5])
                    .translate([w/2, h/2])
                    .scale(2450);
var path = d3.geoPath()
            .projection(projection);
var svg = d3.select(".chart-container")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("fill", "grey");

d3.json("LGA_VIC.json").then(function(json) {
    svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path);

        svg.append("text")
        .attr("x", w / 2) // Center the title horizontally
        .attr("y", 20) // Adjust the vertical position as needed
        .attr("text-anchor", "middle") // Center the text around the 'x' position
        .style("font-size", "16px") // Adjust font size as needed
        .text("Victorian LGA Map");
});