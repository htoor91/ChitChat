import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import faker from 'faker';
import logo from '../../../public/img/splash-logo.png';


class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      userErrors: '',
      passErrors: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignupErrors = this.handleSignupErrors.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
    this.clearState = this.clearState.bind(this);
    this.generateRandomUsername = this.generateRandomUsername.bind(this);
    this.generateRandomPassword = this.generateRandomPassword.bind(this);
    this.renderGuestButton = this.renderGuestButton.bind(this);
    this.renderSignupErrors = this.renderSignupErrors.bind(this);
}
  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.props.history.push('/');
    }
  }

  componentWillUnmount(){
    this.props.clearErrors();
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    if(this.handleSignupErrors()){
      this.props.processForm(user);
    }
  }

  handleSignupErrors(){
    let validUser = false;
    let validPass = false;

    if (this.state.username === "" && this.props.path === "/signup"){
      this.setState({
        userErrors: "Username can't be blank"
      });
    } else {
      this.setState( {
        userErrors: ""
      });
      validUser = true;
    }

    if (this.state.password.length < 6 && this.props.path === "/signup") {
      this.setState( {
        passErrors: "Password must be at least 6 characters long"
      });
    } else {
      this.setState( {
        passErrors: ""
      });
      validPass = true;
    }

    return validUser && validPass;
  }

  clearState() {
    this.setState({
      username: "",
      password: "",
      userErrors: "",
      passErrors: ""
    });
  }

  generateRandomUsername(){
    const fakeNames = [
      faker.name.firstName().toLowerCase(),
      faker.name.lastName().toLowerCase(),
      faker.internet.userName().toLowerCase().slice(0,6)
    ];
    const randomIndex = Math.floor(Math.random() * (3 - 0));
    return fakeNames[randomIndex];
  }

  generateRandomPassword(){
    return faker.internet.password();
  }

  demoLogin(event) {
    event.preventDefault();

    this.clearState();
    let username = this.generateRandomUsername();
    let password = this.generateRandomPassword();
    const user = {username, password};
    const timeout = 50;
    const self = this;
    const userInput = document.querySelector('.auth-user-input');
    const passInput = document.querySelector('.auth-pass-input');
    username = username.split('').reverse();
    password = password.split('').reverse();

    const slowUserInput = setInterval(() => {
      const oldVal = userInput.value;
      userInput.value = oldVal + username.pop();
      if (username.length === 0){
        clearInterval(slowUserInput);
        const slowPassInput = setInterval(() => {
          const oldPassVal = passInput.value;
          passInput.value = oldPassVal + password.pop();
          if (password.length === 0){
            clearInterval(slowPassInput);
          }
          if (username.length === 0 && password.length === 0){
            self.props.signup(user).then(()=> self.props.history.push("/"));
          }
        }, timeout);
      }
    }, timeout);
   }


  redirectLinks() {
    if (this.props.path === '/login') {
      return (
        <span>
          Need an account? <Link to="/signup">Sign up</Link>
        </span>
      );
    } else {
      return (
        <span>
          Have an account? <Link to="/login">Login</Link>
        </span>
      );
    }
  }

  renderSignupErrors(){
    let userErrors;
    let passErrors;

    if(this.state.userErrors){
      userErrors = <li key={'username-error'}>{this.state.userErrors}</li>;
    }
    if(this.state.passErrors){
      passErrors = <li key={'password-error'}>{this.state.passErrors}</li>;
    }

    if(this.props.path === "/signup"){
      return (
        <ul className="auth-signup-errors">
          {userErrors}
          {passErrors}
        </ul>
      );
    }
  }

  renderGuestButton(){
    if(this.props.path === "/login"){
      return (
        <button
          className="guest-login-button"
          onClick={this.demoLogin}>Guest Login</button>
      );
    }
  }

  render() {
    const formType = this.props.path.slice(1);

    return (
      <div className="auth-container">
        <img src={logo} className="auth-logo"/>
        <h1 className="auth-header">ChitChat</h1>
        <h2 className="auth-headline">Collaboration made easy</h2>
        <div className="auth-login-errors">{this.props.loginErrors}</div>
        {this.renderGuestButton()}
        {this.renderSignupErrors()}
        <form className="auth-form" onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input type="text"
            className="auth-user-input"
            placeholder="Enter username"
            onChange={this.update('username')}/>
          <label htmlFor="password">Password:</label>
          <input type="password"
            className="auth-pass-input"
            onChange={this.update('password')}/>
          <button className="auth-submit-button"
            type="submit"
            value="Submit">{formType}</button>
        </form>
        {this.redirectLinks()}
      </div>
    );
  }
}

export default AuthForm;
