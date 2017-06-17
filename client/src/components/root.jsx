import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { splashRender, homeRender } from '../util/route_util';

const Root = ({ store }) => {
  return (
    <Provider store={ store }>
      <HashRouter>
        <div>
          <Route exact path="/" render={ splashRender }/>
          <Route path="/home" render={ homeRender }/>
        </div>
      </HashRouter>
    </Provider>
  );
};

export default Root;
