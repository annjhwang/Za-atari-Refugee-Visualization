
// SVG Size
var margin = {top: 20, right: 20, bottom: 30, left: 60},
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// load the csv data from buildings.csv
d3.csv("data/refugee-population.csv", function(data) {
    console.log(data);

    // change population from string to number
    data.forEach( function(d) {
        d.population = +d.population;
    });

    // change date to proper format
    var format = d3.time.format("%Y-%m-%d");
    data.forEach( function(d) {
        d.date = format.parse(d.date);
    });

    // create new SVG
    var svg = d3.select("#left").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // group
    var group = svg.append("g");

    // min and max for population
    var popMin = d3.min(data, function (d) {
        return d.population;
    });

    var popMax = d3.max(data, function (d) {
        return d.population;
    });

    // scale time for x axis
    var x = d3.time.scale()
        .domain([data[0].date, data[data.length - 1].date])
        .rangeRound([0, width]);

    // scale population for y axis
    var y = d3.scale.linear()
        .domain([popMin, popMax])
        .range([height, 0]);

    // x axis
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(d3.time.format("%B %Y"));

    // y axis
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var tooltip = d3.select("body")
		.append("div")
		.style("position", "absolute")
		.style("z-index", "10")
		.style("visibility", "hidden")
		.text("Population tip");
		
	var sampleSVG = d3.select(".example_div")
		.append("svg:svg")
		.attr("class", "sample")
		.attr("width", 300)
		.attr("height", 300);    
		
	d3.select(".example_div svg")
		.append("svg:group")
		.attr("stroke", "black")
		.attr("fill", "aliceblue")
		.attr("r", 50)
		.attr("cx", 52)
		.attr("cy", 52)
		.on("mouseover", function(){return tooltip.style("visibility", "visible");})
		.on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
		.on("mouseout", function(){return tooltip.style("visibility", "hidden");});


    // area chart
    var area = d3.svg.area()
        .x(function(d) {
            return x(d.date);
        })
        .y0(height)
        .y1(function(d) {
            return y(d.population);
        });

    // added path/upper boundary of chart
    var path = svg.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .style("text-anchor", "end")
        .text("Date")
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(15)");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Population");

});

d3.csv("data/housing.csv", function(data) {
    console.log(data);

    data.forEach( function(d) {
        d.percentage = +d.percentage;
    });

	// RIGHT SIDE OF TABLE

	var svg2 = d3.select("#right").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var xScale = d3.scale.ordinal()
                .domain([data[0].type, data[1].type, data[2].type])
                .range([0, width/2 ,width]);

	var yScale = d3.scale.linear()
				.domain([0, 1])
				.range([height, 0]);

	// all functions for the			
    var barWidth = width / data.length;
    var bar = svg2.selectAll("g")
    	.data(data)
    	.enter()
    	.append("g")
      	.attr("transform", function(d, i) 
      		{ return "translate(" + i * barWidth + ",0)"; });

	bar.append("rect")
		.attr("y", function(d) { return yScale(d.percentage / 100); })
        .attr("height", function(d) { return height - yScale(d.percentage/100); })
	    .attr("width", barWidth - 20)
	    .attr("fill", "pink");

	bar.append("text")
        .attr("x", barWidth / 2)
        .attr("y", function(d) { return yScale(d.percentage/100) + 3; })
	    .attr("dy", ".75em")
	    .text(function(d) { return d.percentage; });

	// x axis
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

    var formatPercent = d3.format(".0%");
    // y axis
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .tickFormat(formatPercent);

    svg2.append("g")
        .attr("class", "x axis")
        .style("text-anchor", "end")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg2.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Percentage");



});

