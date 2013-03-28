
/*
 * GET home page.
 */

exports.index = function(req, res){
    db.findAll( function(error,data){
        res.render('index.jade',  {
            title: 'Messdaten',
            data: data
            }
        );
    });
};

