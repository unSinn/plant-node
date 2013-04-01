var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/plant');

var sensorSchema = mongoose.Schema({
    timestamp: Date,
    name: String,
    value: Number,
    unit: String
});

SensorData = mongoose.model('SensorData', sensorSchema);


exports.findByName = function(aName, onFound){
    console.warn(aName);
    SensorData.where('name', aName).skip(10).limit(300).sort("-timestamp").exec(function(err, data){
    if(err){
    console.warn(err);
    }
    onFound(data);
   });
}




exports.save = function(jsondata) {
  var sensorData = new SensorData(jsondata);
  sensorData.save(function (err, res) {
      //console.info("wrote "+ res);
      if (err) {
              console.warn("Error while saving Sensor data:" + err);
          }
      })
};
