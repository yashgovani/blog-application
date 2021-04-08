import * as actionTypes from '../action/actionTypes';
import { updateObject } from '../../utility';

const initialState = {
  posts: [],
  loading: false,
  uploaded: false,
};

const uploadInit = (state, action) => {
  return updateObject(state, { uploaded: false });
};

const uploadPostStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const uploadPostSuccess = (state, action) => {
  const newPost = updateObject(action.postData, { id: action.postId });
  return updateObject(state, {
    loading: false,
    uploaded: true,
    posts: state.posts.concat(newPost),
  });
};

const uploadPostFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const fetchPostStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchPostSuccess = (state, action) => {
  return updateObject(state, {
    posts: action.posts,
    loading: false,
  });
};

const fetchPostFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPLOAD_INIT:
      return uploadInit(state, action);
    case actionTypes.UPLOAD_POST_START:
      return uploadPostStart(state, action);
    case actionTypes.UPLOAD_POST_SUCCESS:
      return uploadPostSuccess(state, action);
    case actionTypes.UPLOAD_POST_FAIL:
      return uploadPostFail(state, action);
    case actionTypes.FETCH_POST_START:
      return fetchPostStart(state, action);
    case actionTypes.FETCH_POST_SUCCESS:
      return fetchPostSuccess(state, action);
    case actionTypes.FETCH_POST_FAIL:
      return fetchPostFail(state, action);
    default:
      return state;
  }
};

export default reducer;
