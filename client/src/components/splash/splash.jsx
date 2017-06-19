import React from 'react';
import { Route, Link } from 'react-router-dom';
import AuthFormContainer from './auth_form/auth_form_container';
import logo from '../../public/img/splash-logo.png';
import { AuthRoute } from '../../util/route_util';

const Splash = ({children}) => {

  return(
    <section id="splash-main">
      <img id="logo" src={logo}/>
      <h1>ChitChat</h1>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </section>
  );
};

export default Splash;
