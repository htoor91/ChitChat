const MessageUtil = {

  createMessage(message){
    return $.ajax({
      method: "POST",
      url: "/api/messages",
      data: {message}
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

  updateMessage(messageId){
    return $.ajax({
      method: 'PUT',
      url: `/api/messages/${messageId}`
    });
  }

};

export default MessageUtil;
