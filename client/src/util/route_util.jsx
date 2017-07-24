import React from 'react';
import { Redirect } from 'react-router';
import SplashContainer from '../components/splash/splash';
import HomeContainer from '../components/home/home_container.js';
import AuthFormContainer from '../components/splash/auth_form/auth_form_container';

export const splashRender = () => {
  const loggedIn = localStorage.getItem('jwt');
  return loggedIn ? <Redirect to="/messages/:messageId"/> : <SplashContainer />;
};

export const homeRender = () => {
  const loggedIn = localStorage.getItem('jwt');
  return loggedIn ? <HomeContainer /> : <Redirect to="/" />;
};

export const authRender = ({match}) => {
  const loggedIn = localStorage.getItem('jwt');
  return loggedIn ? <Redirect to="/messages/:messageId"/> : <AuthFormContainer />;
};
