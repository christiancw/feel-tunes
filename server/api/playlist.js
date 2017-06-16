const request = require('request'); // "Request" library
const router = require('express').Router();
module.exports = router;
const clientId = process.env.SPOTIFY_CLIENT_ID; // Your client id
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret
//  requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

//setting artists, tracks, generes as seeds for the recommendation request

const currentMood = 'tired';

const emotionLookup = {
  happy: 1,
  sad: 2,
  energetic: 3,
  tired: 4
};

const genres = [
      'alt_rock',
      'bluegrass',
      'blues',
      'classical',
      'country',
      'dance',
      'electro',
      'hard_rock',
      'heavy_metal',
      'hip_hop',
      'house',
];

const artistSeed = '4NHQUGzhtTLFvgF5SZesLK';
const trackSeed = '0c6xIDDpzE81m2q797ordA';
const genreSeed = genres[emotionLookup[currentMood]];

// url: `https://api.spotify.com/v1/recommendations?seed_artists=${artistSeed}&seed_tracks=${trackSeed}&min_energy=0.4&min_popularity=50&market=US`,


router.get('/', (req, res, next) => {
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      // use the access token to access the Spotify Web API
      const token = body.access_token;
      var options = {
        url: `https://api.spotify.com/v1/recommendations?seed_genres=${genreSeed}&min_energy=0.4&min_popularity=50&market=US`,
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, function(response, body) {
        res.send(body);
      });
    }
  });
})
