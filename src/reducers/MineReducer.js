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
  tags: '高大,多斤,温柔,善良,爱狗人士,花心,大萝卜,体贴,暖男',
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
      phone: '18617621252',
      photos: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmTZ26a1g35R615Q8thAK968JNBrm1XgaU_Cek9hywcWg7Pk0l,https://img.shaka.hsohealth.com/activity/lipid_lowering/banner@3x.png', //用户上传的图片 多个用逗号隔开
      portrait: 'a.jpg', // 头像
      profession: '天皇巨星',
      province: '山西', // 省
      sex: 0, // 0未知 1男 2女
      status: 1, //用户状态 0冻结 1正常
      tags: '完美,专一,爱做家务,爱烧菜,拒绝黄赌毒',
      type: 2, // 用户类型 1普通用户 2vip
      updateTime: '',
      userName: '', // 用户名
      wxAccount: '', // 微信账号
      wxName: 'deerW', // 微信名称
      wxPortrait: '', // 微信头像
    }),
    activityInfo: Immutable.Map({
      myDash: Immutable.List([
        Immutable.Map({
          activityId: 1,
          activityName: '此处是活动标题！',
          photos: 'http://img02.tooopen.com/images/20160509/tooopen_sy_161967094653.jpg',
          address: '望京',
          startTime: '2017.04.12 19:23:34',
          endTime: '2017.04.12 21:23:34',
          status: 1, // 0取消 1正常
          userId: 1002,
          member: Immutable.List([
            Immutable.Map({
              userId: 1001,
              wxName: '小可爱',
              wxPortrait: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmTZ26a1g35R615Q8thAK968JNBrm1XgaU_Cek9hywcWg7Pk0l',
            }),
            Immutable.Map({
              userId: 1002,
              wxName: '小霸道小霸道小霸道',
              wxPortrait: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmTZ26a1g35R615Q8thAK968JNBrm1XgaU_Cek9hywcWg7Pk0l',
            }),
            Immutable.Map({
              userId: 1003,
              wxName: '小清新',
              wxPortrait: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmTZ26a1g35R615Q8thAK968JNBrm1XgaU_Cek9hywcWg7Pk0l',
            }),
          ])
        }),
        Immutable.Map({
          activityId: 2,
          activityName: '此处是活动标题！',
          photos: 'http://img02.tooopen.com/images/20160509/tooopen_sy_161967094653.jpg',
          address: '望京',
          startTime: '2017.10.12 19:23:34',
          endTime: '2017.10.12 21:23:34',
          status: 0, // 0取消 1正常
          userId: 1002,
        }),
        Immutable.Map({
          activityId: 3,
          activityName: '此处是活动标题！',
          photos: 'http://img02.tooopen.com/images/20160509/tooopen_sy_161967094653.jpg',
          address: '望京',
          startTime: '2017.10.12 19:23:34',
          endTime: '2017.10.12 21:23:34',
          status: 1, // 0取消 1正常
          userId: 1002,
        }),
        Immutable.Map({
          activityId: 4,
          activityName: '此处是活动标题！',
          photos: 'http://img02.tooopen.com/images/20160509/tooopen_sy_161967094653.jpg',
          address: '望京',
          startTime: '2017.02.12 19:23:34',
          endTime: '2017.02.12 21:23:34',
          status: 0, // 0取消 1正常
          userId: 1002,
        }),
      ]),
      wantToDash: Immutable.List([
        Immutable.Map({
          activityId: 1,
          activityName: '此处是活动标题！',
          photos: 'http://img02.tooopen.com/images/20160509/tooopen_sy_161967094653.jpg',
          address: '望京',
          startTime: '2017.02.12 19:23:34',
          endTime: '2017.02.12 21:23:34',
          status: null, // 0取消 1正常
          user_id: 1002,
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
      return state.setIn(['userData', 'activityInfo', 'myDash'], Immutable.fromJS(action.data))
                  .set('isFetching', false);
    });
  const getLikeActivityInfoHandler =
  new ActionHandler.handleAction(MineAction.GET_LIKE_ACTIVITY_DATA)
    .success((state: stateType, action: Action) => {
      return state.setIn(['userData', 'activityInfo', 'wantToDash'], Immutable.fromJS(action.data))
                  .set('isFetching', false);
    });
  const getMoreTagsHandler =
  new ActionHandler.handleAction(MineAction.GET_MORE_TAGS)
    .success((state: stateType, action: Action) => {
      return state.setIn(['tags'], Immutable.fromJS(action.data))
                  .set('isFetching', false);
    });


export default ActionHandler.handleActions(
  [
    getUserInfoHandler,
    getUserActivityInfoHandler,
    getLikeActivityInfoHandler,
    getMoreTagsHandler,
  ],
  defaultState,
  /^DashListReducer\//
);
