import axios from 'axios';

const initialMusic = {
  tracks: [],
  isFetchingMusic: false,
  tracksAreSaved: false
};

const GET_MUSIC = 'GET_MUSIC';

const getMusic = music => ({ type: GET_MUSIC, music});

export const REQUEST_MUSIC = 'REQUEST_MUSIC';

const requestMusic = (mood) => ({type: REQUEST_MUSIC, mood});

const SAVE_MUSIC = 'SAVE_MUSIC';

const saveMusic = () => ({type: SAVE_MUSIC});

const CLEAR_TRACKS = 'CLEAR_TRACKS';

export const clearTracks = () => ({type: CLEAR_TRACKS});

export const loadMusic = function(mood, genres){
    return dispatch => {
     dispatch(requestMusic(mood))
       return axios.get('/api/tones', {
         params: {
           text: mood
         }
       })
    .then(res => res.data)
    .then(data => {
      console.log('DATAAAAA--->', data)
      return axios.get('/api/playlist/spotify', {
        params: {
          id: data.topFeeling,
          feelingArr: data.feelingArr,
          genres
        }
      })
    })
    .then(playlist => {
      dispatch(getMusic(playlist.data.body.tracks));
    })
    .catch(error =>
    dispatch(getMusic( {error})));
    }
  };

const extractTracks = trackObjectsArray => {
  return trackObjectsArray.map(track => {
    return track.uri;
  });
};

export const sendTracks = function(trackList, userId, name){
  console.log('sending...', trackList, userId)
  return dispatch => {
    return axios.post('/api/playlist', {
      params: {
        tracks: extractTracks(trackList),
        playlistName: name,
        userId: userId.spotifyId,
        email: userId.email,
        accessToken: userId.accessToken,
        refreshToken: userId.refreshToken,
        idNumber: userId.id
      }
    })
    .then(dispatch(saveMusic()));
  };
};

export default function (state = initialMusic, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {

    case REQUEST_MUSIC:
        newState.isFetchingMusic = true;
        newState.tracksAreSaved = false;
      break;

    case GET_MUSIC:
      newState.tracks = action.music;
      newState.isFetchingMusic = false;
      break;

    case SAVE_MUSIC:
      newState.tracksAreSaved = true;
      break;

    case CLEAR_TRACKS:
      newState.tracks = [];
    break;

    default:
    return state;
  }
  return newState;
}
