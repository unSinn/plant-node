/*
 * GET data page.
 */

exports.list = function(req, res){
      SensorData.find({name: /^b-temp/ }, {}, {limit: 5 }, function(err, sensordata){
          res.send(sensordata);
      }).limit(10);
 };
