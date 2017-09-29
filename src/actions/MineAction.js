/*
 * @flow
 */

import { GET, POSTJSON } from '../core/WS/WSHandler';
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
 * 更新用户信息
 * @type {String}
 */
export const UPDATE_USER_INFO: string = 'UPDATE_USER_INFO';
export const updateUserInfo: Dispatch =
(params: {openid: ?string}): ThunkAction =>
(dispatch: Dispatch): void => {
  AsyncFetchHandler(
    UPDATE_USER_INFO,
    GET(URL.updateUserInfoPath: string, params: Object),
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

/**
 * 换一批标签
 * @type {String}
 */
export const GET_MORE_TAGS: string = 'GET_MORE_TAGS';
export const getMoreTags: Dispatch =
(params: {count: ?number}): ThunkAction =>
(dispatch: Dispatch): void => {
  AsyncFetchHandler(
    GET_MORE_TAGS,
    POSTJSON(URL.getMoreTagsPath: string, params: Object),
    dispatch
  );
};

/**
 * 生成短信验证码
 * @type {String}
 */
export const GET_MB_CODE: string = 'GET_MB_CODE';
export const getMbCode: Dispatch =
(params: {openid: ?string}): ThunkAction =>
(dispatch: Dispatch): void => {
  AsyncFetchHandler(
    GET_MB_CODE,
    POSTJSON(URL.getMbCodePath: string, params: Object),
    dispatch
  );
};
/**
 * 验证短信验证码
 * @type {String}
 */
export const CHECK_MB_CODE: string = 'CHECK_MB_CODE';
export const checkMbCode: Dispatch =
(params: {openid: ?string}): ThunkAction =>
(dispatch: Dispatch): void => {
  AsyncFetchHandler(
    CHECK_MB_CODE,
    POSTJSON(URL.checkMbCodePath: string, params: Object),
    dispatch
  );
};
/**
 * 投票给喜欢的异性
 * @type {String}
 */
export const LIKE_U: string = 'LIKE_U';
export const likeU: Dispatch =
(params: {openid: ?string}): ThunkAction =>
(dispatch: Dispatch): void => {
  AsyncFetchHandler(
    LIKE_U,
    POSTJSON(URL.likeUPath: string, params: Object),
    dispatch
  );
};
