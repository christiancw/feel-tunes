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
const disgustGenres = ['black-metal', 'dubstep', 'goth', 'punk', 'opera'].join('&');
const fearGenres = ['alternative', 'deep-house', 'trance', 'jazz', 'classical'].join('&');
const angerGenres = ['grindcore', 'hardcore', 'opera', 'death-metal', 'metal'].join('&');

const emotionLookup = {
  Joy: happyGenres,
  Sadness: sadGenres,
  Disgust: disgustGenres,
  Fear: fearGenres,
  Anger: angerGenres
};



// [ "acoustic", "afrobeat", "alt-rock", "alternative", "ambient", "anime", "black-metal", "bluegrass", "blues", "bossanova", "brazil", "breakbeat", "british", "cantopop", "chicago-house", "children", "chill", "classical", "club", "comedy", "country", "dance", "dancehall", "death-metal", "deep-house", "detroit-techno", "disco", "disney", "drum-and-bass", "dub", "dubstep", "edm", "electro", "electronic", "emo", "folk", "forro", "french", "funk", "garage", "german", "gospel", "goth", "grindcore", "groove", "grunge", "guitar", "happy", "hard-rock", "hardcore", "hardstyle", "heavy-metal", "hip-hop", "holidays", "honky-tonk", "house", "idm", "indian", "indie", "indie-pop", "industrial", "iranian", "j-dance", "j-idol", "j-pop", "j-rock", "jazz", "k-pop", "kids", "latin", "latino", "malay", "mandopop", "metal", "metal-misc", "metalcore", "minimal-techno", "movies", "mpb", "new-age", "new-release", "opera", "pagode", "party", "philippines-opm", "piano", "pop", "pop-film", "post-dubstep", "power-pop", "progressive-house", "psych-rock", "punk", "punk-rock", "r-n-b", "rainy-day", "reggae", "reggaeton", "road-trip", "rock", "rock-n-roll", "rockabilly", "romance", "sad", "salsa", "samba", "sertanejo", "show-tunes", "singer-songwriter", "ska", "sleep", "songwriter", "soul", "soundtracks", "spanish", "study", "summer", "swedish", "synth-pop", "tango", "techno", "trance", "trip-hop", "turkish", "work-out", "world-music" ]
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
// const genreSeed = genres[emotionLookup[currentMood]];

// url: `https://api.spotify.com/v1/recommendations?seed_artists=${artistSeed}&seed_tracks=${trackSeed}&min_energy=0.4&min_popularity=50&market=US`,


router.get('/', (req, res, next) => {
  console.log('REQBODY==>', req.query.id)
  const currentMood = req.query.id;
  const genreSeed = emotionLookup[currentMood];
  console.log('GENRESEED===>', genreSeed)
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
