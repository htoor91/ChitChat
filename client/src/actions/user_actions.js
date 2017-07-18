import User from '../util/user_util';

export const RECEIVE_USERS = "RECEIVE_USERS";

export function fetchUsers(){
  return (dispatch) => {
    return User.fetchUsers().then(
      (allUsers) => dispatch(receiveUsers(allUsers))
    );
  };
}

export const receiveUsers = (allUsers) => {
  return {
    type: RECEIVE_USERS,
    allUsers
  };
};
