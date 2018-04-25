import ipfs from '../ipfs';
import {
  PUBLISH_LOADING,
  IPFS_IMG_COMPLETE,
  IPFS_TRACK_COMPLETE,
  IPFS_UPLOAD_COMPLETE,
} from './types';
import { Artist, artistFactory, web3 } from '../ethereum';
import { getArtistInfo } from './';
import history from '../history';

export const publishCollection = (publishValues, hashUpdateIndex = undefined) => {
  return (dispatch, getState) => {
    dispatch({
      type: PUBLISH_LOADING,
    });

    const trackHashArray = [];
    for (let i = 0; i < publishValues.tracks.length; i++) {
      trackHashArray.push(0);
    }
    const trackNames = publishValues.tracks.map((track) => track.name);
    let completeUploadCalled = false;

    // Upload the image first
    const imgReader = new window.FileReader();
    imgReader.onloadend = () => {
      const imgBuffer = Buffer.from(imgReader.result);
      ipfs.add(imgBuffer)
        .then((imgResponse) => {
          dispatch({
            type: IPFS_IMG_COMPLETE,
            payload: {
              hash: imgResponse[0].hash,
            }
          });
          publishValues.tracks.forEach((track, index) => {
            const trackReader = new window.FileReader();
            const uploadTrack = (i) => {
              trackReader.onloadend = () => {
                const trackBuffer = Buffer.from(trackReader.result);
                ipfs.add(trackBuffer)
                  .then((trackResponse) => {
                    dispatch({
                      type: IPFS_TRACK_COMPLETE,
                      payload: {
                        hash: trackResponse[0].hash,
                      }
                    });
                    trackHashArray[i] = trackResponse[0].hash;

                    if (!completeUploadCalled && !trackHashArray.includes(0)) {
                      completeUploadCalled = true;
                      completeUpload(dispatch, getState, publishValues, trackNames, trackHashArray, hashUpdateIndex);
                    }
                  });
              };
            };
            uploadTrack(index);
            trackReader.readAsArrayBuffer(track.mp3);
          });
        });
    };
    imgReader.readAsArrayBuffer(publishValues.albumImg);
  };
};

const completeUpload = (dispatch, getState, publishValues, trackNames, trackHashArray, hashUpdateIndex = undefined) => {
  const collectionHeader = {
    name: publishValues.albumName,
    releaseYear: publishValues.albumYear,
    trackNames,
    trackHashes: trackHashArray,
    imgHash: getState().publish.imgHash
  };
  let headerHash;
  ipfs.files.add({ path: '', content: Buffer.from(JSON.stringify(collectionHeader)) })
    .then((headerResponse) => {
      headerHash = headerResponse[0].hash;
      dispatch({
        type: IPFS_UPLOAD_COMPLETE,
        payload: {
          headerHash: headerResponse[0].hash,
          trackHashes: trackHashArray,
          collectionHeader
        }
      });
      return web3.eth.getAccounts();
    })
    .then((accounts) => {
      return artistFactory.methods.getArtist(accounts[0]).call();
    })
    .then((contractAddress) => {
      console.log('tw', hashUpdateIndex);
      if (hashUpdateIndex !== undefined) {
        console.log('tw', 'updateCalled');
        return Artist(contractAddress).methods.updateIpfsCollection(hashUpdateIndex, headerHash).send({
          from: getState().user.selectedAccount,
          gas: '5000000'
        });
      }
      console.log('tw', 'createCalled');
      return Artist(contractAddress).methods.addIpfsCollection(headerHash).send({
        from: getState().user.selectedAccount,
        gas: '5000000'
      });
    })
    .then((publishResponse) => {
      console.log(publishResponse);
      getArtistInfo(dispatch, getState, getState().user.artistContractAddress)
        .then(() => {
          history.push('/artist/manage');
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
