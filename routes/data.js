/*
 * GET data page.
 */

exports.list = function(req, res){
  //get parameter
  var sensorname = url.parse(req.url ,true).query.sensorname;
  db.findByName(sensorname, function(data){
    res.send(data);
  });    

};
