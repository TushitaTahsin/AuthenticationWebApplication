import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  error: false,
  loading: false,
  responseMessage: null,
  authRedirectPath: "/",
  signedUp: false,
  authData: null,
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const authSuccess = (state, action) => {
  console.log("state check");
  console.log("success");
  return updateObject(state, {
    token: action.authData.token,
    error: null,
    loading: false,
    signedUp: false,
    authData: action.authData,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const logout = (state, action) => {
  return updateObject(state, {
    token: null,
    error: false,
    loading: false,
  });
};

const logoutFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const signupSuccess = (state, action) => {
  return updateObject(state, { signedUp: true, loading: false });
};

const signupFailed = (state, action) => {
  return updateObject(state, { error: action.error, signedUp: false });
};

const setSignedUpToFalse = (state, action) => {
  return updateObject(state, { signedUp: false });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, {
    authRedirectPath: action.path,
    signedUp: false,
  });
};

const authenticated = (state, action) => {
  return updateObject(state, {
    token: action.token,
    error: null,
    loading: false,
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

    case actionTypes.LOGOUT:
      return logout(state, action);

    case actionTypes.LOGOUT_FAIL:
      return logoutFail(state, action);

    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);

    case actionTypes.SIGNUP_SUCCESS:
      return signupSuccess(state, action);

    case actionTypes.SIGNUP_FAILED:
      return signupFailed(state, action);

    case actionTypes.SET_SIGNED_UP_TO_FALSE:
      return setSignedUpToFalse(state, action);

    case actionTypes.AUTHENTICATED:
      return authenticated(state, action);

    default:
      return state;
  }
};

export default reducer;
