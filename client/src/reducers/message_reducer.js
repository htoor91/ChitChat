import {
  ADD_MESSAGE,
  REMOVE_MESSAGE,
  EDIT_MESSAGE,
  RECEIVE_CHANNEL_MESSAGES,
  RECEIVE_ERRORS,
  CLEAR_ERRORS,
  ADD_EMOTICON
} from '../actions/message_actions';
import merge from 'lodash/merge';

const initState = {
  messages: {},
  errors: []
};

const MessageReducer = (state = initState, action) => {
  const nextState = merge({}, state);
	Object.freeze(state);

  switch(action.type) {
    case ADD_MESSAGE:
      const newMessage = action.message;
      nextState.messages[newMessage._id] = newMessage;
      return nextState;
    case REMOVE_MESSAGE:
      delete nextState.messages[action.removedMessage._id];
      return nextState;
    case EDIT_MESSAGE:
      nextState.messages[action.updatedMessage._id].updatedAt = action.updatedMessage.updatedAt;
      nextState.messages[action.updatedMessage._id].content = action.updatedMessage.content;
      return nextState;
    case ADD_EMOTICON:
      nextState.messages[action.updatedMessage._id].emoticons = action.updatedMessage.emoticons;
      return nextState;
    case RECEIVE_CHANNEL_MESSAGES:
      nextState.messages = action.channelMessages;
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

export default MessageReducer;
