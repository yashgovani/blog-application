import * as actionTypes from './actionTypes';
import axios from '../../axios-post';

export const postUploadStart = () => {
  return {
    type: actionTypes.UPLOAD_POST_START,
  };
};

export const postUploadSuccess = (id, postData) => {
  return {
    type: actionTypes.UPLOAD_POST_SUCCESS,
    postId: id,
    postData: postData,
  };
};

export const postUploadFail = (error) => {
  return {
    type: actionTypes.UPLOAD_POST_FAIL,
    error: error,
  };
};

export const postUpload = (postData, token) => {
  return (dispatch) => {
    dispatch(postUploadStart());
    axios
      .post('/posts.json?auth=' + token, postData)
      .then((response) => {
        dispatch(postUploadSuccess(response.data.name, postData));
      })
      .catch((error) => {
        dispatch(postUploadFail(error));
      });
  };
};

export const uploadInit = () => {
  return {
    type: actionTypes.UPLOAD_INIT,
  };
};

export const fetchPostStart = () => {
  return {
    type: actionTypes.FETCH_POST_START,
  };
};

export const fetchPostSuccess = (posts) => {
  return {
    type: actionTypes.FETCH_POST_SUCCESS,
    posts: posts,
  };
};

export const fetchPostFail = (error) => {
  return {
    type: actionTypes.FETCH_POST_FAIL,
    error: error,
  };
};

export const fetchPosts = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchPostStart());
    const queryParams =
      '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get('/posts.json' + queryParams)
      .then((res) => {
        const fetchedPosts = [];
        for (let key in res.data) {
          fetchedPosts.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchPostSuccess(fetchedPosts));
      })
      .catch((err) => {
        dispatch(fetchPostFail(err));
      });
  };
};

export const fetchAllPosts = () => {
  return (dispatch) => {
    dispatch(fetchPostStart());
    axios
      .get('/posts.json')
      .then((res) => {
        const fetchedPosts = [];
        for (let key in res.data) {
          fetchedPosts.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchPostSuccess(fetchedPosts));
      })
      .catch((err) => {
        dispatch(fetchPostFail(err));
      });
  };
};
