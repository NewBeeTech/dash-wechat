import React from 'react';
import styles from '../assets/stylesheets/paySuccessPage.css';
import { dispatch } from '../index';
import { goBack, go } from 'react-router-redux';

const paySuccessLogo = require('../assets/images/paySuccessLogo.png');
const paySuccessQrcode = require('../assets/images/paySuccessQrcode.png');

class PaySuccessPage extends React.PureComponent {
  render() {
    return (
      <div className={styles.paySuccess}>
        <div className={styles.paySuccessLogoArea}>
          <img className={styles.paySuccessLogo} src={paySuccessLogo} />
          <div className={styles.paySuccessTitle}>&nbsp;&nbsp;&nbsp;预订成功！</div>
        </div>
        <div className={styles.paySuccessDescArea}>
          请扫码联系客服
          <br/>
          等待之后的安排
          <img className={styles.paySuccessDescQrcode} src={paySuccessQrcode} />
        </div>
        <div
          className={styles.paySuccessReturnBtn}
          onClick={() => {
            dispatch(go(-2));
          }}
        >
          返 回
        </div>
      </div>
    );
  }
}

export default PaySuccessPage;
