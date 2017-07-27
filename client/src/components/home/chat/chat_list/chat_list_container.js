import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import ChatList from './chat_list';
import {
  fetchChannelMessages,
  createMessage,
  deleteMessage,
  updateMessage,
  addMessage } from '../../../../actions/message_actions';
// import { deleteNotifications, createNotification } from '../../../../../frontend/actions/session_actions';

// TODO refactor messages into a selector function.

const mapStateToProps = (state, {match}) => {
  return {
    messages: Object.keys(state.messages.messages).map(key => state.messages.messages[key]),
    channel: state.channels.channels[match.params.channelId],
    currentUser: state.auth.currentUser,
    channelId: match.params.channelId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchChannelMessages: (channelId) => dispatch(fetchChannelMessages(channelId)),
    createMessage: (message) => dispatch(createMessage(message)),
    deleteMessage: (messageId) => dispatch(deleteMessage(messageId)),
    updateMessage: (message) => dispatch(updateMessage(message)),
    addMessage: (message) => dispatch(addMessage(message))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatList));
