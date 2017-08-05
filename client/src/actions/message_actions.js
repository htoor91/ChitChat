import Message from '../util/message_util';
import Emoticon from '../util/emoticon_util';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';
export const EDIT_MESSAGE = 'EDIT_MESSAGE';
export const RECEIVE_CHANNEL_MESSAGES = 'RECEIVE_CHANNEL_MESSAGES';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const ADD_EMOTICON = 'ADD_EMOTICON';

export function createMessage(message) {
  return (dispatch) => {
    return Message.createMessage(message).then(
      (createdMessage) => dispatch(addMessage(createdMessage)),
      (err) => dispatch(receiveErrors(err))
    );
  };
}

export function deleteMessage(messageId){
  return (dispatch) => {
    return Message.deleteMessage(messageId).then(
      (deletedMessage) => dispatch(removeMessage(deletedMessage)),
      (err) => dispatch(receiveErrors(err))
    );
  };
}


export function updateMessage(message){
  return (dispatch) => {
    return Message.updateMessage(message).then(
      (updatedMessage) => dispatch(editMessage(updatedMessage)),
      (err) => dispatch(receiveErrors(err))
    );
  };
}

export function fetchChannelMessages(channelId){
  return (dispatch) => {
    return Message.fetchChannelMessages(channelId).then(
      (channelMessages) => dispatch(receiveChannelMessages(channelMessages)),
      (err) => dispatch(receiveErrors(err))
    );
  };
}

export function createEmoticon(emoticon){
  return (dispatch) => {
    return Emoticon.createEmoticon(emoticon).then(
      (updatedMessage) => dispatch(addEmoticon(updatedMessage)),
      (err) => dispatch(receiveErrors(err))
    );
  };
}



export const addMessage = (message) => {
  return {
    type: ADD_MESSAGE,
    message
  };
};


export const removeMessage = (removedMessage) => {
  return {
    type: REMOVE_MESSAGE,
    removedMessage
  };
};

export const editMessage = (updatedMessage) => {
  return {
    type: EDIT_MESSAGE,
    updatedMessage
  };
};

export const addEmoticon = (updatedMessage) => {
  return {
    type: ADD_EMOTICON,
    updatedMessage
  };
};

export const receiveChannelMessages = (channelMessages) => {
  return {
    type: RECEIVE_CHANNEL_MESSAGES,
    channelMessages
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
