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
        <div className={styles.qrcodeText}>扫码可关注Dash服务号哦</div>
        <div  className={styles.qrcodeImg} ><img src={'../../assets/images/qrcode.png'} width="100%"/></div>
      </div>
    );
  }
}

export default QrCode;
