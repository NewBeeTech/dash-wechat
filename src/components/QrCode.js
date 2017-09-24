/**
 * @flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import type { Dispatch } from '../../actions/types';
import * as styles from './../assets/stylesheets/bash.css'

class QrCode extends React.PureComponent {
  render() {
    return (
      <div className={styles.qrcodeContent}>
        <div className={styles.qrcodeText}>请扫码关注Dash服务号<br/>及时接收报名进度通知</div>
        <div  className={styles.qrcodeImg} ><img src={'../../assets/images/qrcode.png'} width="100%"/></div>
      </div>
    );
  }
}

export default QrCode;
