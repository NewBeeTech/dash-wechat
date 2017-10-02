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
  checkCode: '',
  tags: Immutable.List([]),
  userData: Immutable.Map({
    userInfo:Immutable.Map({
      id: '',
      activityCount: '', // 参加活动次数哦
      age: '',
      birth: '',
      certNo: '', // 证件号
      certType: '', // 证件类型
      city: '',
      createTime: '', // ?
      creditCount: 100, // 信用分
      desc: '', // 个人描述
      email: '',
      income: , //收入 枚举
      likeCount: '', // 被赞次数
      mark: '', // mark值
      nickName: '',
      openId: '',
      phone: '',
      photos: '', //用户上传的图片 多个用逗号隔开
      portrait: '', // 头像
      profession: '',
      position: '',
      province: '', // 家乡
      sex: 0, // 0未知 1男 2女
      status: 1, //用户状态 0冻结 1正常
      tags: '',
      type: 1, // 用户类型 1普通用户 2vip
      updateTime: '',
      userName: '', // 用户名
      wxAccount: '', // 微信账号
      wxName: '', // 微信名称
      wxPortrait: '', // 微信头像
      var2: '', // 身高
      var3: '', // 家乡
      var4: '', // 吸引异性的特质
    }),
    activityInfo: Immutable.Map({
      myDash: Immutable.List([
        // Immutable.Map({
        //   activityId: 1,
        //   activityName: '此处是活动标题！',
        //   photos: 'http://img02.tooopen.com/images/20160509/tooopen_sy_161967094653.jpg',
        //   address: '望京',
        //   startTime: '2017.04.12 19:23:34',
        //   endTime: '2017.04.12 21:23:34',
        //   status: 1, // -1报名失败 0未付款 1报名成功 2运营拒绝 3取消
        //   id: 1002,
        //   otherUserList: Immutable.fromJS([
        //     [1, "哈哈", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmTZ26a1g35R615Q8thAK968JNBrm1XgaU_Cek9hywcWg7Pk0l"],
        //     [2, "哈哈", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmTZ26a1g35R615Q8thAK968JNBrm1XgaU_Cek9hywcWg7Pk0l"],
        //     [3, "哈哈", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmTZ26a1g35R615Q8thAK968JNBrm1XgaU_Cek9hywcWg7Pk0l"],
        //   ])
        // }),
        // Immutable.Map({
        //   activityId: 2,
        //   activityName: '此处是活动标题！',
        //   photos: 'http://img02.tooopen.com/images/20160509/tooopen_sy_161967094653.jpg',
        //   address: '东直门',
        //   startTime: '2017.10.19 18:00:00',
        //   endTime: '2017.10.19 21:00:00',
        //   status: 2,
        //   userId: 1002,
        // }),
        // Immutable.Map({
        //   activityId: 3,
        //   activityName: '此处是活动标题！',
        //   photos: 'http://img02.tooopen.com/images/20160509/tooopen_sy_161967094653.jpg',
        //   address: '望京',
        //   startTime: '2017.10.12 19:23:34',
        //   endTime: '2017.10.12 21:23:34',
        //   status: 1,
        //   userId: 1002,
        // }),
        // Immutable.Map({
        //   activityId: 4,
        //   activityName: '此处是活动标题！',
        //   photos: 'http://img02.tooopen.com/images/20160509/tooopen_sy_161967094653.jpg',
        //   address: '望京',
        //   startTime: '2017.02.12 19:23:34',
        //   endTime: '2017.02.12 21:23:34',
        //   status: 3,
        //   userId: 1002,
        // }),
      ]),
      wantToDash: Immutable.List([
        // Immutable.Map({
        //   activityId: 1,
        //   activityName: '此处是活动标题！',
        //   photos: 'http://img02.tooopen.com/images/20160509/tooopen_sy_161967094653.jpg',
        //   address: '望京',
        //   startTime: '2017.02.12 19:23:34',
        //   endTime: '2017.02.12 21:23:34',
        //   status: 1, // 0取消 1正常
        //   user_id: 1002,
        // }),
      ]),
    }),
  }),
});

const getUserInfoHandler =
new ActionHandler.handleAction(MineAction.GET_USER_INFO)
  .success((state: stateType, action: Action) => {
    return state.setIn(['userData', 'userInfo'], Immutable.fromJS(action.data))
                .setIn(['userData', 'userInfo', 'photos'], Immutable.fromJS(action.data.photos) || '')
                .setIn(['userData', 'userInfo', 'tags'], Immutable.fromJS(action.data.tags) || '')
                .setIn(['userData', 'userInfo', 'birth'], Immutable.fromJS(action.data.birth) || '')
                .set('isFetching', false);
  });
const updateUserInfoHandler =
new ActionHandler.handleAction(MineAction.UPDATE_USER_INFO)
  .success((state: stateType, action: Action) => {
    return state.set('isFetching', false);
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
      return state.setIn(['userData', 'activityInfo', 'wantToDash'], Immutable.fromJS(action.data.list))
                  .set('isFetching', false);
    });
  const getMoreTagsHandler =
  new ActionHandler.handleAction(MineAction.GET_MORE_TAGS)
    .success((state: stateType, action: Action) => {
      return state.setIn(['tags'], Immutable.fromJS(action.data))
                  .set('isFetching', false);
    });
  const getMBCodeHandler =
  new ActionHandler.handleAction(MineAction.GET_MB_CODE)
    .success((state: stateType, action: Action) => {
      return state.set('isFetching', false);
    });
  const checkMBCodeHandler =
  new ActionHandler.handleAction(MineAction.GET_MB_CODE)
    .success((state: stateType, action: Action) => {
      return state.setIn(['checkCode'], Immutable.fromJS(action.data))
                  .set('isFetching', false);
    });


export default ActionHandler.handleActions(
  [
    getUserInfoHandler,
    updateUserInfoHandler,
    getUserActivityInfoHandler,
    getLikeActivityInfoHandler,
    getMoreTagsHandler,
    getMBCodeHandler,
    checkMBCodeHandler,
  ],
  defaultState,
  /^DashListReducer\//
);
