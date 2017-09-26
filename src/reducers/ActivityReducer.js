/* @flow */
import * as Immutable from 'immutable';
import * as ActivityAction from '../actions/ActivityAction';
import type { Action } from '../actions/types';
import { redux } from 'amumu';
const ActionHandler = redux.ActionHandler;

type stateType = Immutable.Map< 'isFetching' | 'errMsg' | any, any>;

// defaultState
const defaultState: stateType = Immutable.Map({
  isFetching: false,
  errMsg: '',
  index: 0,
  isWant: false,
  dashInfo: Immutable.Map({
    address: '望京',
    title: '大标题',
    smallTitle: '小标题',
    backgroundImg: 'https://img.shaka.hsohealth.com/insurance/diet_banner_4_20170206.png',
    activityTime: '9月20日 16：00-19：00',
    girlNum: '0',
    type: '联谊', // 活动类型
    status: 1, // 类型 0取消  1正常
    cost: 100, // 花费
    signUpInfo: Immutable.Map({
      time: '5h',
      boyNum: '2',
      originatorName: '王晓丹',
      originatorImg: 'https://img.shaka.hsohealth.com/insurance/diet_banner_4_20170206.png',
      zhiye: '23213',
      shengri: '1997年8月3日',
      xinxi: '179cm/57kg',
    }),
    baomingrenshu: Immutable.List([
      Immutable.Map({
        touxiang: 'https://img.shaka.hsohealth.com/insurance/diet_banner_4_20170206.png',
        name: 'name1',
      }),
      Immutable.Map({
        touxiang: 'https://img.shaka.hsohealth.com/activity/lipid_lowering/banner@3x.png',
        name: 'name1',
      }),
      Immutable.Map({
        touxiang: 'https://img.shaka.hsohealth.com/activity/lipid_lowering/banner@3x.png',
        name: 'name1',
      })
    ]),
    neirong: '活动内容活动内容活动难题荣',
  }),
});

const getActivityHandler =
new ActionHandler.handleAction(ActivityAction.GET_DASHINFO)
  .success((state: stateType, action: Action) => {
    return state.setIn('dashInfo', Immutable.fromJS(action.data))
                .set('isFetching', false);
  });
  
const getIsWantHandler =
new ActionHandler.handleAction(ActivityAction.GET_DASHINFO)
    .success((state: stateType, action: Action) => {
      return state.setIn('dashInfo', Immutable.fromJS(action.data))
                  .set('isFetching', false);
    });

export default ActionHandler.handleActions(
  [ getActivityHandler, getIsWantHandler ],
  defaultState,
  /^ActivityReducer\//
);
