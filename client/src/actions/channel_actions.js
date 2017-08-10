import Channel from '../util/channel_util';

export const ADD_CHANNEL = 'ADD_CHANNEL';
export const ADD_USER_TO_CHANNEL = 'ADD_USER_TO_CHANNEL';
export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';
export const RECEIVE_USER_CHANNELS = 'RECEIVE_USER_CHANNELS';
export const RECEIVE_CHANNEL_USERS = 'RECEIVE_CHANNEL_USERS';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS';

export function createChannel(channel) {
  return (dispatch) => {
    return Channel.createChannel(channel).then(
      (createdChannel) => dispatch(addChannel(createdChannel)),
      (err) => dispatch(receiveErrors(err))
    );
  };
}

export function deleteChannel(channelId){
  return (dispatch) => {
    return Channel.deleteChannel(channelId).then(
      (deletedChannel) => dispatch(removeChannel(deletedChannel)),
      (err) => dispatch(receiveErrors(err))
    );
  };
}

export function fetchUserChannels(userId){
  return (dispatch) => {
    return Channel.fetchUserChannels(userId).then(
      (userChannels) => dispatch(receiveUserChannels(userChannels)),
      (err) => dispatch(receiveErrors(err))
    );
  };
}

export function fetchChannelUsers(channelId){
  return (dispatch) => {
    return Channel.fetchChannelUsers(channelId).then(
      (channelUsers) => dispatch(receiveChannelUsers(channelUsers, channelId)),
      (err) => dispatch(receiveErrors(err))
    );
  };
}

export const addChannel = (channel) => {
  return {
    type: ADD_CHANNEL,
    channel
  };
};

export const addUserToChannel = (channelId, newUser) => {
  return {
    type: ADD_USER_TO_CHANNEL,
    channelId,
    newUser
  };
};


export const removeChannel = (removedChannel) => {
  return {
    type: REMOVE_CHANNEL,
    removedChannel
  };
};

export const receiveUserChannels = (userChannels) => {
  return {
    type: RECEIVE_USER_CHANNELS,
    userChannels
  };
};

export const receiveChannelUsers = (channelUsers, channelId) => {
  return {
    type: RECEIVE_CHANNEL_USERS,
    channelUsers,
    channelId
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

export const addNotification = (channelId) => {
  return {
    type: ADD_NOTIFICATION,
    channelId
  };
};

export const clearNotifications = (channelId) => {
  return {
    type: CLEAR_NOTIFICATIONS,
    channelId
  };
};
