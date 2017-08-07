const MessageUtil = {

  createMessage(message){
    return $.ajax({
      method: "POST",
      url: `/api/messages?access_token=${localStorage.jwt}`,
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
      url: `/api/messages/${messageId}?access_token=${localStorage.jwt}`
    });
  },

  updateMessage(message){
    return $.ajax({
      method: 'PUT',
      url: `/api/messages/${message._id}?access_token=${localStorage.jwt}`,
      data: message
    });
  }

};

export default MessageUtil;
