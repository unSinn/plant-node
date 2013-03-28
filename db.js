var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function callback () {
  console.log("DB Connection open");
});

var sensorDataSchema = mongoose.Schema({
    name: String,
    value: Number,
    unit: String,
    timestamp: Date
})

var SensorDataModel = mongoose.model('SensorData', sensorDataSchema);

exports.findAll = function(onFound) {
      SensorDataModel.find(function (err, d) {
          if (err) {
              console.warn(err);
              onFound(err,d);
          }
      console.log(d);
      onFound(null,d);
      });
};

exports.save = function(data) {
  var s = new SensorDataModel({
      timestamp: data.timestamp,
      name: data.name,
      value: data.value,
      unit: data.unit
  });
  s.save();
};