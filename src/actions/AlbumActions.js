import { SELECT_TRACK, NEXT_TRACK } from './types';

export const selectTrack = (trackIndex) => {
  return {
    type: SELECT_TRACK,
    payload: trackIndex
  };
};

export const getNextTrack = () => {
  return (dispatch, getState) => {
    const currentTrackIndex = getState().album.trackIndex;
    const tracks = getState().album.tracks;

    if (tracks.length <= currentTrackIndex + 1) return;
    dispatch({
      type: NEXT_TRACK
    });
  };
};
