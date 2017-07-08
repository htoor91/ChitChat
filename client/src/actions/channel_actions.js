import Channel from '../util/channel_util';

export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
export const RECEIVE_USER_CHANNELS = 'RECEIVE_USER_CHANNELS';
export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';
export const RECEIVE_CHANNEL_USERS = 'RECEIVE_CHANNEL_USERS';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export function createChannel(channel) {
  return (dispatch) => {
    return Channel.createChannel(channel).then(
      (createdChannel) => dispatch(receiveChannel(createdChannel)),
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
      (channelUsers) => dispatch(receiveChannelUsers(channelUsers)),
      (err) => dispatch(receiveErrors(err))
    );
  };
}

export const receiveChannel = (channel) => {
  return {
    type: RECEIVE_CHANNEL,
    channel
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

export const receiveChannelUsers = (channelUsers) => {
  return {
    type: RECEIVE_CHANNEL_USERS,
    channelUsers
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
