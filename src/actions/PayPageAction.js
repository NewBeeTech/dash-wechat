/*
 * @flow
 */

import { GET } from '../core/WS/WSHandler';
import AsyncFetchHandler from '../core/AsyncFetchHandler';
import * as URL from '../core/WS/URL';
import pingpp from 'pingpp-js';
import * as RoutingURL from '../core/RoutingURL/RoutingURL';
import { push } from 'react-router-redux';
import { Toast } from 'antd-mobile';

export const pay = (params: paymentParms): ThunkAction =>
(dispatch: Dispatch): void => {
  dispatch({ type: 'PAY_REQUEST' });
  const reponse = GET(URL.payPath, params);
  reponse.then(data => {
    if (data.code != '001') {
      Toast.info('支付失败');
      dispatch({ type: 'PAY_FAILURE' });
    } else {
      pingpp.createPayment(data.data, (result, err) => {
        let status = 2; //0失效1已支付2未支付3取消
        if (result === 'success') {
          // 支付成功
          Toast.info('支付成功');
          dispatch({ type: 'PAY_SUCCESS' });
          status = 1;
        } else if (result === 'fail') {
          // 支付失败
          Toast.info('支付失败');
          dispatch({ type: 'PAY_FAILURE' });
          status = 0;
        } else if (result === 'cancel') {
          // 支付取消
          dispatch({ type: 'PAY_FAILURE' });
          status = 3;
        }
        dispatch(updatePayStatus({ status, pingxxId: data.data.id }));
      });
    }
  });
};

/**
 * 获取charge
 * @type {String}
 */
export const GET_CHARGE: string = 'GET_CHARGE';
export const getChargeData: Dispatch =
(params): ThunkAction =>
(dispatch: Dispatch): void => {
  const result: Promise<Object> = GET(URL.getChargePath, params: Object);
  result.then((data) => {
    if (data.code == '001') {
      dispatch(pay({
        entityId:	params.activityId,
        type: 1,
      }));
    } else {
      Toast.info(data.message);
    }
  });
  AsyncFetchHandler(
    GET_CHARGE,
    result,
    dispatch
  );
};

/**
 * 修改支付状态
 * @type {String}
 */
export const UPDATE_PAYSTATUS: string = 'UPDATE_PAYSTATUS';
export const updatePayStatus: Dispatch =
(params): ThunkAction =>
(dispatch: Dispatch): void => {
  const result: Promise<Object> = GET(URL.updatePayStatusPath, params: Object);
  result.then((data) => {
    if (data.code == '001') {
      dispatch(push(RoutingURL.DashList()));
    } else {
      Toast.info(data.message);
      dispatch(push(RoutingURL.DashList()));
    }
  });
  AsyncFetchHandler(
    UPDATE_PAYSTATUS,
    result,
    dispatch
  );
};
