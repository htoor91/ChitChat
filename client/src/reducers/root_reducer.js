import { combineReducers } from 'redux';
// import users from 'user_reducer';
import auth from './auth_reducer';

export default combineReducers( {auth} );
