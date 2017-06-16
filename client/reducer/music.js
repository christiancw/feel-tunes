import axios from 'axios';

const initialMusic = {};

const GET_MUSIC = 'GET_MUSIC';

const getMusic = music => ({ type: GET_MUSIC, music});

export const selectMood = (mood) =>
  dispatch =>
    axios.post('/playlist', {mood})
    .then(res => {
      dispatch(getMusic(res.data));
    })
    .catch(error =>
    dispatch(getMusic( {error})));

export default function (state = initialMusic, action) {
  switch (action.type) {
    case GET_MUSIC:
      return action.music;
    default:
    return state;
  }
}
