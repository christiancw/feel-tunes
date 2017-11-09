import { combineReducers } from 'redux';
import user from './user';
import music from './music';
import playlist from './savedplaylists';
import genre from './genre';
import authForm from './authForm';

export default combineReducers({ user, music, playlist, genre, authForm });
