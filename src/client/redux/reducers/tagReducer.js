import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  allTags: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_TAGS:
      return {
        ...state,
        allTags: action.payload,
      };

    default:
      return state;
  }
};
