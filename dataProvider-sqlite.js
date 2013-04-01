var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('plant.db');

db.run("DROP TABLE sensordata");
db.run("DROP TABLE sensors");
db.run("CREATE TABLE sensors (sensor_id INTEGER PRIMARY KEY, name TEXT, unit TEXT)");
db.run("CREATE TABLE sensordata (INTEGER timestamp, FOREIGN KEY(sensor_fk) REFERENCES sensors(sensor_id), value REAL)");

db.run("INSERT INTO sensors (sensor_id,name,unit) VALUES (?,?,?)", ['1','b-temp','deg C']);
db.run("INSERT INTO sensors (sensor_id,name,unit) VALUES (?,?,?)", ['2','b-pres','Pa']);
db.run("INSERT INTO sensors (sensor_id,name,unit) VALUES (?,?,?)", ['3','b-rala','atm']);
db.run("INSERT INTO sensors (sensor_id,name,unit) VALUES (?,?,?)", ['4','b-alti','m']);


db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
      console.log(row.id + ": " + row.info);
  });