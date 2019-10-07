import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  allPosts: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_ALL_POSTS:
      return {
        ...state,
        allPosts: action.payload,
      };

    default:
      return state;
  }
};
