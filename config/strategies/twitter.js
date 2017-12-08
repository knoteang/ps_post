import passport from 'passport';
var TwitterStrategy = require('passport-twitter-oauth').OAuth2Strategy;
import config from '../config.js';
import user from '../../app/controllers/user.controller';

module.exports = () => {
  passport.use(new TwitterStrategy({
    clientID: config.twitter.clientID,
    clientSecret: config.twitter.clientSecret,
    callbackURL: config.twitter.callbackURL,
    passReqToCallback: true
  }, function (req, accessToken, refreshToken, profile, done) {
    var providerData = profile._json;
    providerData.accessToken = accessToken;
    providerData.refreshToken = refreshToken;
    var providerUserProfile = {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value,
      username: profile.displayName,
      provider: 'twitter',
      providerId: profile.id,
      providerData: providerData
    }
    user.saveOAuthUserProfile(req, providerUserProfile, done);
  }));
}
