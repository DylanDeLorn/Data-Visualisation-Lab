var w = 300;
var h = 300;
var minValue = 5;
var maxValue = 10;

var outerRadius = w /2;
var innerRadius = 0;

var arc = d3.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);

var pie = d3.pie();