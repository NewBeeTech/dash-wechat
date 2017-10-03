/**
 * @flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import type { Dispatch } from '../../actions/types';
import { WhiteSpace, Icon } from 'antd-mobile';
import * as styles from './../assets/stylesheets/bash.css'

type Props = {
  imgUrl: string,
  handlerWantAction: func,
  isWant: bool,
};

class Banner extends React.Component {
  componentWillMount() {
  }
  props: Props;
  render() {
    return (
      <div
        className={styles.bashBanner}
        style={{
          backgroundImage: `url(${this.props.imgUrl || 'http://dash.oss-cn-beijing.aliyuncs.com/fe/default-banner.jpg'})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100vw 53vw',
        }}
      >
        <WhiteSpace />
        <div className={styles.leftTopText}>{this.props.leftTopText}</div>
        <div
          className={styles.rightBottom}
          style={{ color: this.props.isWant ? '#ffce3d' : 'white' }}
          onClick={() => this.props.handlerWantAction()}
        >
          <img src={this.props.isWant ? 'http://dash.oss-cn-beijing.aliyuncs.com/fe/want_checked.png' : 'http://dash.oss-cn-beijing.aliyuncs.com/fe/want.png'} width="60%"/><br/>
          想去
        </div>
      </div>
    );
  }
}

export default Banner;
