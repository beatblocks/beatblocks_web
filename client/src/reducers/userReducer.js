import { TOGGLE } from '../actions/types';

const initialState = {
  toggle: false
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE:
      return {
        toggle: !state.toggle
      };
    default:
      return state;
  }
};
