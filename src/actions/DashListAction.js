/*
 * @flow
 */

import { GET } from '../core/WS/WSHandler';
import AsyncFetchHandler from '../core/AsyncFetchHandler';
import * as URL from '../core/WS/URL';
import type { ThunkAction, Dispatch } from './types';

/**
 * 活动列表
 * @type {String}
 */
export const GET_DASHLIST: string = 'GET_DASHLIST';
export const getDashListData: Dispatch =
(params: {openid: ?string}): ThunkAction =>
(dispatch: Dispatch): void => {
  AsyncFetchHandler(
    GET_DASHLIST,
    GET(URL.getDashListPath: string, params: Object),
    dispatch
  );
};

/**
 * 轮播图列表
 * @type {String}
 */
 export const GET_CAROUSELIMGS: string = 'GET_CAROUSELIMGS';
 export const getCarouselImgsData: Dispatch =
 (params): ThunkAction =>
 (dispatch: Dispatch): void => {
   AsyncFetchHandler(
     GET_CAROUSELIMGS,
     GET(URL.getCarouselImgsPath: string, params: Object),
     dispatch
   );
 };
