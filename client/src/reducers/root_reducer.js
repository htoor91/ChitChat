import { combineReducers } from 'redux';
import auth from './auth_reducer';
import channels from './channel_reducer';
import messages from './message_reducer';

export default combineReducers( {auth, channels, messages} );
