var KarmaForge = KarmaForge || {};

KarmaForge.data3 = {};

KarmaForge.data3.getData = function () {
  var data = $('#global-stats').attr('data');
  return JSON.parse(data);
};

// // array methods
// d3.min(data);
// d3.max(data);
// d3.extent(data); // returns array of min max
// d3.sum(data); // sums array
// d3.mean(data);
// d3.median(data);
// d3.shuffle(data); // shuffles around the values
// data.sort(d3.descending); // sorts in descending order

// //  using scales to make sure everything fits in the container
// // largest value to have the maximum width
// var width = 500;
// var height = 500;

// var widthScale = d3.scale.linear() // most common scale
//   .domain([0, 60]) // min and max data values
//   .range([0, width]); // can't be large than width
// // values of the range is a result of a linear function
// // original data set is called the 'domain'

// var color = d3.scale.linear()
//   .domain([0, 60])
//   .range(["red", "blue"]);

// var axis = d3.svg.axis()
//   .ticks(5) // specify the number of ticks on the axis
//   .scale(widthScale); // then need to call it on the canvas

// var canvas = d3.select("body")
//   .append("svg")
//   .attr("width", width)
//   .attr("height", height)
//   .append("g") // groups all rectangles in one group
//   .attr("transform", "translate(20, 0)");

// var bars = canvas.selectAll("rect") //returns an empty selection that can be used to bind to our data
//   .data(data) // specify data source
//   .enter() // returns placeholders for each data element with no DOM elements, initializes a loop
//     .append("rect")
//     .attr("width", function (d) { return widthScale(d); }) // for each data el return the data value
//     .attr("height", 50)
//     .attr("fill", function (d) { return color(d); })
//     .attr("y", function (d, i) { return i * 100; }); // i is index

// canvas.append("g")
//   .attr("transform", "translate(0, 400)")
//   .call(axis);
