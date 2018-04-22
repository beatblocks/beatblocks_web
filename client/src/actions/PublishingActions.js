import ipfs from '../ipfs';
import {
  PUBLISH_LOADING,
  IPFS_IMG_COMPLETE,
  IPFS_TRACK_COMPLETE,
  IPFS_UPLOAD_COMPLETE,
  IPFS_INFO_COMPLETE
} from './types';

export const publishCollection = (publishValues) => {
  return (dispatch, getState) => {
    dispatch({
      type: PUBLISH_LOADING,
    });

    const trackHashArray = Array(publishValues.tracks.length, 0);
    const trackNames = publishValues.tracks.map((track) => track.name);

    console.log(publishValues);

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

                    if (!trackHashArray.includes(0)) {
                      completeUpload(dispatch, getState, publishValues, trackNames, trackHashArray);
                    }
                  });
              };
            };
            uploadTrack(index);
            trackReader.readAsBinaryString(track.mp3);
          });
        });
    };
    imgReader.readAsArrayBuffer(publishValues.albumImg);
  };
};

const completeUpload = (dispatch, getState, publishValues, trackNames, trackHashArray) => {
  const collectionHeader = {
    name: publishValues.albumName,
    releaseYear: publishValues.albumYear,
    trackNames,
    trackHashes: trackHashArray,
    imgHash: getState().publish.imgHash
  };
  ipfs.files.add({ path: '', content: Buffer.from(JSON.stringify(collectionHeader)) })
    .then((headerResponse) => {
      dispatch({
        type: IPFS_UPLOAD_COMPLETE,
        payload: {
          headerHash: headerResponse[0].hash,
          trackHashes: trackHashArray,
          collectionHeader
        }
      });
    });
};
