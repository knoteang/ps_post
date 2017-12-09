import passport from 'passport';
var InstagramStrategy = require('passport-instagram').Strategy;
import config from '../config.js';
import user from '../../app/controllers/user.controller';

module.exports = () => {
  passport.use(new InstagramStrategy({
    clientID: config.instagram.clientID,
    clientSecret: config.instagram.clientSecret,
    callbackURL: config.instagram.callbackURL,
    passReqToCallback: true
  }, function (req, accessToken, refreshToken, profile, done) {
    var providerData = profile._json;
    providerData.accessToken = accessToken;
    providerData.refreshToken = refreshToken;
    var providerUserProfile = {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails,
      username: providerData.username,
      provider: 'instagram',
      providerId: profile.id,
      providerData: providerData
    }
    user.saveOAuthUserProfile(req, providerUserProfile, done);
  }));
}
