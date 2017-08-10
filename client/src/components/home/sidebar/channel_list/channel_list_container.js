import { connect } from 'react-redux';
import ChannelList from './channel_list';
import { selectChannels } from '../../../../reducers/selectors';
import {
  createChannel,
  clearErrors,
  fetchUserChannels  } from '../../../../actions/channel_actions';
import { fetchUsers } from '../../../../actions/user_actions';

const mapStateToProps = (state) => {
  return({
    user: state.auth.currentUser,
    errors: state.channels.errors,
    allUsers: state.users.allUsers,
    publicChannels: selectChannels(state, false),
    privateChannels: selectChannels(state, true)
  });
};

const mapDispatchToProps = (dispatch) => {
  return({
    createChannel: (channel) => dispatch(createChannel(channel)),
    clearErrors: () => dispatch(clearErrors()),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchUserChannels: (userId) => dispatch(fetchUserChannels(userId)),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
