/*
 * GET data page.
 */

exports.list = function(req, res){
  db.findAll(function(error, data){
      res.send(data);
  });
};
