import axios from 'axios';

const initialMusic = {
  tracks: []
};

const GET_MUSIC = 'GET_MUSIC';

const getMusic = music => ({ type: GET_MUSIC, music});

// export const loadMusic = (mood) =>
//   dispatch =>
//     axios.get('/api/playlist', {
//     params: {
//       id: mood
//     }})
//     .then(res => {
//       console.log('trying to get music', res.data)
//       dispatch(getMusic(res.data.body.tracks));
//     })
//     .catch(error =>
//     dispatch(getMusic( {error})));

export const loadMusic = (mood) =>
  dispatch =>
    axios.get('/api/tones', {
      params: {
        text: mood
      }
    })
    .then(res => {
      console.log('trying to get feelings', res.data)
      return axios.get('/api/playlist', {
        params: {
          id: res.data
        }})
    })
    .then(playlist => {
      console.log('trying to get music', playlist)
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
