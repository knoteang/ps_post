module.exports = {
  //mongoUri: 'mongodb://localhost/myFirstNode',
  // or use 
  mongoUri: 'mongodb://admin:admin@ds133876.mlab.com:33876/ps_post',
  debug: true,
  sessionSecret: 'dev_secret_key',
  google: {
    clientID: '498077320069-dkhdsb23vhmfq1edunbdf2vjc5gt79ks.apps.googleusercontent.com',
    clientSecret: 'f6V9wdARvM-GdX6FNzRLhMpG',
    callbackURL: 'https://pspost.herokuapp.com/oauth/google/callback'
  },
  facebook: {
    clientID: '1740364465996430',
    clientSecret: 'f72838ff6b2abd2368b1293331f0c002',
    callbackURL: 'https://pspost.herokuapp.com/oauth/facebook/callback'
  },
  instagram: {
    clientID: '7a7b866454cd4bc08972a2f66358452a',
    clientSecret: '1df597291b11468cb6133db7152a29f1',
    callbackURL: 'https://pspost.herokuapp.com/oauth/instagram/callback'
  }
}
