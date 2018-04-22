import { SET_ETH_ACCOUNT } from '../actions/types';

const initialState = {
  accounts: [],
  slectedAccount: ''
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ETH_ACCOUNT:
      return {
        accounts: action.payload,
        selectedAccount: action.payload[0]
      };
    default:
      return state;
  }
};
