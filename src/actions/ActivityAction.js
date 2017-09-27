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
