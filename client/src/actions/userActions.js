import { web3, artistFactory, Artist } from '../ethereum';
import { etherToWei } from '../utils';
import ipfs from '../ipfs';
import {
  SET_ETH_ACCOUNT,
  SET_IS_ARTIST,
  SET_COLLECTION_ADDRESSES,
  SET_COLLECTION_HEADERS,
  CLEAR_USER,
  EMPTY_ADDRESS
} from './types';

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
      .then((artistContractAddress) => {
        let isArtist = false;
        if (artistContractAddress !== EMPTY_ADDRESS) {
          isArtist = true;
        }
        if (getState().user.isArtist !== isArtist) {
          dispatch({
            type: SET_IS_ARTIST,
            payload: {
              isArtist,
              artistContractAddress
            }
          });
          getArtistInfo(dispatch, getState, artistContractAddress);
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
        dispatch({
          type: CLEAR_USER
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteCollection = (index) => {
  return (dispatch, getState) => {
    Artist(getState().user.artistContractAddress).methods.removeIpfsCollection(index).send({
      from: getState().user.selectedAccount,
      gas: '1000000'
    })
      .then((response) => {
        console.log(response);
        dispatch({
          type: CLEAR_USER
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getArtistInfo = (dispatch, getState, contractAddress = undefined) => {
  const artistContract = Artist(contractAddress || getState().user.artistContractAddress);
  return artistContract.methods.getIpfsCollectionCount().call()
    .then((count) => {
      const ipfsHashPromises = [];
      for (let i = 0; i < count; i++) {
        ipfsHashPromises.push(artistContract.methods.getIpfsCollection(i).call());
      }
      Promise.all(ipfsHashPromises)
        .then((IpfsHeaderHashesArray) => {
          dispatch({
            type: SET_COLLECTION_ADDRESSES,
            payload: IpfsHeaderHashesArray
          });
          return Promise.all(IpfsHeaderHashesArray.map((headerHash) => ipfs.files.get(headerHash)));
        })
        .then((jsonHeaders) => {
          const decoder = new TextDecoder("utf-8");
          dispatch({
            type: SET_COLLECTION_HEADERS,
            payload: jsonHeaders.map((jsonHeader) => JSON.parse(new TextDecoder("utf-8").decode(jsonHeader[0].content)))
          });
        });
    });
};
