/* @flow */
import * as Immutable from 'immutable';
import * as ActivityAction from '../actions/ActivityAction';
import type { Action } from '../actions/types';
import { redux } from 'amumu';
const ActionHandler = redux.ActionHandler;
import { getActivityTime, getHaveTime } from '../core/CommonFun/moment';
const getPeopleNum = (sexRate, num) => {
  return sexRate - num;
}

type stateType = Immutable.Map< 'isFetching' | 'errMsg' | any, any>;

// defaultState
const defaultState: stateType = Immutable.Map({
  isFetching: false,
  errMsg: '',
  index: 0,
  isWant: false,
  isSignUp: true,
  dashInfo: Immutable.Map({
    address: '望京',
    title: '大标题',
    smallTitle: '小标题',
    backgroundImg: '../assets/images/default-banner.jpg',
    activityTime: '9月20日 16：00-19：00',
    girlNum: '0',
    type: '联谊', // 活动类型
    status: 1, // 类型 0取消  1正常
    cost: 100, // 花费 ?
    time: 5,
    boyNum: 2,
    originatorInfo: Immutable.Map({
      originatorName: '王晓丹',
      originatorImg: '../assets/images/default-banner.jpg',
      originUserDesc: '报名人描述报名人描述报名人描述报名人描述报名人描述报名人描述报名人描述报名人描述报名人描述',
      originUserUd: 1,
    }),
    signupPeople: Immutable.List([
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
      }),
    ]),
    wantToPeople: Immutable.List([
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
    introduce: '活动内容介绍活动内容活动难题荣',
    tips:'', // 友情提示
    acvitivityFlow: '', // 活动流程
  }),
});

const getActivityHandler =
new ActionHandler.handleAction(ActivityAction.GET_DASHINFO)
  .success((state: stateType, action: Action) => {
    const dashList = [];
    if(action.data.length) {
      const data = action.data;
      dashList.push({
        id: data.id,
        address: data.address,
        backgroundImg: data.photos,
        activityTime: getActivityTime(data.startTime, data.endTime),
        time: getHaveTime(data.signupStartTime, data.signupEndTime),
        originatorName: data.originatorName,
        originatorImg: data.originUserPortrait,
        boyNum: getPeopleNum(data.sexRate.split(':')[0], item.mCount),
        girlNum: getPeopleNum(data.sexRate.split(':')[1], item.wCount),
        title: data.name,
        type: data.type === 1 ? '联谊' : '',
        status: data.status,
        cost: data.cost,
        signUpInfo: {
          originatorName: data.originUserName,
          originatorImg: data.originUserPortrait,
          originUserDesc: data.originUserDesc,
          originUserUd: data.originUserUd,
        },
      });
    }
    return state.setIn('dashInfo', Immutable.fromJS(action.data))
                .set('isFetching', false);
  });
  
const getIsWantHandler =
new ActionHandler.handleAction(ActivityAction.CHARGE_WANT)
    .success((state: stateType, action: Action) => {
      return state.set('isWant', Immutable.fromJS(action.data))
                  .set('isFetching', false);
    });

export default ActionHandler.handleActions(
  [ getActivityHandler, getIsWantHandler ],
  defaultState,
  /^ActivityReducer\//
);
