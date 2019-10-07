import * as actionTypes from './actionTypes';
import http, { commentApi } from '../../helpers/httpService';

export const createComment = (postId, text, callback) => (dispatch) => {
  http
    .post(`${commentApi}`, { name: text, photoID: postId })
    .then(() => {
      if (callback) callback();
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getOneComment = async (commentId) => {
  const res = await http.get(`${commentApi}/${commentId}`);

  return res.data.comment;
};

export const w = 3;
