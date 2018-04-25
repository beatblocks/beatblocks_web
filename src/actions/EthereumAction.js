import axios from 'axios';
import { SET_ETH_PRICE } from './types';

// Never used, had problems finding an API that worked to give me this information :(
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
