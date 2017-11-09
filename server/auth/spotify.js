const passport = require('passport');
const router = require('express').Router();
const SpotifyStrategy = require('passport-spotify').Strategy;
const User = require('../db/models/user');

const spotifyConfig = {
  clientID: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  callbackURL: 'http://localhost:4000/auth/spotify/callback'
};

passport.use(new SpotifyStrategy(spotifyConfig,
  function verficationCallback (accessToken, refreshToken, profile, done) {
    User.findOrCreate({
      where: {
        spotifyId: profile.id,
        accessToken: accessToken,
        refreshToken: refreshToken
      }
    })

    .spread(function (user) {
      // done(error, success)
      done(null, user); // what do I call? -- serializeUser
    })
  }));

router.get('/',
  passport.authenticate('spotify', {
    scopes: [
      'playlist-modify-private',
      'playlist-modify-public',
      'playlist-modify',
      'user-read-private',
      'playlist-read-collaborative'
   ],
     showDialog: true}),
  function(req, res){
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
  });

router.get('/callback',
  passport.authenticate('spotify', { failureRedirect: '/app' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/app');
  });


module.exports = router
