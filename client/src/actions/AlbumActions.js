import { SELECT_TRACK, NEXT_TRACK } from './types';

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
