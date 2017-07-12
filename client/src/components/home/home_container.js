import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Home from './home';

const mapStateToProps = (state) => {
  return({
    loggedIn: Boolean(state.auth.currentUser)
  });
};

const mapDispatchToProps = (dispatch) => {
  return;
};

export default withRouter(
  connect(mapStateToProps, null)(Home)
);
