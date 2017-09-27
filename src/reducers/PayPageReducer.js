/* @flow */
import * as Immutable from 'immutable';
import * as PayPageAction from '../actions/PayPageAction';
import type { Action } from '../actions/types';
import { redux } from 'amumu';
const ActionHandler = redux.ActionHandler;

type stateType = Immutable.Map< 'isFetching' | 'errMsg' | any, any>;

// defaultState
const defaultState: stateType = Immutable.Map({
  isFetching: false,
  errMsg: '',
});

const getChargeHandler =
new ActionHandler.handleAction(PayPageAction.GET_CHARGE)
  .success((state: stateType, action: Action) => {
    // return state.setIn('dashInfo', Immutable.fromJS(action.data))
    //             .set('isFetching', false);
  });
  
const payHandler = new ActionHandler.handleAction(PayPageAction.PAY);

export default ActionHandler.handleActions(
  [ getChargeHandler, payHandler ],
  defaultState,
  /^PayPageReducer\//
);
