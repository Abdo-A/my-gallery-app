import * as actionTypes from './actionTypes';
import http, { photoApi } from '../../helpers/httpService';

export const createPost = (post, callback) => (dispatch) => {
  dispatch({
    type: actionTypes.START_LOADING,
  });

  const formData = new FormData();

  formData.append('profile', post, post.name);

  http
    .post(`${photoApi}`, formData)
    .then(() => {
      if (callback) callback();
      console.log('success');
    })
    .catch((err) => {
      console.log(err);
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

export const s = 3;
