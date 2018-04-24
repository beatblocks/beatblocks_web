import { web3, artistFactory } from '../ethereum';
import { etherToWei } from '../utils';
import { SET_ETH_ACCOUNT, SET_IS_ARTIST } from './types';

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
        return artistFactory.methods.getArtist(getState().user.selectedAccount).call();
      })
      .then((response) => {
        let isArtist = false;
        if (response) {
          isArtist = true;
        }
        if (getState().user.isArtist !== isArtist) {
          dispatch({
            type: SET_IS_ARTIST,
            payload: isArtist
          });
        }
      });
  };
};

export const createArtist = (values) => {
  const { artistName, subscriptionPrice, subscriptionLength } = values;
  return (dispatch, getState) => {
    artistFactory.methods.createArtist(artistName, etherToWei(subscriptionPrice), subscriptionLength).send({
      from: getState().user.selectedAccount,
      gas: '1000000'
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
