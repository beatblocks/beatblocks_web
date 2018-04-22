import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { userReducer } from './userReducer';
import { AlbumReducer } from './AlbumReducer';
import { PublishReducer } from './PublishReducer';

const rootReducer = combineReducers({
  form: formReducer,
  user: userReducer,
  album: AlbumReducer,
  publish: PublishReducer
});

export default rootReducer;
