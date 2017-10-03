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
        console.log('result:', result);
        console.log('err:', err);
        if (result === 'success') {
          // 支付成功
          alert('成功');
          Toast.info('支付成功');
          dispatch(push(RoutingURL.DashInfo(params.entityId, 'info')));
          dispatch({ type: 'PAY_SUCCESS' });
        } else if (result === 'fail') {
          // 支付失败
            alert('失败');
          Toast.info('支付失败');
          dispatch({ type: 'PAY_FAILURE' });
        } else if (result === 'cancel') {
          // 支付取消
          alert('取消');
          Toast.info('支付取消');
          dispatch({ type: 'PAY_FAILURE' });
        }
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
