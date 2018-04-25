import { SELECT_TRACK, NEXT_TRACK, GET_TIMESTAMP } from './types';

export const selectTrack = (trackIndex) => {
  return {
    type: SELECT_TRACK,
    payload: trackIndex
  };
};

export const getNextTrack = () => {
  return {
    type: NEXT_TRACK,
  };
};

// Get's the timestamp from the contract of the currently selected album
export const getTimeStamp = () => {
  return (dispatch, getState) => {
    if (Object.keys(getState().album.contract).length > 0) {
      getState().album.contract.methods
        .getUserSubscriptionTimestamp(getState().user.selectedAccount)
        .call()
        .then((timeStamp) => {
          if (timeStamp !== getState().album.subscriptionTimeStamp) {
            dispatch({
              type: GET_TIMESTAMP,
              payload: timeStamp
            });
          }
        });
    }
  };
};

// Subscribes to the contract of the currently selected artist
export const subscribe = () => {
  return (dispatch, getState) => {
    if (Object.keys(getState().album.contract).length > 0) {
      getState().album.contract.methods
        .subscribe()
        .send({
          from: getState().user.selectedAccount,
          gas: '5000000',
          value: getState().album.subscriptionPriceInWei
        })
        .then((timeStamp) => {
          if (timeStamp !== getState().album.subscriptionTimeStamp) {
            dispatch({
              type: GET_TIMESTAMP,
              paylaod: timeStamp
            });
          }
        });
    }
  };
};
