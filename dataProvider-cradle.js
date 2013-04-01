var cradle = require('cradle');
var db = new(cradle.Connection)().database('plant');

var designs = [
    {
      '_id': '_design/sensordata',
      views: {
        all: {
          map: function(doc) {
                  emit(doc._id, doc);
            }
        },
        timestamped: {
          map: function (doc) {emit(doc.timestamp, 1);}
        },
        
        byName: {
          map: function (doc) {emit(doc.name, 1);}
        },
      }
    }
];
db.save(designs, function (err) {
    if (err) {
              console.warn("Error while saving Sensor data:" + err);
  }
});

exports.findOne = function(onFound) {
     db.view('sensordata/all', { descending: true, limit: 1}, function (err, doc) {
          onFound(null,doc);
      });
 
};

exports.find10ByName = function(name, onFound) {
     db.view('sensordata/byName', {limit: 10}, function (err, doc) {
          onFound(null,doc);
      });
 
};
  
exports.findLast10 = function(onFound) {
     db.view('sensordata/all', { descending: true, limit: 10}, function (err, doc) {
          onFound(null,doc);
      });
 
};

exports.findAll = function(onFound) {
     db.view('sensordata/all', {  }, function (err, doc) {
      onFound(null,doc);
      });
 
};

exports.save = function(data) {
  db.save(data, function (err, res) {
      console.info("wrote "+ res);
      if (err) {
              console.warn("Error while saving Sensor data:" + err);
          }
      })
  };