/**
 * @flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import type { Dispatch } from '../../actions/types';
import { WhiteSpace } from 'antd-mobile';
import * as styles from './../assets/stylesheets/dashList.css'

class ActivityTime extends React.PureComponent {
  static propTypes = {
    address: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  };
  render() {
    return (
      <div className={styles.dashHeader}>
          {this.props.address ? <div className={styles.dashAddress} style={{ fontSize: `calc(12vw / (${this.props.address.length + 1}))`}}>
          {this.props.address}</div> : <div />}
          <div>
              <div className={styles.dashTimeOne}>
                  {this.props.deadline === -1 ? '' : `距离报名截止不足${this.props.deadline + 1}h！`}
              </div>
              <div className={styles.dashTimeTwo}>{this.props.time}</div>
          </div>
      </div>
    );
  }
}

export default ActivityTime;
