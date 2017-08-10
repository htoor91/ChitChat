import Auth from '../util/auth_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export function login(user) {
  return (dispatch) => {
    return Auth.login(user).then(
      (res) => {
        localStorage.setItem('jwt', res.token);
        localStorage.setItem('currentUser', JSON.stringify(res.user));
        return dispatch(receiveCurrentUser(res.user));
      },
      (errors) => dispatch(receiveErrors([errors.responseText]))
    );
  };
}

export function logout() {
  return (dispatch) => {
    localStorage.clear();
    dispatch(receiveCurrentUser(null));
  };
}

export function signup(user) {
  return (dispatch) => {
    return Auth.signup(user).then(
      (res) => {
        localStorage.setItem('jwt', res.token);
        localStorage.setItem('currentUser', JSON.stringify(res.user));
        return dispatch(receiveCurrentUser(res.user, 'signup'));
      },
      (errors) => dispatch(receiveErrors([errors.responseText]))
    );
  };
}


export const receiveCurrentUser = (currentUser, formType) => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser,
    formType
  };
};

export const receiveErrors = (errors) => {
  return {
    type: RECEIVE_ERRORS,
    errors
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
