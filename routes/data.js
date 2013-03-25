/*
 * GET data page.
 */

articleProvider = new ArticleProvider();

exports.list = function(req, res){
  articleProvider.findAll(function(error, docs){
      res.send(docs);
  });
};
