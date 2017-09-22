/* @flow */
import * as Immutable from 'immutable';
import * as MineAction from '../actions/MineAction';
import type { Action } from '../actions/types';
import { redux } from 'amumu';
const ActionHandler = redux.ActionHandler;

type stateType = Immutable.Map< 'isFetching' | 'errMsg' | any, any>;

// defaultState
const defaultState: stateType = Immutable.Map({
  isFetching: false,
  errMsg: '',
  index: 0,
  userData: Immutable.Map({
    userInfo:Immutable.Map({
      id: 1,
      activityCount: 1, // 参加活动次数哦
      age: 24,
      birth: '1991-03-30',
      certNo: '370702199192938475', // 证件号
      certType: '1', // 证件类型
      city: '北京',
      createTime: '', // ?
      creditCount: 100, // 信用分
      desc: '高富帅', // 个人描述
      email: '',
      income: 1, //收入 枚举
      likeCount: 10, // 被赞次数
      mark: 2, // mark值
      nickName: '小可爱',
      openId: '',
      phone: '',
      photos: 'https://img.shaka.hsohealth.com/insurance/diet_banner_4_20170206.png,https://img.shaka.hsohealth.com/activity/lipid_lowering/banner@3x.png', //用户上传的图片 多个用逗号隔开
      portrait: 'a.jpg', // 头像
      profession: '天皇巨星',
      province: '山西', // 省
      sex: 0, // 0未知 1男 2女
      status: 1, //用户状态 0冻结 1正常
      tags: '完美,专一',
      type: 2, // 用户类型 1普通用户 2vip
      updateTime: '',
      userName: '', // 用户名
      wxAccount: '', // 微信账号
      wxName: 'deerW', // 微信名称
      wxPortrait: '', // 微信头像
    }),
    activityInfo: Immutable.Map({
      todoDash: Immutable.List([
        Immutable.Map({
          img: 'https://img.shaka.hsohealth.com/activity/lipid_lowering/banner@3x.png',
          title: '此处是活动标题！',
          time: '2017.10.12 19:23:34',
          status: 1, // 0取消 1正常
        }),
        Immutable.Map({
          img: 'https://img.shaka.hsohealth.com/activity/lipid_lowering/banner@3x.png',
          title: '此处是活动标题！',
          time: '2017.10.12 19:23:34',
          status: 1, // 0取消 1正常
        }),
      ]),
      wantToDash: Immutable.List([
        Immutable.Map({
          img: 'https://img.shaka.hsohealth.com/activity/lipid_lowering/banner@3x.png',
          title: '此处是活动标题！',
          time: '2017.10.12 19:23:34',
          status: null, // 0取消 1正常
        }),
      ]),
      historyDash:Immutable.List([
        Immutable.Map({
          img: 'https://img.shaka.hsohealth.com/activity/lipid_lowering/banner@3x.png',
          title: '此处是活动标题！',
          time: '2017.10.12 19:23:34',
          status: 0, // 0取消 1正常
        }),
      ]),
    }),
  }),
});

const getUserInfoHandler =
new ActionHandler.handleAction(MineAction.GET_USER_INFO)
  .success((state: stateType, action: Action) => {
    return state.setIn(['userData', 'userInfo'], Immutable.fromJS(action.data))
                .set('isFetching', false);
  });

  const getUserActivityInfoHandler =
  new ActionHandler.handleAction(MineAction.GET_USER_ACTIVITY_DATA)
    .success((state: stateType, action: Action) => {
      return state.setIn(['userData', 'activityInfo'], Immutable.fromJS(action.data))
                  .set('isFetching', false);
    });


export default ActionHandler.handleActions(
  [
    getUserInfoHandler,
    getUserActivityInfoHandler,
  ],
  defaultState,
  /^DashListReducer\//
);
