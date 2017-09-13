import React from 'react';
import { render } from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers/reducers';
// import { syncHistory } from 'react-router-redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { browserHistory, Router, hashHistory } from 'react-router';
import { getOpenId, setOpenId } from './actions/WechatAuthAction';
import { QueryString } from './core/Util';
import * as checkDevice from './common/checkDevice';
import userInfoStorage from './core/UserInfoStorage';
import { setGrowiongIO } from './GrowingIO';

import amumu from 'amumu';
import 'react-infinite-calendar/styles.css';
require('./assets/stylesheets/antd-mobile.css');
// production GrowingIO
// require('./GrowingIO');
// import { asyncGrowingConfig } from './GrowingIO';
// asyncGrowingConfig();

const rootElement = document.getElementById('app');

// Sync dispatched route actions to the history
// const reduxRouterMiddleware = syncHistory(browserHistory);
const createStoreWithMiddleware = applyMiddleware(
  // reduxRouterMiddleware,
  process.env.NODE_ENV === 'development' ? routerMiddleware(hashHistory)
    : routerMiddleware(browserHistory),
  thunkMiddleware
)(createStore);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
  applyMiddleware(
    process.env.NODE_ENV === 'development' ? routerMiddleware(hashHistory)
      : routerMiddleware(browserHistory),
    thunkMiddleware
  )
));
// const store = createStoreWithMiddleware(
//   reducers,
//   window.devToolsExtension ? window.devToolsExtension() : undefined
// );

export const dispatch = store.dispatch;


if (process.env.NODE_ENV !== 'development') {
  if (userInfoStorage.getItem('openId') &&
  new Date().getTime() - userInfoStorage.getItem('curTime') < 7200000) {
    store.dispatch(setOpenId(userInfoStorage.getItem('openId')));
    const cs = {
      userId: userInfoStorage.getItem('userId'),
      isEMRFiled: userInfoStorage.getItem('isEMRFiled'),
      medicalInsuranceType: userInfoStorage.getItem('medicalInsuranceType'),
      gender: userInfoStorage.getItem('gender'),
      hospitalId: userInfoStorage.getItem('hospitalId'),
      maId: userInfoStorage.getItem('maId'),
      doctorStudioId: userInfoStorage.getItem('doctorStudioId'),
      serviceId: userInfoStorage.getItem('serviceId'),
    };
    if (process.env.NODE_ENV === 'production') {
      setGrowiongIO(cs);
    } else if (process.env.NODE_ENV === 'test') {
      setGrowiongIO(cs);
    }
  } else {
    if (checkDevice.isWeChat()) {
      if (QueryString().code) { // url 中有 code 参数，直接请求 openId
        store.dispatch(getOpenId({ code: QueryString().code }));
      } else { // 微信中打开且不带code， 跳转到授权路径
        if (location.pathname === '/activityInfo') {
          location.href = `${process.env.ACTIVITY_INFO_URL}`;
        }
        if (location.pathname === '/payment') {
          location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${process.env.APPID}&redirect_uri=${encodeURIComponent(location.href)}&response_type=code&scope=snsapi_base&connect_redirect=1#wechat_redirect`;
        }
       // TODO:  wrong path
      }
    } else { // 不在微信中打开
      if (location.pathname !== '/activityInfo' && location.pathname !== '/payment' && location.pathname !== '/payment-success' && !QueryString().code) { // 如果不是活动页面要跳转到微信扫码授权页面
       // location.href = `https://open.weixin.qq.com/connect/qrconnect?appid=${process.env.WEBAPPID}&redirect_uri=${encodeURIComponent(location.href)}&response_type=code&scope=snsapi_login#wechat_redirect`;
        location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${process.env.APPID}&redirect_uri=${encodeURIComponent(location.href)}&response_type=code&scope=snsapi_base&connect_redirect=1#wechat_redirect`;
      } else if (location.pathname !== '/activityInfo') {
       // FIX: 换 openId 请求接口
        store.dispatch(getOpenId({ code: QueryString().code }));
      }
    }
  }
}

const history = syncHistoryWithStore(
  process.env.NODE_ENV === 'development' ? hashHistory : browserHistory, store
);

const handleSubscribe = () => {
  amumu.redux.Global.setStore(store.getState());
};

store.subscribe(handleSubscribe);

amumu.redux.Global.setDispatch(store.dispatch);

// reduxRouterMiddleware.listenForReplays(store);

import routes from './routes';

render(
  <Provider store={store} >
    {/* Your root Component */}
    <Router history={history} >
      {routes}
    </Router>
  </Provider>,
  rootElement
);
