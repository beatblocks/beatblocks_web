import { SET_ETH_ACCOUNT, SET_IS_ARTIST, SET_COLLECTION_ADDRESSES, SET_COLLECTION_HEADERS } from '../actions/types';

const initialState = {
  accounts: [],
  selectedAccount: '',
  isArtist: false,
  artistContractAddress: '',
  collectionHeaderAddresses: []
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ETH_ACCOUNT:
      return {
        ...initialState,
        accounts: action.payload,
        selectedAccount: action.payload[0]
      };
    case SET_IS_ARTIST:
      return {
        ...state,
        isArtist: action.payload.isArtist,
        artistContractAddress: action.payload.artistContractAddress
      };
    case SET_COLLECTION_ADDRESSES:
      return {
        ...state,
        collectionHeaderAddresses: action.payload
      };
    case SET_COLLECTION_HEADERS:
      return {
        ...state,
        collectionHeaders: action.payload
      };
    default:
      return state;
  }
};
