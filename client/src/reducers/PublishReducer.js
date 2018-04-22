import {
  PUBLISH_LOADING,
  IPFS_IMG_COMPLETE,
  IPFS_TRACK_COMPLETE,
  IPFS_UPLOAD_COMPLETE,
  IPFS_INFO_COMPLETE
} from '../actions/types';

const initialState = {
  loading: false,
  uploadingInfo: false,
  imgHash: '',
  trackHashes: [],
  headerHash: '',
  collectionHeader: {}
};

export const PublishReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUBLISH_LOADING:
      return {
        ...state,
        loading: true,
        uploadingInfo: true
      };
    case IPFS_IMG_COMPLETE:
      return {
        ...state,
        imgHash: action.payload.hash
      };
    case IPFS_TRACK_COMPLETE:
      return {
        ...state,
      };
    case IPFS_INFO_COMPLETE:
      return {
        uploadingInfo: false,
        ...state,
      };
    case IPFS_UPLOAD_COMPLETE:
      return {
        ...state,
        headerHash: action.payload.headerHash,
        trackHashes: action.payload.trackHashes,
        collectionHeader: action.payload.collectionHeader
      };
    default:
      return state;
  }
};
