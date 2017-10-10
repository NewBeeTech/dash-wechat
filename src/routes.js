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

const PayPage = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./container/PayPage').default);
  }, 'PayPage');
}

const Mine = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./container/MineContainer').default);
  }, 'mine');
}
const UserInfo = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./container/UserInfoContainer').default);
  }, 'userInfo');
}
const PaySuccessPage = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./container/PaySuccessPage').default);
  }, 'paySuccess');
}

const routes = (
  <Route path="/" component={RootContainer} >
    {/* <Route path="/mine" component={RootContainer} /> */}
    <Route path={RoutingURL.ActivityDetails(':activityId', ':type')} getComponent={ActivityDetails} />
    <Route path={RoutingURL.DashList()} getComponent={DashList} />
    <Route path={RoutingURL.PayPage()} getComponent={PayPage} />
    <Route path={RoutingURL.Mine()} getComponent={Mine} />
    <Route path={RoutingURL.UserInfo('(/:tab)')} getComponent={UserInfo} />
    <Route path='/paySuccess' getComponent={PaySuccessPage} />
  </Route>
);

export default routes;
