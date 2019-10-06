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

export const getAllPosts = (callback) => (dispatch) => {
  dispatch({
    type: actionTypes.START_LOADING,
  });

  http
    .get(`${photoApi}/many`)
    .then((res) => {
      if (callback) callback();
      dispatch({
        type: actionTypes.GET_ALL_POSTS,
        payload: res.data.photos,
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

export const getPhotoContent = async (photoId) => {
  const photo = await http.get(`${photoApi}/content/${photoId}`, { responseType: 'arraybuffer' });

  // Transform photo to base64
  return Buffer.from(photo.data, 'binary').toString('base64');
};
