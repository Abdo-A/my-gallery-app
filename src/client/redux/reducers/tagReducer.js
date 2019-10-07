import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  allTags: [],
  selectedTags: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_ALL_TAGS:
      return {
        ...state,
        allTags: action.payload,
      };
    case actionTypes.SET_SELECTED_TAGS:
      return {
        ...state,
        selectedTags: action.payload,
      };

    default:
      return state;
  }
};
