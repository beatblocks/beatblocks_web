import {
  SELECT_TRACK,
  NEXT_TRACK,
  SELECT_ALBUM,
  CLEAR_SELECTION
} from '../actions';

const initialState = {
  artistName: '',
  collectionName: '',
  imgHash: '',
  subscriptionLengthInSeconds: 0,
  subscriptionPriceInWei: 0,
  releaseYear: 0,
  trackNames: [],
  trackHashes: [],
  playQueue: [],
  selectedTrackHash: '',
};

export const AlbumReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_ALBUM:
      return {
        ...state,
        artistName: action.payload.artistName,
        collectionName: action.payload.collectionName,
        releaseYear: action.payload.releaseYear,
        subscriptionLengthInSeconds: action.payload.subscriptionLengthInSeconds,
        subscriptionPriceInWei: action.payload.subscriptionPriceInWei,
        trackNames: action.payload.trackNames,
        trackHashes: action.payload.trackHashes,
        imgHash: action.payload.imgHash,
      };
    case CLEAR_SELECTION:
      return {
        ...state,
        artistName: '',
        collectionName: '',
        imgHash: '',
        subscriptionLengthInSeconds: 0,
        subscriptionPriceInWei: 0,
        releaseYear: 0,
        trackNames: [],
        trackHashes: [],
      };
    case SELECT_TRACK:
      return {
        ...state,
        selectedTrackHash: state.trackHashes[action.payload],
        playQueue: state.trackHashes.slice(action.payload + 1, state.trackHashes.length)
      };
    case NEXT_TRACK:
      return {
        ...state,
        selectedTrackHash: state.playQueue[0],
        playQueue: state.playQueue.slice(1, state.playQueue.length)
      };
    default:
      return state;
  }
};
