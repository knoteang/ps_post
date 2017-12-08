import passport from 'passport';
var TwitterStrategy = require('passport-twitter').Strategy;
import config from '../config.js';
import user from '../../app/controllers/user.controller';

module.exports = () => {
  passport.use(new TwitterStrategy({
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callbackURL: config.twitter.callbackURL,
    passReqToCallback: true
  }, function (req, accessToken, refreshToken, profile, done) {
    var providerData = profile._json;
    providerData.accessToken = accessToken;
    providerData.refreshToken = refreshToken;
    var providerUserProfile = {
      firstName: profile.name.substr(0, profile.name.indexOf(' ')),
      lastName: profile.name.substr(profile.name.indexOf(' ') + 1),
      email: profile.emails,
      username: profile.displayName,
      provider: 'twitter',
      providerId: profile.id,
      providerData: providerData
    }
    user.saveOAuthUserProfile(req, providerUserProfile, done);
  }));
}
