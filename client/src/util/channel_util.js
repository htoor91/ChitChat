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

  deleteChannel(id){
    return $.ajax({
      method: 'DELETE',
      url: `/api/channels/${id}`
    });
  },

  fetchChannelUserCount(channelId){
    return $.ajax({
      method: 'GET',
      url: `/api/channels/${channelId}`
    });
  }

};

export default ChannelUtil;
