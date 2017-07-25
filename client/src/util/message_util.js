const MessageUtil = {

  createMessage(message){
    return $.ajax({
      method: "POST",
      url: "/api/messages",
      data: message
    });
  },

  fetchChannelMessages(channelId){
    return $.ajax({
      method: 'GET',
      url: `/api/channels/${channelId}/messages`,
    });
  },

  deleteMessage(messageId){
    return $.ajax({
      method: 'DELETE',
      url: `/api/messages/${messageId}`
    });
  },

  updateMessage(message){
    return $.ajax({
      method: 'PUT',
      url: `/api/messages/${message._id}`,
      data: message
    });
  }

};

export default MessageUtil;
