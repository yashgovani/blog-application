import * as actionTypes from '../action/actionTypes';
import { updateObject } from '../../utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  email: null,
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};
const authSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    token: action.idToken,
    userId: action.userId,
    email: action.email,
  });
};
const authFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
    email: null,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
