// const passport = require('passport');
// const router = require('express').Router();
// const SpotifyStrategy = require('passport-spotify-oauth').OAuth2Strategy;
// const User = require('../db/models/user');
//
// const spotifyConfig = {
//   clientID: process.env.SPOTIFY_CLIENT_ID,
//   clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
//   callbackURL: process.env.SPOTIFY_CALLBACK
// };
//
// const strategy = new SpotifyStrategy(spotifyConfig, (token, refreshToken, profile, done) => {
//   const spotifyId = profile.id;
//   const name = profile.displayName;
//   const email = profile.emails[0].value;
//
//   User.find({ where: { spotifyId } })
//     .then(user => user ?
//       done(null, user) :
//       User.create({ name, email, spotifyId })
//         .then(user => done(null, user))
//     )
//     .catch(done);
// });
//
// passport.use(strategy);
//
// module.exports = router
//   .get('/', passport.authenticate('spotify', { scope: 'email' }))
//   .get('/callback', passport.authenticate('spotify', {
//     successRedirect: '/home',
//     failureRedirect: '/login'
//   }));
