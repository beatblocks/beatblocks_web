import { web3, artistFactory, Artist } from '../ethereum';
import { etherToWei } from '../utils';
import ipfs from '../ipfs';
import {
  SET_ETH_ACCOUNT,
  SET_IS_ARTIST,
  SET_ARTIST_INFORMATION,
  SET_COLLECTION_HEADERS,
  CLEAR_USER,
  EMPTY_ADDRESS,
} from './types';
import history from '../history';

// Detect users changing which account is selected from metamask
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

// Takes an artist's info and publishes a new contract for them
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

// Updates the artist's general information
export const updateArtist = (values) => {
  const { artistName, subscriptionPrice, subscriptionLength } = values;
  return (dispatch, getState) => {
    Artist(getState().user.artistContractAddress)
      .methods.updateGeneralInformation(artistName, etherToWei(subscriptionPrice), subscriptionLength).send({
      from: getState().user.selectedAccount,
      gas: '1000000'
    })
      .then((response) => {
        console.log(response);
        dispatch({
          type: CLEAR_USER
        });
        history.push('/artist/manage');
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// Removes a selected collection
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

// Aggregate all the neccasary info for an artist to manage their contract
export const getArtistInfo = (dispatch, getState, contractAddress = undefined) => {
  const artistContract = Artist(contractAddress || getState().user.artistContractAddress);
  return artistContract.methods.getIpfsCollectionCount().call()
    .then((count) => {
      const contractPromises = [
        artistContract.methods.name().call(),
        artistContract.methods.subscriptionPriceInWei().call(),
        artistContract.methods.subscriptionLengthInSeconds().call(),
      ];
      for (let i = 0; i < count; i++) {
        contractPromises.push(artistContract.methods.getIpfsCollection(i).call());
      }
      Promise.all(contractPromises)
        .then(([name, subscriptionPriceInWei, subscriptionLengthInSeconds, ...IpfsHeaderHashesArray]) => {
          console.log(subscriptionPriceInWei)
          dispatch({
            type: SET_ARTIST_INFORMATION,
            payload: {
              collectionHeaderAddresses: IpfsHeaderHashesArray,
              name,
              subscriptionPriceInWei,
              subscriptionLengthInSeconds
            }
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
