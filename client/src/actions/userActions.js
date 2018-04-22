import { web3 } from '../ethereum';
import { SET_ETH_ACCOUNT } from './types';

export const setAccounts = () => {
  return (dispatch, getState) => {
    web3.eth.getAccounts()
      .then((accounts) => {
        if (getState().user.selectedAccount !== accounts[0]) {
          dispatch({
            type: SET_ETH_ACCOUNT,
            payload: accounts
          });
        }
      });
  };
};
