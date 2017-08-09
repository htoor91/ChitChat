import React from 'react';
import { Route, Link } from 'react-router-dom';
import AuthFormContainer from './auth_form/auth_form_container';
import logo from '../../public/img/chat.png';
import { AuthRoute } from '../../util/route_util';

const Splash = ({children}) => {

  return(
    <section className="splash-container">
      <div className="splash-wrapper">
        <img src={logo}/>
        <h1 className="welcome-page-header">ChitChat</h1>
        <h2 className="welcome-page-subheading">Where work happens.</h2>
        <div id="welcome-page-buttons">
          <Link className="splash-button" to="/login">Login</Link>
          <Link className="splash-button" to="/signup">Signup</Link>
        </div>
      </div>
    </section>
  );
};

export default Splash;
