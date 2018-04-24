import { artistFactory, Artist } from '../ethereum';
import ipfs from '../ipfs';
import {
  SET_BROWSE_DATA,
} from './types';

export const getArtistsAndInfo = () => {
  return (dispatch) => {
    let artistContracts;
    let generalInformationArrays;
    let allHeaders;
    artistFactory.methods.getArtists().call()
      .then((artistAddresses) => {
        return Promise.all(artistAddresses.map((address) => artistFactory.methods.getArtist(address).call()));
      })
      .then((artistContractAddresses) => {
        artistContracts = artistContractAddresses.map((address) => Artist(address));
        return Promise.all(artistContracts.map((contract) => contract.methods.getIpfsCollectionCount().call()));
      })
      .then((counts) => {
        return Promise.all(counts.map((count, index) => {
          const contractPromises = [
            artistContracts[index].methods.name().call(),
            artistContracts[index].methods.subscriptionPriceInWei().call(),
            artistContracts[index].methods.subscriptionLengthInSeconds().call(),
          ];
          for (let i = 0; i < count; i++) {
            contractPromises.push(artistContracts[index].methods.getIpfsCollection(i).call());
          }
          return Promise.all(contractPromises);
        }));
      })
      .then((artistContractInformationArrays) => {
        generalInformationArrays = artistContractInformationArrays;
        return Promise.all(artistContractInformationArrays
          .map(([name, subscriptionPriceInWei, subscriptionLengthInSeconds, ...IpfsHeaderHashesArray]) => {
            return Promise.all(IpfsHeaderHashesArray.map((headerHash) => ipfs.files.get(headerHash)));
          }));
      })
      .then((allHeadersResponse) => {
        allHeaders = allHeadersResponse.map((headers) =>
          headers.map((jsonHeader) => JSON.parse(new TextDecoder("utf-8").decode(jsonHeader[0].content))));

        const browseData = generalInformationArrays
          .map(([name, subscriptionPriceInWei, subscriptionLengthInSeconds, ...IpfsHeaderHashesArray], index) => {
          return {
            name,
            subscriptionPriceInWei,
            subscriptionLengthInSeconds,
            IpfsHeaderHashesArray,
            collectionHeaders: allHeaders[index],
            contract: artistContracts[index]
          };
        });
        dispatch({
          type: SET_BROWSE_DATA,
          payload: browseData
        });
      });
  };
};
