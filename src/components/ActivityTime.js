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
          <div className={styles.dashAddress} style={{ fontSize: `calc(12vw / (${this.props.address.length + 1}))`}}>
          {this.props.address}</div>
          <div>
              <div className={styles.dashTimeOne}>
                  {this.props.deadline === 0 ? '' : (this.props.deadline > 0 ? `距离报名截止还有${this.props.deadline}h！` : `距离报名截止不足1h！`)}
              </div>
              <div className={styles.dashTimeTwo}>{this.props.time}</div>
          </div>
      </div>
    );
  }
}

export default ActivityTime;
