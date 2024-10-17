function init() {
    var w = 550;
    var h = 350;

    var projection = d3.geoMercator()
                    .center([145, -36.5])
                    .translate([w/2, h/2])
                    .scale(3000);
    
    var path = d3.geoPath()
                    .projection(projection);
    
    var color = d3.scaleQuantize()
                    .range(d3.schemeGreens[9]);
    
    var svg =d3.select("#MapOnPage")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .attr("fill", "grey");
}