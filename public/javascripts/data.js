//Simple d3.js barchart example to illustrate d3 selections

//other good related tutorials
//http://www.recursion.org/d3-for-mere-mortals/
//http://mbostock.github.com/d3/tutorial/bar-1.html

function bars(data)
{

  data.forEach(function(d) {
    d.timestamp = new Date(d.timestamp);
    d.value = +d.value;
  });
  
  var maxy = d3.max(data, function(d) { return d.value; });
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 600 - margin.left - margin.right,
      height = 150 - margin.top - margin.bottom;

  var x = d3.time.scale()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);
      
  var x = d3.time.scale()
    .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .ticks(5)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .ticks(5)
      .orient("left");
      
      
  var	line = d3.svg.line()
    .interpolate("basis")						
	  .x(function(d) { return x(d.timestamp); })
	  .y(function(d) { return y(d.value); });	

  var svg = d3.select("#"+data.sensor.name+"_chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x.domain(d3.extent(data, function(d) { return d.timestamp; }));
  y.domain([
    0.99*d3.min(data, function(d) { return d.value; }), 
    1.01*d3.max(data, function(d) { return d.value; })
  ]);

  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  //X-Achsen-Beschriftung
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(data.sensor.unit);

}


/*
function redraw(sensorname) {

    d3.json("http://localhost:3000/data?sensorname="+sensorname,function(error, data){
      data.sensorname = sensorname;
      chart.selectAll(data.sensorname+"_chart")
      .data(data)
    .transition()
      .duration(1000)
      .attr("y", function(d) { return h - y(d.value) - .5; })
      .attr("height", function(d) { return y(d.value); });
*/
function openSocketIo(){
    var iosocket = io.connect();
   
    iosocket.on('io-data', function(d) {
      console.info(d);
        $("#"+d.name+"_currentValue").text(d.value +" " + d.unit);
    });
}


function getDate(d) {
  return new Date(d.timestamp);
}

function init(sensorname)
{
    var sensor;
    $.getJSON('http://localhost:3000/sensors',function(sensors){sensor = sensors.data[sensors.index[sensorname]];});
    
    d3.json("http://localhost:3000/data?sensorname="+sensorname,function(error, data){
      data.sensor = sensor;
      bars(data);
    });

}
