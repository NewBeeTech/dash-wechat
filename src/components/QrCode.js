/**
 * @flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import type { Dispatch } from '../../actions/types';
import * as styles from './../assets/stylesheets/bash.css'
const Gantan = require('../assets/images/gantanhao.jpg');

class QrCode extends React.PureComponent {
  render() {
    return (
      <div className={styles.qrcodeContent}>
        <div className={styles.qrcodeText}>
            <div className={styles.qrcodeImg1}><img src={Gantan} width="100%" /></div>
            <div className={styles.qrcodeBorder}/>
            <div className={styles.qrcodeImgText}>为了联谊同类<br/>我们造了一个世界<br/>扫码即进入</div>
        </div>
        <div  className={styles.qrcodeImg} ><img src={'http://dash.oss-cn-beijing.aliyuncs.com/fe/qrcode.png'} width="80%"/></div>
      </div>
    );
  }
}

export default QrCode;
