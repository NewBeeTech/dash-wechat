/* @flow */

import { redux } from 'amumu';
import * as Immutable from 'immutable';
import * as WechatAuthAction from '../actions/WechatAuthAction';
import type { Action } from '../actions/types';
const ActionHandler = redux.ActionHandler;

type stateType = Immutable.Map< 'isFetching' | 'errMsg' | any | 'userInfo', any>;

const defaultState: stateType = Immutable.Map({
  isFetching: false,
  errMsg: '',
  timestamp: '',
  nonceStr: '',
  signature: '',
});

const getWeConfigDateHandler = new ActionHandler.handleAction(WechatAuthAction.GET_WECONFIG)
  .success((state: stateType, action) => {
    return state
    .set('timestamp', action.data.timestamp)
    .set('nonceStr', action.data.nonceStr)
    .set('signature', action.data.signature)
    .set('isFetching', false);
  });


export default ActionHandler.handleActions(
  [getWeConfigDateHandler],
  defaultState,
  /^UserReducer\//,
);
