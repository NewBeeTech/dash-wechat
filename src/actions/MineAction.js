/*
 * @flow
 */

import { GET } from '../core/WS/WSHandler';
import AsyncFetchHandler from '../core/AsyncFetchHandler';
import * as URL from '../core/WS/URL';
import type { ThunkAction, Dispatch } from './types';

/**
 * 获取用户信息
 * @type {String}
 */
export const GET_USER_INFO: string = 'GET_USER_INFO';
export const getUserInfo: Dispatch =
(params: {openid: ?string}): ThunkAction =>
(dispatch: Dispatch): void => {
  AsyncFetchHandler(
    GET_USER_INFO,
    GET(URL.getUserInfoPath: string, params: Object),
    dispatch
  );
};
/**
 * 获取我的活动信息
 * @type {String}
 */
export const GET_USER_ACTIVITY_DATA: string = 'GET_USER_ACTIVITY_DATA';
export const getUserActivityData: Dispatch =
(params: {openid: ?string}): ThunkAction =>
(dispatch: Dispatch): void => {
  AsyncFetchHandler(
    GET_USER_ACTIVITY_DATA,
    GET(URL.getUserActivityDataPath: string, params: Object),
    dispatch
  );
};

/**
 * 获取用户想去的联谊
 * @type {String}
 */
export const GET_LIKE_ACTIVITY_DATA: string = 'GET_LIKE_ACTIVITY_DATA';
export const getLikeActivityData: Dispatch =
(params: {openid: ?string}): ThunkAction =>
(dispatch: Dispatch): void => {
  AsyncFetchHandler(
    GET_LIKE_ACTIVITY_DATA,
    GET(URL.getLikeActivityDataPath: string, params: Object),
    dispatch
  );
};
