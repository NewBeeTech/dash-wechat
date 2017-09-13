/* @flow */

import { redux } from 'amumu';
import * as Immutable from 'immutable';
import * as WechatAuthAction from '../actions/WechatAuthAction';
import type { Action } from '../actions/types';
const ActionHandler = redux.ActionHandler;

type stateType = Immutable.Map< 'isFetching' | 'errMsg' | any | 'userInfo', any>;

const defaultState = Immutable.Map({
  isFetching: false,
  errMsg: '',
  openid: '',
});

const getOpenIdHandler = new ActionHandler.handleAction(WechatAuthAction.GET_OPENID)
  .success((state: stateType, action: Action) => {
    // console.log('state', state.toJS());
    // console.log('succcess', action);
    // console.log('after sate', state.set('openid', action.data.openid).toJS());
    return state.set('openid', action.data.openid);
  }).failure((state: stateType, action) => {
    console.log('failure', action);
    return state.set('openid', '');
  });

export default ActionHandler.handleActions(
  [getOpenIdHandler],
  defaultState,
  /^UserReducer\//,
);
