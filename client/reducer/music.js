import axios from 'axios';

const initialMusic = {
  tracks: [],
  isFetchingMusic: false
};

const GET_MUSIC = 'GET_MUSIC';

const getMusic = music => ({ type: GET_MUSIC, music});

//trying to implement loader

export const REQUEST_MUSIC = 'REQUEST_MUSIC';
// export const RECEIVE_MUSIC = 'RECEIVE_MUSIC';

const requestMusic = (mood) => ({type: REQUEST_MUSIC, mood});

// function receiveMusic(music) {
//   return {
//     type: RECEIVE_MUSIC,
//     music: music,
//     posts: json.data.children.map(child => child.data),
//     receivedAt: Date.now()
//   }
// }
//

export const loadMusic = function(mood){
    return dispatch => {
     dispatch(requestMusic(mood))
       return axios.get('/api/tones', {
         params: {
           text: mood
         }
       })
    .then(res => {
      return axios.get('/api/playlist', {
        params: {
          id: res.data
        }})
    })
    .then(playlist => {
      dispatch(getMusic(playlist.data.body.tracks));
    })
    .catch(error =>
    dispatch(getMusic( {error})));
    }
  };

export default function (state = initialMusic, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {

    case REQUEST_MUSIC:
        newState.isFetchingMusic = true;
      break;

    case GET_MUSIC:
      newState.tracks = action.music;
      newState.isFetchingMusic = false;
      break;

    default:
    return state;
  }
  return newState;
}
