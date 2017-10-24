import axios from 'axios';

const RETRIEVE_USER_PLAYLISTS = 'RETRIEVE_USER_PLAYLISTS';
const DELETE_PLAYLISTS = 'DELETE_PLAYLISTS';

const retrievePlaylists = playlists => ({ type: RETRIEVE_USER_PLAYLISTS, playlists});

const deletePlaylists = playlists => ({ type: DELETE_PLAYLISTS, playlists});

const initialPlaylistState = {
  userLists: []
};

export const getPlaylists = id => {
  return dispatch => {
    axios.get('/userplaylist', {
      params: {
        id
      }
    })
    .then(res => res.data)
    .then(playlists => dispatch(retrievePlaylists(playlists)));
  };
};

export default function (state = initialPlaylistState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {

    case RETRIEVE_USER_PLAYLISTS:
      newState.userLists = action.playlists;
      break;

    case DELETE_PLAYLISTS:
      newState.userLists = action.playlists;
      break;

    default:
      return state;
  }
  return newState;
}
