import ChatHeader from './chat_header';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchChannels, fetchChannelUsers } from '../../../actions/channel_actions';

const mapStateToProps = (state, { match }) => {
  const channelId = match.params.channelId;
  return {
    channel: state.channels.channels[channelId],
    channelId: channelId,
    currentUser: state.auth.currentUser,
    formType: state.auth.formType
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchChannels: (userId) => dispatch(fetchChannels(userId)),
    fetchChannelUsers: (channelId) => dispatch(fetchChannelUsers(channelId)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatHeader));
