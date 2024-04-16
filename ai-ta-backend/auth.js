import passport from 'passport';
const OAuth2Strategy = require('passport-oauth2').Strategy;

passport.use(new OAuth2Strategy({
    authorizationURL: 'https://<your-canvas-domain>/login/oauth2/auth',
    tokenURL: 'https://<your-canvas-domain>/login/oauth2/token',
    clientID: process.env.CANVAS_CLIENT_ID,
    clientSecret: process.env.CANVAS_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/canvas/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // Here you can use the accessToken to fetch user profile from Canvas and save it if needed
    return cb(null, profile);
  }
));

// Serialize and deserialize user instances to and from the session.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
