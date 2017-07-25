import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { splashRender, homeRender, authRender } from '../util/route_util';

const Root = ({ store }) => {
  return (
    <Provider store={ store }>
      <HashRouter>
        <div id="parent-container">
          <Route exact path="/" render={ splashRender }/>
          <Route path="/signup" component={ authRender }/>
          <Route path="/login" component={ authRender }/>
          <Route path="/messages/:messageId" render={ homeRender }/>
        </div>
      </HashRouter>
    </Provider>
  );
};

export default Root;
