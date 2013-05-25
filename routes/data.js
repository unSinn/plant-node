/*
 * GET data page.
 */

exports.byname = function(req, res){
  //get parameter: http://localhost:3000/data?sensorname=b-rala
  var sensorname = url.parse(req.url ,true).query.sensorname;
  db.findByName(sensorname, function(data){
    res.send(data);
  });    

};


exports.array = function(req, res){
  db.sensorArray(function(data){
    res.send(data);
  });
}    
