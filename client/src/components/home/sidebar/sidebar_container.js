import { connect } from 'react-redux';
import Sidebar from './sidebar';
import { fetchUserChannels } from '../../../actions/channel_actions';
import { logout } from '../../../actions/auth_actions';
import { withRouter } from 'react-router';
import { selectChannels } from '../../../reducers/selectors';

const mapStateToProps = (state, { match }) => {
  return({
    user: state.auth.currentUser,
    messageId: match.params.messageId,
    firstChannel: selectChannels(state, false)[0],
    path: match.path
  });
};

const mapDispatchToProps = (dispatch) => {
  return({
    fetchUserChannels: (userId) => dispatch(fetchUserChannels(userId)),
    logout: () => dispatch(logout())
  });
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Sidebar)
);
