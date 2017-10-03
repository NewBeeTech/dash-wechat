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
  const reponse = POSTJSON(URL.payPath, params);
  reponse.then(data => {
      console.log('支付data:', data);
    if (data.code != '001') {
      alert('支付失败');
      dispatch({ type: 'PAY_FAILURE' });
    } else {
      pingpp.setAPURL('https://dev.shaco.hsohealth.com/alipay_in_weixin/index.html');
      pingpp.createPayment(data.data.charge, (result, err) => {
        if (result === 'success') {
          // 支付成功
          Toast('支付成功');
          // dispatch(push(RoutingURL.DashInfo('info')));
          dispatch({ type: 'PAY_SUCCESS' });
        } else if (result === 'fail') {
          // 支付失败
          Toast('支付失败');
          POSTJSON(URL.paymentFeedbackPath, { err, type: 'fail' });
          dispatch({ type: 'PAY_FAILURE' });
        } else if (result === 'cancel') {
          // 支付取消
          Toast('支付取消');
          POSTJSON(URL.paymentFeedbackPath, { err, type: 'cancel' });
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
    console.log('报名data:', data);
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
