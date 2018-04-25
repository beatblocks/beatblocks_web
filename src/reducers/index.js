import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { userReducer } from './userReducer';
import { AlbumReducer } from './AlbumReducer';
import { PublishReducer } from './PublishReducer';
import { EthereumReducer } from './EthereumReducer';
import { BrowseReducer } from './BrowseReducer';

const rootReducer = combineReducers({
  form: formReducer,
  user: userReducer,
  album: AlbumReducer,
  publish: PublishReducer,
  ethereum: EthereumReducer,
  browse: BrowseReducer
});

export default rootReducer;
