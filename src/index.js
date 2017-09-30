import React from 'react';
import { render } from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers/reducers';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { browserHistory, Router, hashHistory } from 'react-router';
import { getWxAuth2 } from './actions/WechatAuthAction';
import { QueryString } from './core/Util';
import userInfoStorage from './core/UserInfoStorage';

import amumu from 'amumu';
const rootElement = document.getElementById('app');

const createStoreWithMiddleware = applyMiddleware(
  routerMiddleware(hashHistory),
  thunkMiddleware
)(createStore);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
  applyMiddleware(
    routerMiddleware(hashHistory),
    thunkMiddleware
  )
));

export const dispatch = store.dispatch;

if (process.env.NODE_ENV !== 'development') {
  if (QueryString().code) { // url 中有 code 参数，将用户信息存取session
    store.dispatch(getWxAuth2({ code: QueryString().code }));
  } else { // 微信中打开且不带code， 跳转到授权路径
    // if (location.pathname === '/payment') {
    //   location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${process.env.APPID}&redirect_uri=${encodeURIComponent(location.href)}&response_type=code&scope=snsapi_base&connect_redirect=1#wechat_redirect`;
    // }
   // TODO:  wrong path
  }
}

const history = syncHistoryWithStore(
  hashHistory, store
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
