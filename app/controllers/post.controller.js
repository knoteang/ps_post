var Post = require('mongoose').model('Post');
var path = require("path");

exports.getpost = (req, res, next) => {
      Post.find({ type: "topic" }, (err, data) => {
            if (err) {
                  console.log('Failure: ' + err);
                  return next(err);
            }
            else {
                  console.log(data);
                  res.json(data);
            }
      }).sort({ time: 'desc' });
}
exports.getOne = (req, res, next) => {
      Post.findOne({ _id: req.params.id }, (err, data) => {
            if (err) {
                  console.log('Failure: ' + err);
                  return next(err);
            }
            else {
                  console.log(data);
                  res.json(data);
            }
      });
}
exports.getMyPost = (req, res, next) => {
      Post.find({ author: req.params.username, type: "topic" }, (err, data) => {
            if (err) {
                  console.log('Failure: ' + err);
                  return next(err);
            }
            else {
                  console.log(data);
                  res.json(data);
            }
      }).sort({ time: 'desc' });

}
exports.create = (req, res, next) => {
      var post = new Post(req.body);
      post.save(function (err) {
            if (err) {
                  res.status(400).send({
                        message: err
                  });
            }
            else {
                  res.json(post);
            }
      });
}
exports.delete = (req, res, next) => {
      findOneAndRemove({
            _id: req.params.id
      }, req.body, function (err, user) {
            if (err) {
                  console.log('Failure: ' + err);
                  return next(err);
            }
            else {
                  console.log(seccess);
            }
      });
}

exports.getcomment = (req, res, next) => {
      Post.find({ type: "comment", reference: req.params.ref }, (err, data) => {
            if (err) {
                  console.log('Failure: ' + err);
                  return next(err);
            }
            else {
                  console.log(data);
                  res.json(data);
            }
      });


}

exports.search = (req, res, next) => {
      Post.find({ author: { $regex: req.params.search } }, (err, data) => {
            if (err) {
                  console.log('Failure: ' + err);
                  return next(err);
            }
            else {
                  console.log(data);
                  res.json(data);
            }
      }).sort({ time: 'desc' });
}