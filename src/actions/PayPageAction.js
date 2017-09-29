/*
 * @flow
 */

import { POSTJSON } from '../core/WS/WSHandler';
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
    if (data.code !== 0) {
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
          POSTJSON(URL.paymentFeedbackPath, { err, type: 'fail' });
          dispatch({ type: 'PAY_FAILURE' });
        } else if (result === 'cancel') {
          // 支付取消
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
  console.log('params:'.params);
  const result: Promise<Object> = POSTJSON(URL.getChargePath, params: Object);
  result.then((data) => {
    if (data.code === 0) {
      dispatch(pay({
        // openid: createParams.openId,
        // amount:	createParams.amount,	// 支付金额
        // channel: createParams.channel, // 支付渠道100:微信公众号; 101:微信扫码; 102:支付宝手机网页支付; 103:支付宝扫码
        // electronicPrescriptionId: data.data.id, // 电子处方单Id
        // serviceProductId: createParams.serviceProductId,	// 产品Id,1、2、3价格一次上扬的，服务质量依次上扬
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
