import { connect } from 'react-redux';
import Sidebar from './sidebar';
import { fetchUserChannels } from '../../../actions/channel_actions';

import { logout } from '../../../actions/auth_actions';

const mapStateToProps = (state) => {
  return({
    user: state.auth.currentUser
  });
};

const mapDispatchToProps = (dispatch) => {
  return({
    fetchUserChannels: (userId) => dispatch(fetchUserChannels(userId)),
    logout: () => dispatch(logout())
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
