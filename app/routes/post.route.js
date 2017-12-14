var post = require('../controllers/post.controller');

module.exports = (app) => {
  var path = '/api/post';

  app.get(path + '/all', post.getpost);
  app.get(path + '/id/:id', post.getOne);
  app.get(path + '/mypost', post.getMyPost);
  app.post(path + '/getcomment', post.getcomment);
  app.post(path + '/create', post.create);
  app.post(path + '/delete', post.delete);

}