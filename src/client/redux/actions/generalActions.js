import * as actionTypes from './actionTypes';

export const startLoading = () => (dispatch) => {
  dispatch({
    type: actionTypes.START_LOADING,
  });
};

export const endLoading = () => (dispatch) => {
  dispatch({
    type: actionTypes.END_LOADING,
  });
};
