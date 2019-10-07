import * as actionTypes from './actionTypes';
import http, { photoApi } from '../../helpers/httpService';
import * as generalActions from './generalActions';

export const createPost = (post, callback) => (dispatch) => {
  dispatch({
    type: actionTypes.START_LOADING,
  });

  const formData = new FormData();

  formData.append('profile', post, post.name);

  http
    .post(`${photoApi}`, formData)
    .then(() => {
      dispatch(generalActions.setQuickInfo('Post added successfully'));
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
        payload:
        [...res.data.photos.sort(
          (photo1, photo2) => new Date(photo2.created_at) - new Date(photo1.created_at),
        )],
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

export const getOnePost = async (postId) => {
  const res = await http.get(`${photoApi}/${postId}`);

  return res.data.photo;
};


export const likePost = (postId, currentNumberOfLikes, callback) => (dispatch) => {
  http
    .put(`${photoApi}/${postId}`, { likes: currentNumberOfLikes + 1 })
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
