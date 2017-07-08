const ChannelUtil = {

  createChannel(channel){
    return $.ajax({
      method: "POST",
      url: "/api/users",
      data: {channel}
    });
  },

  fetchUserChannels(userId){
    return $.ajax({
      method: 'GET',
      url: `/api/users/${userId}/channels`,
    });
  },

  deleteChannel(channelId){
    return $.ajax({
      method: 'DELETE',
      url: `/api/channels/${channelId}`
    });
  },

  fetchChannelUsers(channelId){
    return $.ajax({
      method: 'GET',
      url: `/api/channels/${channelId}/users`
    });
  }

};

export default ChannelUtil;
