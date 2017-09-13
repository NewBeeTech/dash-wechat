/* @flow */
import React from 'react';

import { Route, IndexRoute } from 'react-router';

import RootContainer from './container/RootContainer';
import * as RoutingURL from './core/RoutingURL/RoutingURL';

// const errorPage = (location, callback) => {
//   require.ensure([], require => {
//     callback(null, require('./components/ErrorPage').default);
//   }, 'errorPage');
// };

const routes = (
  <Route path="/" component={RootContainer} >
    <Route path={RoutingURL.errorPage()} getComponent={errorPage} />
    <Route path="*" getComponent={errorPage} />
  </Route>
);

export default routes;
