import { combineReducers } from 'redux';
import auth from './auth_reducer';
import channels from './channel_reducer';
import messages from './message_reducer';
import users from './user_reducer';
import giphys from './giphy_reducer';

export default combineReducers( {auth, channels, messages, users, giphys} );
