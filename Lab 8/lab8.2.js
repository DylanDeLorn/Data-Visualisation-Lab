var w = 500;
var h = 300;

var projection = d3.geoMercator()
    .center([145, -36.5])
    .translate([w / 2, h / 2])
    .scale(2450);

var path = d3.geoPath()
    .projection(projection);

var svg = d3.select("#chart")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

var color = d3.scaleQuantize()
    .range([
        "#f1eef6",
        "#d7b5d8",
        "#df65b0",
        "#dd1c77",
        "#980043"
    ]);

d3.csv("VIC_city.csv").then(function(cityData) {
    Promise.all([
        d3.csv("VIC_LGA_unemployment.csv"),
        d3.json("LGA_VIC.json")
    ]).then(function(data) {
        var csvData = data[0];
        var json = data[1];

        csvData.forEach(function(d) {
            d.unemployed = +d.unemployed;
        });

        color.domain([
            d3.min(csvData, function(d) { return d.unemployed; }),
            d3.max(csvData, function(d) { return d.unemployed; })
        ]);

        var dataByLGA = {};
        csvData.forEach(function(d) {
            dataByLGA[d.LGA] = d.unemployed;
        });

        //merge
        json.features.forEach(function(d) {
            d.properties.unemployed = dataByLGA[d.properties.LGA_name];
        });

        //map
        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", function(d) {
                var value = d.properties.unemployed;
                if (value) {
                    return color(value);
                } else {
                    return "#ccc";
                }
            });

        svg.selectAll("circle")
            .data(cityData)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
                return projection([+d.lon,+d.lat])[0];
            })
            .attr("cy", function(d) {
                return projection([+d.lon,+d.lat])[1];
            })
            .attr("r", 5)
            .style("fill", "blue") 
            .style("stroke", "black"); 

        svg.append("text")
            .attr("x", w / 2)
            .attr("y", 20)
            .attr("text-anchor", "middle")
            .style("font-size", "29px")
            .style("color", "black")
            .text("Victorian Number Unemployed by LGA");
    });
});