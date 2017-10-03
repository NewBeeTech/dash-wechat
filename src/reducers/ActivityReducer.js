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
  isWant: false, // 是否关注
  isSignUp: 0, // 报名状态 1失败 0未支付 1成功 2运营拒绝 3用户取消
  signNum: 0, //同性报名人数
  dashInfo: Immutable.Map({
    // address: '望京',
    // title: '大标题',
    // smallTitle: '小标题',
    // backgroundImg: 'http://dash.oss-cn-beijing.aliyuncs.com/fe/default-banner.jpg',
    // activityTime: '9月20日 16：00-19：00',
    // endTime: '2017-10-01 00:00:00',
    // girlNum: '0',
    // type: '联谊', // 活动类型
    // status: 1, // 类型 0取消  1正常
    // cost: 200, // 花费
    // girlCost: 100,
    // time: 5,
    // boyNum: 2,
    // boy: 0,
    // girl: 0,
    // originatorInfo: Immutable.Map({
    //   originatorName: '王晓丹',
    //   originatorImg: 'http://dash.oss-cn-beijing.aliyuncs.com/fe/default-banner.jpg',
    //   originUserDesc: '报名人描述报名人描述报名人描述报名人描述报名人描述报名人描述报名人描述报名人描述报名人描述',
    //   originUserUd: 1,
    // }),
    // signupPeople: Immutable.List([
    //   Immutable.Map({
    //     touxiang: 'https://img.shaka.hsohealth.com/insurance/diet_banner_4_20170206.png',
    //     name: 'name1',
    //   }),
    //   Immutable.Map({
    //     touxiang: 'https://img.shaka.hsohealth.com/activity/lipid_lowering/banner@3x.png',
    //     name: 'name1',
    //   }),
    //   Immutable.Map({
    //     touxiang: 'https://img.shaka.hsohealth.com/activity/lipid_lowering/banner@3x.png',
    //     name: 'name1',
    //   }),
    // ]),
    // wantToPeople: Immutable.List([
    //   Immutable.Map({
    //     touxiang: 'https://img.shaka.hsohealth.com/insurance/diet_banner_4_20170206.png',
    //     name: 'name1',
    //   }),
    //   Immutable.Map({
    //     touxiang: 'https://img.shaka.hsohealth.com/activity/lipid_lowering/banner@3x.png',
    //     name: 'name1',
    //   }),
    //   Immutable.Map({
    //     touxiang: 'https://img.shaka.hsohealth.com/activity/lipid_lowering/banner@3x.png',
    //     name: 'name1',
    //   })
    // ]),
    // introduce: '活动内容介绍活动内容活动难题荣',
    // tips:'', // 友情提示
    // acvitivityFlow: '', // 活动流程
  }),
});

const getActivityHandler =
new ActionHandler.handleAction(ActivityAction.GET_DASHINFO)
  .success((state: stateType, action: Action) => {
    const data = action.data;
    let dashInfo = {
      id: data.id,
      address: data.address,
      backgroundImg: data.photos,
      activityTime: getActivityTime(data.startTime, data.endTime),
      endTime: data.endTime,
      time: getHaveTime(data.signupStartTime, data.signupEndTime),
      originatorName: data.originatorName,
      originatorImg: data.originUserPortrait,
      boyNum: getPeopleNum(data.sexRate.split(':')[0], data.mCount),
      girlNum: getPeopleNum(data.sexRate.split(':')[1], data.wCount),
      boy: data.sexRate.split(':')[0],
      girl: data.sexRate.split(':')[1],
      title: data.name,
      smallTitle: data.var3,
      type: data.type === 1 ? '联谊' : '',
      status: data.status,
      cost: data.cost,
      girlCost: data.var4,
      signUpInfo: {
        originatorName: data.originUserName,
        originatorImg: data.originUserPortrait,
        originUserDesc: data.originUserDesc,
        originUserUd: data.originUserId,
      },
      introduce: data.desc,
      tips: data.var2, // 友情提示
      acvitivityFlow: data.var1, // 活动流程
      wantToPeople: data.collectUseList.slice(0, 4),
      signupPeople: data.signUseList.slice(0, 4),
    };
    return state.set('dashInfo', Immutable.fromJS(dashInfo))
                .set('isFetching', false);
  });

const getIsWantHandler =
new ActionHandler.handleAction(ActivityAction.CHARGE_WANT);

const getUserForDashDataHandler =
    new ActionHandler.handleAction(ActivityAction.GET_USER_DASH_INFO)
        .success((state: stateType, action: Action) => {
          return state.set('isSignUp', action.data.signup)
                      .set('isWant', Boolean(action.data.collect))
                      .set('signNum', action.data.signNum)
                      .set('isFetching', false);
        });

// 取消报名
const cancelSignUpHandler =
    new ActionHandler.handleAction(ActivityAction.CANCEL_SIGNUP);

export default ActionHandler.handleActions(
  [ getActivityHandler, getIsWantHandler, getUserForDashDataHandler ],
  defaultState,
  /^ActivityReducer\//
);
