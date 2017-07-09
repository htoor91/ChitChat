import {
  RECEIVE_CHANNEL,
  RECEIVE_USER_CHANNELS,
  REMOVE_CHANNEL,
  RECEIVE_CHANNEL_USERS,
  RECEIVE_ERRORS,
  CLEAR_ERRORS
} from '../actions/channel_actions';
import merge from 'lodash/merge';

const initState = {
  channels: null,
  errors: []
};

const ChannelReducer = (state = initState, action) => {
  const nextState = merge({}, state);
	Object.freeze(state);

  switch(action.type) {
    case RECEIVE_CHANNEL:
      const newChannel = action.channel;
      nextState.channels[newChannel._id] = newChannel;
      return nextState;
    case RECEIVE_USER_CHANNELS:
      nextState.channels = action.userChannels;
      return nextState;
    case REMOVE_CHANNEL:
      delete nextState.channels[action.removedChannel._id];
      return nextState;
    case RECEIVE_CHANNEL_USERS:
      nextState.channels[action.channelId].users = action.channelUsers;
      return nextState;
    case RECEIVE_ERRORS:
      nextState.errors = action.errors;
      return nextState;
    case CLEAR_ERRORS:
      nextState.errors = [];
      return nextState;
    default:
      return state;
  }
};

export default ChannelReducer;