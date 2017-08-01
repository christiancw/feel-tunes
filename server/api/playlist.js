const request = require('request');
const router = require('express').Router();
module.exports = router;
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
//  requests authorization
const authOptions = {
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

// const currentMood = 'tired';
const happyGenres = ['chicago-house', 'edm', 'funk', 'latin', 'pop'].join('&');
const sadGenres = ['acoustic', 'folk', 'sad', 'soul', 'grunge'].join('&');
const disgustGenres = ['indie', 'dubstep', 'goth', 'punk', 'opera'].join('&');
const fearGenres = ['alternative', 'deep-house', 'trance', 'jazz', 'classical'].join('&');
const angerGenres = ['blues', 'hip-hop', 'opera', 'alt-rock', 'metal'].join('&');

const emotionLookup = {
  Joy: happyGenres,
  Sadness: sadGenres,
  Disgust: disgustGenres,
  Fear: fearGenres,
  Anger: angerGenres
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

router.get('/', (req, res, next) => {
  const currentMood = req.query.id;
  const genreSeed = emotionLookup[currentMood];
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      // use the access token to access the Spotify Web API
      const token = body.access_token;
      var options = {
        url: `https://api.spotify.com/v1/recommendations?seed_genres=${genreSeed}&market=US`,
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
