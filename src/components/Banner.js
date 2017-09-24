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
        style={{
          background: `url(${this.props.imgUrl || '../../assets/images/default-banner.jpg'})`,
          backgroundSize: 'cover',
        }}
        className={styles.bashBanner}
      >
        <WhiteSpace />
        <div className={styles.leftTopText}>{this.props.leftTopText}</div>
        <div
          className={styles.rightBottom}
          style={{ color: this.props.isWant ? '#ffce3d' : 'white' }}
          onClick={() => this.props.handlerWantAction()}
        >
          <img src={this.props.isWant ? '../assets/images/want_checked.png' : '../assets/images/want.png'} /><br />
          想去
        </div>
      </div>
    );
  }
}

export default Banner;
