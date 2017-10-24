import { combineReducers } from 'redux';
import user from './user';
import music from './music';
import playlist from './savedplaylists';

export default combineReducers({ user, music, playlist });
