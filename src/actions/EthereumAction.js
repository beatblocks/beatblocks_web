import axios from 'axios';
import { SET_ETH_PRICE } from './types';

export const getEthereumPrice = () => {
  return (dispatch) => {
    axios.get('https://api.coinmarketcap.com/v1/ticker/ethereum')
      .then((response) => {
        dispatch({
          type: SET_ETH_PRICE,
          payload: response.price_usd
        });
      });
  };
};
