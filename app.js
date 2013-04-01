
sensors = [
       {
           "name": "b-temp",
           "title": "Barometer Temperature",
           "unit": "deg C"
       },
       {
           "name": "b-pres",
           "title": "Barometer Pressure",
           "unit": "Pa"
       },
       {
           "name": "b-rala",
           "title": "Barometer Ralated Atmosphere",
           "unit": "atm"
       },
       {
           "name": "b-alti",
           "title": "Barometer Altitude",
           "unit": "m"
       },
       {
           "name": "l-light",
           "title": "Light Sensor",
           "unit": "lux"
       },
       {
           "name": "m-moisture",
           "title": "Moisture Sensor",
           "unit": "lux"
       }
   ];


/**
 * Module dependencies.
 */

db = require('./dataProvider-mongo.js');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var data = require('./routes/data');
var http = require('http');
var path = require('path');
var serial = require("serialport");
url = require('url');



var app = express();


app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  //app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

//// Routes

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/data', data.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


//// Reading JSON from Arduino

var serialPort = new serial.SerialPort("/dev/ttyUSB0", {
    baudrate: 9600,
    parser: serial.parsers.readline("\n")
});
  
serialPort.on("open", function () {
  console.log('Serial Port open');
  serialPort.on('data', function(data) {
    try
    {
        d = JSON.parse(data);
        d.timestamp = new Date();
        db.save(d);
    }
    catch (ex)
    {
        console.warn("Error while parsing sensorData: "+data+" "+ex);
    }
  });  
});
