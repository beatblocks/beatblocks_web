import { SELECT_TRACK } from './types';

export const selectTrack = (trackIndex) => {
  return {
    type: SELECT_TRACK,
    payload: trackIndex
  };
};
