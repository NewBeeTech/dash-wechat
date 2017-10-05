/*
 * @flow
 */

import { GET, POSTJSON } from '../core/WS/WSHandler';
import AsyncFetchHandler from '../core/AsyncFetchHandler';
import * as URL from '../core/WS/URL';
import type, { ThunkAction, Dispatch } from './types';
import userInfoStorage from '../core/UserInfoStorage';
import { getUserInfo } from './MineAction';
/**
 * 获取openid
 * @type {String}
 */
export const GET_WX_AUTH2 = 'GET_WX_AUTH2';
type params = {
  code: string,
};
// 微信用户信息授权
export const getWxAuth2 =
(params: params): ThunkAction =>
(dispatch: Dispatch): void => {
  const result: Promise<> = GET(URL.getWxAuth2Path: string, params);
  AsyncFetchHandler(
    GET_WX_AUTH2,
    result,
    dispatch
  );
};


/**
 * 获取we.config
 * @type {String}
 */
export const GET_WECONFIG = 'GET_WECONFIG';
export const getWeConfigDate =
(params: Object): ThunkAction =>
(dispatch: Dispatch): void => {
  const result: Promise<Object> = POSTJSON(URL.getWeConfigPath, params);
  AsyncFetchHandler(
    GET_WECONFIG,
    result,
    dispatch
  );
};
