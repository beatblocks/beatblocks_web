import { SET_ETH_PRICE } from '../actions/types';

const initialState = {
  priceUsd: '',
};

export const EthereumReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ETH_PRICE:
      return {
        priceUsd: action.payload
      };
    default:
      return state;
  }
};
