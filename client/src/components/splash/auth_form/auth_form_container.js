import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { login, signup, clearErrors } from '../../../actions/auth_actions';
import AuthForm from './auth_form';

const mapStateToProps = (state, { match }) => ({
  loggedIn: Boolean(state.auth.currentUser),
  loginErrors: state.auth.errors,
  path: match.path
});

const mapDispatchToProps = (dispatch, { location }) => {
  const formType = location.pathname.slice(1);
  const processForm = (formType === 'login') ? login : signup;

  return {
    processForm: (user) => dispatch(processForm(user)),
    clearErrors: () => dispatch(clearErrors()),
    signup: (user) => dispatch(signup(user))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AuthForm)
);
