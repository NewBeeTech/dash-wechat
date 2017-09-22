/* @flow */
import React from 'react';

import { Route, IndexRoute } from 'react-router';

import RootContainer from './container/RootContainer';
import * as RoutingURL from './core/RoutingURL/RoutingURL';

const ActivityDetails = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./container/ActivityContainer').default);
  }, 'activityDetails');
};

const routes = (
  <Route path="/" component={RootContainer} >
    <Route path={RoutingURL.ActivityDetails()} getComponent={ActivityDetails} />
    {/* <Route path="*" getComponent={errorPage} /> */}
  </Route>
);

export default routes;
