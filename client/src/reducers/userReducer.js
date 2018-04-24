import {
  SET_ETH_ACCOUNT,
  SET_IS_ARTIST,
  SET_ARTIST_INFORMATION,
  SET_COLLECTION_HEADERS,
  CLEAR_USER,
  USER_LOADING
} from '../actions/types';

const initialState = {
  accounts: [],
  selectedAccount: '',
  isArtist: false,
  loading: false,
  name: '',
  subscriptionPriceInWei: 0,
  subscriptionLengthInSeconds: 0,
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
    case SET_ARTIST_INFORMATION:
      return {
        ...state,
        collectionHeaderAddresses: action.payload.collectionHeaderAddresses,
        name: action.payload.name,
        subscriptionPriceInWei: action.payload.subscriptionPriceInWei,
        subscriptionLengthInSeconds: action.payload.subscriptionLengthInSeconds,
      };
    case SET_COLLECTION_HEADERS:
      return {
        ...state,
        collectionHeaders: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case CLEAR_USER:
      return {
        initialState
      };
    default:
      return state;
  }
};
