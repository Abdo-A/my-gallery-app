import axios from 'axios';

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};

export default http;

export const apiPath = 'http://localhost:3000/api';
export const photoApi = `${apiPath}/photo`;
export const commentApi = `${apiPath}/comment`;
export const tagApi = `${apiPath}/tag`;
