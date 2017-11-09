const request = require('request');
const router = require('express').Router();
module.exports = router;
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const models = require('../db');
const db = models.db;
const Playlist = models.Playlist;
const User = models.User;
const utils = require('../utils');
const genreParser = utils.genreParser;
const genreSubstitute = utils.genreSubstitute;
const moodMapper = utils.moodMapper;
const deString = utils.deString;

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

//setting artists, tracks, genres as seeds for the recommendation request

// const currentMood = 'tired';
const happyGenres = ['chicago-house', 'edm', 'funk', 'latin', 'pop'];
const sadGenres = ['acoustic', 'folk', 'sad', 'soul', 'grunge'];
const disgustGenres = ['indie', 'dubstep', 'goth', 'punk', 'opera'];
const fearGenres = ['alternative', 'deep-house', 'trance', 'jazz', 'classical'];
const angerGenres = ['blues', 'hip-hop', 'opera', 'alt-rock', 'metal'];

const emotionLookup = {
  Joy: happyGenres,
  Sadness: sadGenres,
  Disgust: disgustGenres,
  Fear: fearGenres,
  Anger: angerGenres
};

const attributes = ['energyLevel', 'danceability', 'loudness', 'mode', 'valence'];

router.get('/spotify', (req, res, next) => {
  const feelingArr = deString(req.query.feelingArr);
  const moodMap = moodMapper(feelingArr, attributes);

  const energyLevel = String(moodMap.energyLevel);
  const danceability = String(moodMap.danceability);
  const loudness = String(moodMap.loudness);
  const mode = String(Math.floor(moodMap.mode));
  const valence = String(moodMap.valence);
  // console.log('RECEVIED GENRES--> ', req.query.genres)
  const genreObject = JSON.parse(req.query.genres);
  // console.log(typeof req.query.genres)
  // console.log('genreobject-->', JSON.parse(genreObject));
  const parsedGenres = genreParser(genreObject);
  const currentMood = req.query.id;
  const genreLookedup = emotionLookup[currentMood];
  const genreSeed = genreSubstitute(genreLookedup, parsedGenres);
  const baseURL = 'https://api.spotify.com/v1/recommendations?seed_genres=';
  const minEnergy = 'min_energy=' + energyLevel;
  const minDanceability = 'min_danceability=' + danceability;
  const minLoudness = 'min_loudness=' + loudness;
  const setValence = 'min_valence=' + valence;
  const minMode = 'min_mode=' + mode;
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {      // use the access token to access the Spotify Web API
      const recommendationsToken = body.access_token;
      let options = {
        url: baseURL + genreSeed + '&' + minEnergy + '&' + minDanceability + '&' + minLoudness + '&' + minMode + '&' + setValence + '&market=US',
        headers: {
          'Authorization': 'Bearer ' + recommendationsToken
        },
        json: true
      };
      request.get(options, function(response, body) {
        // console.log('responsebody ---> ', body);
        res.send(body);
      });
    }
  });
})

router.post('/', (req, res, next) => {
  // console.log('REQUEST FOR SAVE', req.body.params)
  const tracksList = req.body.params.tracks;
  const idNumber = req.body.params.idNumber;
  const userId = req.body.params.userId || req.body.params.email;
  const refreshToken = req.body.params.refreshToken;
  // const createPlaylistURI = `https://api.spotify.com/v1/users/${userId}/playlists`;
  const stringDate = String(Date.now()).slice(9, 12);
  const defaultName = userId + stringDate;
  const playlistNameGiven = req.body.params.playlistName + stringDate || defaultName;

  const playlistAuthOptions = {
    url: authOptions.url,
    headers: {
      'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
    },
    json: true,
    form: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }
  }

  // console.log('authoptions--->', playlistAuthOptions)

  if (req.body.params.userId){
        request.post(playlistAuthOptions, function(error, response, body) {
          // console.log('will try the request', response.body)
          if (!error && response.statusCode === 200) {
            const createPlaylistURI = `https://api.spotify.com/v1/users/${userId}/playlists`;
            const playlistsToken = body.access_token;
            let options = {
              url: createPlaylistURI,
              headers: {
                'Authorization': 'Bearer ' + playlistsToken,
                'Content-Type': 'application/json'
              },
              json: true,
              body: {
                name: playlistNameGiven,
                public: false
              }
            };
            request.post(options, function(createResponse, createBody) {
              console.log('body--', createBody)
              console.log('response--', createResponse)
              if (!error){
                const playListId = createBody.body.id;
                const addTracksURI = `https://api.spotify.com/v1/users/${userId}/playlists/${playListId}/tracks`
                options.url = addTracksURI;
                options.body = {'uris': tracksList};
                console.log('postTracksOptions', options)
                request.post(options, function(addResponse, addBody) {
                  res.send(addBody);
                })
              }
              else {
                res.status(500).send({error: 'playlist was created but failed to add tracks'})
              }
            })
          }
          else {
            res.status(500).send({error: 'playlist could not be created'})
          }
        })
      }

  else {
    console.log('REQ BODY', req.body)
    return Playlist.create({
        name: playlistNameGiven,
        dateCreated: Date.now(),
        tracks: tracksList,
        userId: idNumber
    })
    .then(createdPlaylist => {
      res.status(201).json(createdPlaylist)
    })
  }

  })

router.get('/userplaylist', (req, res, next) => {
  console.log('reqparams', req.query.id)
  Playlist.findAll({
    where: {
      userId: req.query.id
    }
  })
  .then(playlists => res.json({playlists}))
})
