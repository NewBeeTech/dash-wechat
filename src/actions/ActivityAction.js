/*
 * @flow
 */

import { GET } from '../core/WS/WSHandler';
import AsyncFetchHandler from '../core/AsyncFetchHandler';
import * as URL from '../core/WS/URL';

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
   AsyncFetchHandler(
     CHARGE_WANT,
     GET(URL.chargeIsWantPath: string, params: Object),
     dispatch
   );
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
   export const CANCEL_SGINUP: string = 'CANCEL_SGINUP';
   export const cancelSginUp: Dispatch = (params): ThunkAction =>
   (dispatch: Dispatch): void => {
     AsyncFetchHandler(
       CANCEL_SGINUP,
       GET(URL.cancelSginUpPath: string, params: Object),
       dispatch
     );
   };
