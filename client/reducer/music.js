import axios from 'axios';

const initialMusic = {
  tracks: []
};

const GET_MUSIC = 'GET_MUSIC';

const getMusic = music => ({ type: GET_MUSIC, music});

export const loadMusic = (mood) =>
  dispatch =>
    axios.get('/api/tones', {
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

export default function (state = initialMusic, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {

    case GET_MUSIC:
      newState.tracks = action.music;
      break;

    default:
    return state;
  }
  return newState;
}
