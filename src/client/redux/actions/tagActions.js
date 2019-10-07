import * as actionTypes from './actionTypes';
import * as generalActions from './generalActions';
import http, { tagApi } from '../../helpers/httpService';

export const createTag = (name, callback) => (dispatch) => {
  http
    .post(`${tagApi}`, { name })
    .then(() => {
      dispatch(generalActions.setQuickInfo('Tag added successfully'));
      if (callback) callback();
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getAllTags = (callback) => (dispatch) => {
  dispatch({
    type: actionTypes.START_LOADING,
  });

  http
    .get(`${tagApi}/many`)
    .then((res) => {
      if (callback) callback();
      dispatch({
        type: actionTypes.GET_ALL_TAGS,
        payload: res.data.tags,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.SET_ERRORS,
        payload: err.response.data,
      });
    })
    .finally(() => {
      dispatch({
        type: actionTypes.END_LOADING,
      });
    });
};
