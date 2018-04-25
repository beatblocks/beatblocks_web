import {
  SET_BROWSE_DATA
} from '../actions';

const initialState = {
  browseData: []
};

export const BrowseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BROWSE_DATA:
      return {
        ...state,
        browseData: action.payload
      };
    default:
      return state;
  }
};
