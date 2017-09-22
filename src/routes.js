/* @flow */
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import RootContainer from './container/RootContainer';
import * as RoutingURL from './core/RoutingURL/RoutingURL';

const ActivityDetails = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./container/ActivityContainer').default);
  }, 'activityDetails');
}

const DashList = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./container/DashList').default);
  }, 'DashList');
}

const ListContainer = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./container/ListContainer').default);
  }, 'ListContainer');
}

const PayPage = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./container/PayPage').default);
  }, 'PayPage');
}

const routes = (
  <Route path="/" component={RootContainer} >
    <Route path={RoutingURL.ActivityDetails()} getComponent={ActivityDetails} />
    <Route path={RoutingURL.DashList()} getComponent={DashList} />
    <Route path={RoutingURL.PayPage()} getComponent={PayPage} />
  </Route>
);

export default routes;
