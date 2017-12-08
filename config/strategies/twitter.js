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
    var firstNameP = profile.name
    var lastNameP = profile.name
    firstNameP = firstNameP.substr(0, firstNameP.indexOf(' '))
    lastNameP = lastNameP.substr(lastNameP.indexOf(' ') + 1)
    var providerUserProfile = {
      firstName: firstNameP,
      lastName: lastNameP,
      email: profile.email,
      username: profile.displayName,
      provider: 'twitter',
      providerId: profile.id,
      providerData: providerData
    }
    user.saveOAuthUserProfile(req, providerUserProfile, done);
  }));
}
