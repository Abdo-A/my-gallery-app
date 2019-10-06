import { combineReducers } from 'redux';

import generalReducer from './generalReducer';

import photoReducer from './photoReducer';
import commentReducer from './commentReducer';
import tagReducer from './tagReducer';

export default combineReducers({
  general: generalReducer,

  photo: photoReducer,
  comment: commentReducer,
  tag: tagReducer,
});
