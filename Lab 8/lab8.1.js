var w = 200;
var h = 100;

var projection = d3.geoMercator()
                    .center([145, -36.5])
                    .translate([w/2, h/2])
                    .scale(9800);
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
        .attr("x", w / 2) 
        .attr("y", 20) 
        .attr("text-anchor", "middle") 
        .style("font-size", "29px") 
        .style("color", "black")
        .text("Victorian LGA Map");
});