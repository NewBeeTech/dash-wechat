/* @flow */
import * as Immutable from 'immutable';
import * as DashListAction from '../actions/DashListAction';
import type { Action } from '../actions/types';
import { redux } from 'amumu';
const ActionHandler = redux.ActionHandler;

type stateType = Immutable.Map< 'isFetching' | 'errMsg' | any, any>;

// defaultState
const defaultState: stateType = Immutable.Map({
  isFetching: false,
  errMsg: '',
  dashData: Immutable.Map({
    dashList: Immutable.List([
       Immutable.Map({
           address: '望京南',
           title: '大标题',
           smallTitle: '小标题',
           backgroundImg: 'https://img.shaka.hsohealth.com/insurance/diet_banner_4_20170206.png',
           activityTime: '9月20日 16：00-19：00',
           time: '5h',
           boyNum: '2',
           girlNum: '0',
           originatorName: 'XXXXX',
           originatorImg: 'https://img.shaka.hsohealth.com/insurance/diet_banner_4_20170206.png',
       }),
       Immutable.Map({
           address: '望京',
           title: '大标题',
           smallTitle: '小标题',
           backgroundImg: 'https://img.shaka.hsohealth.com/insurance/diet_banner_4_20170206.png',
           activityTime: '9月20日 16：00-19：00',
           time: '5h',
           boyNum: '2',
           girlNum: '0',
           originatorName: '',
           originatorImg: 'https://img.shaka.hsohealth.com/activity/lipid_lowering/banner@3x.png',
       }),
    ]),
    carouselImgs: Immutable.List([
      'https://img.shaka.hsohealth.com/insurance/diet_banner_4_20170206.png',
      'https://img.shaka.hsohealth.com/activity/lipid_lowering/banner@3x.png',
      'https://img.shaka.hsohealth.com/insurance/diet_banner_4_20170206.png',
      'https://img.shaka.hsohealth.com/activity/lipid_lowering/banner@3x.png',
    ]),
  }),
});

const getDashListHandler =
new ActionHandler.handleAction(DashListAction.GET_DASHLIST)
  .success((state: stateType, action: Action) => {
    return state.setIn(['dashData', 'dashList'], Immutable.fromJS(action.data))
                .set('isFetching', false);
  });
  
  const getCarouselImgsHandler =
  new ActionHandler.handleAction(DashListAction.GET_CAROUSELIMGS)
    .success((state: stateType, action: Action) => {
      return state.setIn(['dashData', 'carouselImgs'], Immutable.fromJS(action.data))
                  .set('isFetching', false);
    });


export default ActionHandler.handleActions(
  [
    getDashListHandler,
    getCarouselImgsHandler
  ],
  defaultState,
  /^DashListReducer\//
);
