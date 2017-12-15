import passport from 'passport';
var user = require('../controllers/user.controller');

module.exports = (app) => {
      var path = '/api/user';

      app.get(path + '/getuser', user.getUsers);
      app.post(path + '/signup', user.create); //match กับ requestที่เข้ามา
      app.post(path + '/edit', user.edit);
      app.post(path + '/delete/:id', user.deleteUser);
      app.post(path + '/getUserOne', user.getUserOne)

      app.route('/login')
            .get(user.login)
            .post(passport.authenticate('local', {
                  successRedirect: '/',
                  failureRedirect: '/login',
                  failureFlash: true
            }));

      app.post('/logout', user.logout);

      app.get('/oauth/google', passport.authenticate('google', {
            scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
            failureRedirect: '/login'
      }));

      app.get('/oauth/google/callback', passport.authenticate('google', {
            failureRedirect: '/login',
            successRedirect: '/'
      }));

      app.get('/oauth/facebook', passport.authenticate('facebook', {
            scope: ['public_profile', 'email'],
            failureRedirect: '/login'
      }));

      app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
            failureRedirect: '/login',
            successRedirect: '/'
      }));

      app.get('/oauth/instagram', passport.authenticate('instagram', {
            scope: ['public_content', 'basic'],
            failureRedirect: '/login'
      }));

      app.get('/oauth/instagram/callback', passport.authenticate('instagram', {
            failureRedirect: '/login',
            successRedirect: '/'
      }));

      app.get('/oauth/twitter', passport.authenticate('twitter', {
            scope: ['https://api.twitter.com/1.1/account/verify_credentials.json'],
            failureRedirect: '/login'
      }));

      app.get('/oauth/twitter/callback', passport.authenticate('twitter', {
            failureRedirect: '/login',
            successRedirect: '/'
      }));

}