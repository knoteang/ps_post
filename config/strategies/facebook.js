import passport from 'passport';
var FacebookStrategy = require('passport-facebook').Strategy;
import config from '../config.js';
import user from '../../app/controllers/user.controller';

module.exports = () => {
  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: ['emails', 'name', 'displayName'],
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
      provider: 'facebook',
      providerId: profile.id,
      providerData: providerData
    }
    user.saveOAuthUserProfile(req, providerUserProfile, done);
  }));
}
