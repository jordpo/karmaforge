var KarmaForge = KarmaForge || {};

KarmaForge.data3 = {};

KarmaForge.data3.getLocationData = function () {
  var data = $('#global-stats').attr('data');
  this.current_set = JSON.parse(data);
  return true;
};

// appends canvas on DOM
KarmaForge.data3.draw = function () {
  var max = d3.max(this.current_set, function (d) { return +d.total_points } ),
    width = 400,
    height = 400,
    widthScale,
    color,
    axis,
    canvas,
    svg;

  widthScale = d3.scale.linear()
    .domain([0, max])
    .range([0, width]);

  color = d3.scale.linear()
    .domain([0, max])
    .range(["#CCFFFF", "#FFCC66"]);

  axis = d3.svg.axis()
    .orient("top")
    .scale(widthScale);

  canvas = d3.select("#global-stats")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g") // groups all rectangles in one group
    .attr("transform", "translate(20, 0)");

  svg = d3.select('svg');

  canvas.selectAll("rect") //returns an empty selection that can be used to bind to our data
    .data(this.current_set) // specify data source
    .enter() // returns placeholders for each data element with no DOM elements, initializes a loop
      .append("rect")
      .attr("width", function (d) { return widthScale(d.total_points); } )
      .attr("height", 50 )
      .attr("fill", function (d) { return color(d.total_points); })
      .attr("y", function (d, i) { return i * 60; });

  svg.selectAll("text")
    .data(this.current_set)
    .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .attr("class", "bar-label")
      .attr("fill", "black")
      .attr("y", function (d, i) { return (i * 60) + 30; })
      .attr("x", 100)
      .text(function (d) { return d.city + ", " + d.state });

  svg.append("text")
      .attr("class", "x-label")
      .attr("text-anchor", "end")
      .attr("x", width - 120)
      .attr("y", height - 30)
      .text("Karma Points Per Location");

  canvas.append("g")
    .attr("transform", "translate(0, 350)")
    .call(axis);
};

KarmaForge.data3.redraw = function (func) {
  var svg = d3.select('svg'),
    max = d3.max(this.current_set, function (d) { return +d.total_points } ),
    width = 400,
    height = 400,
    widthScale,
    color,
    axis;

  widthScale = d3.scale.linear()
    .domain([0, max])
    .range([0, width]);

  color = d3.scale.linear()
    .domain([0, max])
    .range(["#CCFFFF", "#FFCC66"]);

  axis = d3.svg.axis()
    .orient("top")
    .scale(widthScale);

  svg.selectAll("rect")
    .data(this.current_set).sort(func)
    .transition()
      .duration(1000)
      .attr("width", function (d) { return widthScale(d.total_points); } )
      .attr("height", 50 )
      .attr("fill", function (d) { return color(d.total_points); })
      .attr("y", function (d, i) { return i * 60; });

  svg.selectAll(".bar-label")
    .data(this.current_set).sort(func)
    .transition()
      .duration(1000)
      .attr("y", function (d, i) { return (i * 60) + 30; })
      .attr("x", 100)
      .text(function (d) { return d.city + ", " + d.state });

  // Save the sorted data to the object
  this.current_set = this.current_set.sort(func);
};

KarmaForge.data3.sortByName = function () {
  var sort = function (a,b) { return a.city > b.city ? 1 : -1; };
  this.redraw(sort);
};

KarmaForge.data3.sortByPoints = function () {
  var sort = function (a,b) { return a.total_points < b.total_points ? 1 : -1; };
  this.redraw(sort);
};

KarmaForge.data3.init = function () {
  KarmaForge.data3.getLocationData();
  KarmaForge.data3.draw();
};
