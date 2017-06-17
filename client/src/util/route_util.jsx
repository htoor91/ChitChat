import { Redirect } from 'react-router';
import React from 'react';
import SplashContainer from '../components/splash/splash_container';
import HomeContainer from '../components/home/home_container';

export const splashRender = () => {
  const loggedIn = localStorage.getItem('jwt');
  return loggedIn ? <Redirect to="/home"/> : <SplashContainer />;
};

export const homeRender = () => {
  const loggedIn = localStorage.getItem('jwt');
  return loggedIn ? <HomeContainer /> : <Redirect to="/" />;
};
