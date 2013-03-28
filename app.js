
/**
 * Module dependencies.
 */

db = require('./db.js');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var data = require('./routes/data');
var http = require('http');
var path = require('path');
var serial = require("serialport");

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
  app.use(require('stylus').middleware(__dirname + '/public'));
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
  console.log('open');
  serialPort.on('data', function(data) {
    try
    {
        var j = JSON.parse(data);
        var d = new Date();
        j.timestamp = d;
        console.log(d + j + data);
        db.save(j);
    }
    catch (ex)
    {
        console.warn(ex);
    }
  });  
});