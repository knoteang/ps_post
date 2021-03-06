var post = require('../controllers/post.controller');

module.exports = (app) => {
  var path = '/api/post';

  app.get(path + '/all', post.getpost);
  app.get(path + '/id/:id', post.getOne);
  app.get(path + '/mypost/:username', post.getMyPost);
  app.get(path + '/getcomment/:ref', post.getcomment);
  app.get(path + '/search/:search', post.search);
  app.post(path + '/create', post.create);
  app.get(path + '/delete/:id', post.delete);
}