/*
 * @flow
 */

import { GET } from '../core/WS/WSHandler';
import AsyncFetchHandler from '../core/AsyncFetchHandler';
import * as URL from '../core/WS/URL';
import { Toast } from 'antd-mobile';

/**
 * 活动详情
 * @type {String}
 */
export const GET_DASHINFO: string = 'GET_DASHINFO';
export const getDashInfoData: Dispatch = (params): ThunkAction =>
(dispatch: Dispatch): void => {
  AsyncFetchHandler(
    GET_DASHINFO,
    GET(URL.getDashInfoPath: string, params: Object),
    dispatch
  );
};

/**
 * 关注或取消关注
 * @type {String}
 */
 export const CHARGE_WANT: string = 'CHARGE_WANT';
 export const chargeIsWant: Dispatch = (params): ThunkAction =>
 (dispatch: Dispatch): void => {
   const result: Promise<> = GET(URL.chargeIsWantPath: string, params: Object);
   result.then(data => {
     if (data.code === '001') {
       dispatch(getUserForDashData({activityId: params.activityId}));
     } else {
       Toast.info(data.message);
     }
   });
   AsyncFetchHandler(CHARGE_WANT, result, dispatch);
 };

 /**
  * 获取用户在该活动的信息
  * @type {String}
  */
  export const GET_USER_DASH_INFO: string = 'GET_USER_DASH_INFO';
  export const getUserForDashData: Dispatch = (params): ThunkAction =>
  (dispatch: Dispatch): void => {
    AsyncFetchHandler(
      GET_USER_DASH_INFO,
      GET(URL.getUserForDashDataPath: string, params: Object),
      dispatch
    );
  };

  /**
   * 取消报名
   * @type {String}
   */
   export const CANCEL_SIGNUP: string = 'CANCEL_SIGNUP';
   export const cancelSignUp: Dispatch = (params): ThunkAction =>
   (dispatch: Dispatch): void => {
     const result: Promise<> = GET(URL.cancelSignUpPath: string, params: Object);
     result.then(data => {
       if (data.code === '001') {
         dispatch(getUserForDashData({activityId: params.activityId}));
       } else {
         Toast.info(data.message);
       }
     });
     AsyncFetchHandler(CANCEL_SIGNUP, result, dispatch);
   };
