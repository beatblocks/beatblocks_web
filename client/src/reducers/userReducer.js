import { SET_ETH_ACCOUNT, SET_IS_ARTIST } from '../actions/types';

const initialState = {
  accounts: [],
  slectedAccount: '',
  isArtist: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ETH_ACCOUNT:
      return {
        ...state,
        accounts: action.payload,
        selectedAccount: action.payload[0]
      };
    case SET_IS_ARTIST:
      return {
        ...state,
        isArtist: action.payload
      };
    default:
      return state;
  }
};
