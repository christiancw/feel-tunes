const passport = require('passport');
const router = require('express').Router();
const SpotifyStrategy = require('passport-spotify').Strategy;
const User = require('../db/models/user');

const spotifyConfig = {
  clientID: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  callbackURL: 'http://localhost:4000/app'
};

passport.use(new SpotifyStrategy(spotifyConfig,
  function verficationCallback (accessToken, refreshToken, profile, done) {
  console.log('-------------------------------------->>>>>>>HELLO');
  const spotifyId = profile.id;

  console.log('PROFILE', spotifyId)

  User.find({ where: { spotifyId } })
    .then(user => user ?
      done(null, user) :
      User.create({ spotifyId })
        .then(user => done(null, user))
    )
    .catch(done);
}));

// module.exports = router
//   .get('/', passport.authenticate('spotify', { scope: ['user-read-email', 'user-read-private'] }))
//   .get('/callback', passport.authenticate('spotify', { failureRedirect: '/login' }),
//   function (req, res) {
//     console.log('REQ--->', req)
//     res.redirect(`/app/${req.user.id}`);
//   });

router.get('/',
  passport.authenticate('spotify'),
  function(req, res){
    console.log('IS ANYBODY OUT THERE')
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
  });

router.get('/',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('REDIREICTINGI')
    // Successful authentication, redirect home.
    res.redirect('/app');
  });
console.log('GOT HERE')
module.exports = router
