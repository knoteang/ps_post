import passport from 'passport';
import localStratege from 'passport-local';
var LocalStratege = localStratege.Strategy;
var User = require('mongoose').model('User');

module.exports = () => {
  passport.use(req, res, new LocalStratege((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { return done(err); }
      if (!user || user.provider != 'local' || !user.authenticate(password)) {
        return done('Invalid username or password');
      }
      res.json(user)
      return done(null, user);
    });
  }));
}