import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  isAppLoading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.START_LOADING:
      return {
        ...state,
        isAppLoading: true,
      };

    case actionTypes.END_LOADING:
      return {
        ...state,
        isAppLoading: false,
      };

    default:
      return state;
  }
};
