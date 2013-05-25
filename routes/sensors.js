sensors =
{
  "index": {
        "b-temp": 0, "b-pres": 1, "b-rala": 2, "b-alti": 3,"l-light": 4, "m-moisture": 5
    },
  "data": [
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
             "unit": "%"
         }
     ]
}
/*
 * GET sensors
 */

exports.list = function(req, res){
  res.send(sensors);
};
