/*
 * @flow
 */

import { GET } from '../core/WS/WSHandler';
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
  // result.then(data => {
  //   console.log(data);
  //   if (data.code === '009' || data.code === '001' ) {
  //     // dispatch(getUserInfo());
  //   }
  // });
  AsyncFetchHandler(
    GET_WX_AUTH2,
    result,
    dispatch
  );
};
