const request = require('request');
const router = require('express').Router();
module.exports = router;
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const models = require('../db');
const db = models.db;
const Playlist = models.Playlist;
const User = models.User;
// const User = require('../db/models/user');
// const Playlist = require('../db/models/playlist');
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

router.get('/spotify', (req, res, next) => {
  console.log('RECEVIED GENRES--> ', req.query.genres)
  const currentMood = req.query.id;
  const genreSeed = emotionLookup[currentMood];
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      // use the access token to access the Spotify Web API
      const recommendationsToken = body.access_token;
      let options = {
        url: `https://api.spotify.com/v1/recommendations?seed_genres=${genreSeed}&market=US`,
        headers: {
          'Authorization': 'Bearer ' + recommendationsToken
        },
        json: true
      };
      request.get(options, function(response, body) {
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


//this worked:
// curl -X POST "https://api.spotify.com/v1/users/cw3n71n9/playlists" -H "Authorization: Bearer BQC4qDBNaszW9oZPwTybwij2f5kj7dzXTQ6bqtONQnI62iTscaIxcCp6AfEBRU2gP5Z2v0CDsGAu7Bm1Q6xb-cTYUC7DIAYJVEAOgQuIMFzKo4PK0RL_ukFwqxiztWB8TkftmbWfw0ajIhWmsPiBllJJpHB4BLT9t2XwOpzfxSYuCgB7wkA7jE7OkeqcJq5JI5G1AP1JSryY" -H "Content-Type: application/json" --data "{\"name\":\"A New Playlist\", \"public\":false}"


// curl -X POST "https://accounts.spotify.com/api/token" -H "Authorization: Basic NmQ2OThmMDRkNTcxNDk3MGI2NmMyZGYyYTNmZTJmM2Q6MmE1NjhmZGE4YWYyNDNhNDlmNTJmZDZkZWVjMjE4ZDM=" -d grant_type=refresh_token -d refresh_token=AQBvDi7KU6MOTegTnGshastsOAnQKyc2ZzmUt-wygib8zh-4b22tHd_nJZZE2hvB4BG9KcOJsMKhHg8j_82qq7Yx_54QJ3lTTag5VCEmu1U6eJrKkNV_TeYPrrLZKIWBfSw
