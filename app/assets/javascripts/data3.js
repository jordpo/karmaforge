var KarmaForge = KarmaForge || {};

KarmaForge.data3 = {};

KarmaForge.data3.getLocationData = function () {
  var data = $('#global-stats').attr('data');
  this.current_set = JSON.parse(data).locations;
  return true;
};

// appends canvas on DOM
KarmaForge.data3.draw = function () {
  var max = d3.max(this.current_set, function (d) { return +d.points } ),
    width = 400,
    height = 400,
    widthScale,
    color,
    axis,
    canvas;

  widthScale = d3.scale.linear()
    .domain([0, max])
    .range([0, width]);

  color = d3.scale.linear()
    .domain([0, max])
    .range(["red", "blue"]);

  axis = d3.svg.axis()
    .orient("top")
    .scale(widthScale);

  canvas = d3.select("#global-stats")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g") // groups all rectangles in one group
    .attr("transform", "translate(20, 0)");

  canvas.selectAll("rect") //returns an empty selection that can be used to bind to our data
    .data(this.current_set) // specify data source
    .enter() // returns placeholders for each data element with no DOM elements, initializes a loop
      .append("rect")
      .attr("width", function (d) { return widthScale(d.points); } )
      .attr("height", 50 )
      .attr("fill", function (d) { return color(d.points); })
      .attr("y", function (d, i) { return i * 60; });

  d3.select('svg').selectAll("text")
    .data(this.current_set)
    .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("y", function (d, i) { return (i * 60) + 30; })
      .attr("x", 100)
      .text(function (d) { return d.city + ", " + d.state });

  canvas.append("g")
    .attr("transform", "translate(0, 350)")
    .call(axis);
};

KarmaForge.data3.redraw = function () {
  $('#global-stats svg').remove();

  this.draw();
};

KarmaForge.data3.init = function () {
  KarmaForge.data3.getLocationData();
  KarmaForge.data3.draw();
};
