import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { userReducer } from './userReducer';
import { AlbumReducer } from './AlbumReducer';

const rootReducer = combineReducers({
  form: formReducer,
  user: userReducer,
  album: AlbumReducer
});

export default rootReducer;
