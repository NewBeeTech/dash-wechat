/*
 * @flow
 */

import { GET } from '../core/WS/WSHandler';
import AsyncFetchHandler from '../core/AsyncFetchHandler';
import * as URL from '../core/WS/URL';
import type, { ThunkAction, Dispatch } from './types';
// production GrowingIO
// import { setGrowiongIO } from '../GrowingIO';
import userInfoStorage from '../core/UserInfoStorage';

/**
 * 获取openid
 * @type {String}
 */
export const GET_OPENID = 'GET_OPENID';
type
getOpenIdParamsType = {
  code: string,
};
// 获取openId
export const getOpenId =
(params: getOpenIdParamsType): ThunkAction =>
(dispatch: Dispatch): void => {
  const result: Promise<> = GET(URL.getOpenIdPath(params.code));
  // production GrowiongIO
  result.then(data => {
    if (data && data.openid) {
      userInfoStorage.setItem('openId', data.openid);
      const result: Promise<> = GET(URL.csPath, { openId: data.openid });
      result.then(csdata => {
        userInfoStorage.setItem('userId', csdata.data.userId);
        userInfoStorage.setItem('isEMRFiled', csdata.data.emr ? true : false);
        userInfoStorage.setItem('medicalInsuranceType', csdata.data.emr && csdata.data.emr.medicalInsuranceType);
        userInfoStorage.setItem('gender', csdata.data.emr && csdata.data.emr.gender);
        userInfoStorage.setItem('hospitalId', csdata.data.hospitalId);
        userInfoStorage.setItem('maId', csdata.data.maId);
        userInfoStorage.setItem('doctorStudioId', csdata.data.doctorStudioId);
        userInfoStorage.setItem('serviceId', csdata.data.serviceId);
        const cs = {
          userId: csdata.data.userId,
          isEMRFiled: (csdata.data.emr ? true : false),
          medicalInsuranceType: csdata.data.emr && csdata.data.emr.medicalInsuranceType,
          gender: csdata.data.emr && csdata.data.emr.gender,
          hospitalId: csdata.data.hospitalId,
          maId: csdata.data.maId,
          doctorStudioId: csdata.data.doctorStudioId,
          serviceId: csdata.data.serviceId,
        };
        if (process.env.NODE_ENV === 'production') {
          // setGrowiongIO(cs);
        } else if (process.env.NODE_ENV === 'test' && true) {
          // false 关闭圈选  true 打开圈选
          // setGrowiongIO(cs);
        }
      });
    }
  });
  AsyncFetchHandler(
    GET_OPENID,
    result,
    dispatch
  );
};

export const GET_USERINFO = 'GET_USERINFO';
export const getUserInfo = (params:Object):ThunkAction => (dispatch:Dispatch):void => {
  const result:Promise<> = GET(URL.getUserInfoPath, params);
  AsyncFetchHandler(GET_USERINFO, result, dispatch);
};

// 将localstorage中的openid设置给reducer中的openid
export const SET_OPENID = 'SET_OPENID';
export const setOpenId = (openid: string) => ({
  type: SET_OPENID,
  openid,
});
