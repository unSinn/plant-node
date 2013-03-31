
/*
 * GET home page.
 */
 
sensors = [
       {
           "name": "b-temp",
           "unit": "deg C"
       },
       {
           "name": "b-pres",
           "unit": "Pa"
       },
       {
           "name": "b-rala",
           "unit": "atm"
       },
       {
           "name": "b-alti",
           "unit": "m"
       }
   ];
var sensorCount = 4;

exports.index = function(req, res){
    res.render('index.jade',  {
        title: 'Messdaten',
        sensors: sensors
    });
};

