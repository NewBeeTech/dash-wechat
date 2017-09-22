/* @flow */
import React from 'react';

import { Route, IndexRoute } from 'react-router';

import RootContainer from './container/RootContainer';
// import DashList from './components/DashList';
import * as RoutingURL from './core/RoutingURL/RoutingURL';

const DashList = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./components/DashList').default);
  }, 'DashList');
};

const routes = (
  <Route path="/" component={RootContainer} >
    <Route path={RoutingURL.DashList()} getComponent={DashList} />
  </Route>
);

export default routes;
