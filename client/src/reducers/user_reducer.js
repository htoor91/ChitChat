import { RECEIVE_USERS } from '../actions/user_actions';
import merge from 'lodash/merge';

const initState = {
  allUsers: null
};

const UserReducer = (state = initState, action) => {
  const nextState = merge({}, state);
	Object.freeze(state);

  switch(action.type) {
    case RECEIVE_USERS:
      return {
        allUsers: action.allUsers
      };
    default:
      return state;
  }
};

export default UserReducer;
