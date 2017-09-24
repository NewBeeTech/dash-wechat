/**
 * @flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import type { Dispatch } from '../../actions/types';
import { WhiteSpace } from 'antd-mobile';
import * as styles from './../assets/stylesheets/bash.css'

class ActivityTime extends React.PureComponent {
  componentWillMount() {
  }
  render() {
    return (
      <div className={styles.timeContainer}>
        <div className={styles.timeDiv}>
          <div
            className={styles.address}
            style={{ fontSize: `calc(12vw / (${this.props.address.length + 1}))`}}
          >{this.props.address}</div>
          <div className={styles.time}>
            <div className={styles.deadline}>距离活动截止报名还有{this.props.deadline}！</div>
            <div className={styles.activityTime}>{this.props.time}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ActivityTime;
