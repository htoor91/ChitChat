import {
  RECEIVE_CURRENT_USER,
  RECEIVE_ERRORS,
  CLEAR_ERRORS } from '../actions/auth_actions';
import merge from 'lodash/merge';

const initState = {
  currentUser: null,
  errors: [],
  formType: null
};

const AuthReducer = (state = initState, action) => {
  const nextState = merge({}, state);
	Object.freeze(state);

  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        currentUser: action.currentUser,
        errors: [],
        formType: action.formType      
      };
    case RECEIVE_ERRORS:
      return {
        currentUser: null,
        errors: action.errors,
      };
    case CLEAR_ERRORS:
      nextState.errors = [];
      return nextState;
    default:
      return state;
  }
};

export default AuthReducer;
