import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import ChatList from './chat_list';
import {
  addNotification,
  clearNotifications,
  addUserToChannel,
  fetchChannelUsers,
  addChannel } from '../../../../actions/channel_actions';
import {
  fetchChannelMessages,
  createMessage,
  deleteMessage,
  updateMessage,
  editMessage,
  addMessage,
  removeMessage,
  createEmoticon,
  addEmoticon } from '../../../../actions/message_actions';
import { selectMessages } from '../../../../reducers/selectors';
import { fetchGifs, translateToGif } from '../../../../actions/giphy_actions';

const mapStateToProps = (state, {match}) => {
  return {
    messages: selectMessages(state),
    channel: state.channels.channels[match.params.channelId],
    currentUser: state.auth.currentUser,
    channelId: match.params.channelId,
    giphys: state.giphys.giphys,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchChannelMessages: (channelId) => dispatch(fetchChannelMessages(channelId)),
    createMessage: (message) => dispatch(createMessage(message)),
    deleteMessage: (messageId) => dispatch(deleteMessage(messageId)),
    updateMessage: (message) => dispatch(updateMessage(message)),
    editMessage: (message) => dispatch(editMessage(message)),
    addMessage: (message) => dispatch(addMessage(message)),
    removeMessage: (message) => dispatch(removeMessage(message)),
    addNotification: (channelId) => dispatch(addNotification(channelId)),
    clearNotifications: (channelId) => dispatch(clearNotifications(channelId)),
    createEmoticon: (emoticon) => dispatch(createEmoticon(emoticon)),
    addEmoticon: (updatedMessage) => dispatch(addEmoticon(updatedMessage)),
    fetchGifs: (searchTerm) => dispatch(fetchGifs(searchTerm)),
    fetchChannelUsers: (channelId) => dispatch(fetchChannelUsers(channelId)),
    addUserToChannel: (channelId, newUser) => dispatch(addUserToChannel(channelId, newUser)),
    addChannel: (channel) => dispatch(addChannel(channel))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatList));
