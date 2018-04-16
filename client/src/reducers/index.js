import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { AlbumReducer } from './AlbumReducer';

const rootReducer = combineReducers({
  user: userReducer,
  album: AlbumReducer
});

export default rootReducer;
