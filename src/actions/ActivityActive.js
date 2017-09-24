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
export const getDashInfoData: Dispatch =
(params: {openid: ?string}): ThunkAction =>
(dispatch: Dispatch): void => {
  AsyncFetchHandler(
    GET_DASHINFO,
    GET(URL.getDashInfoPath: string, params: Object),
    dispatch
  );
};
