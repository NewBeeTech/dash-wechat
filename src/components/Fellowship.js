/**
 * @flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import type { Dispatch } from '../../actions/types';
import { WhiteSpace } from 'antd-mobile';
import * as styles from './../assets/stylesheets/bash.css'

class Fellowship extends React.PureComponent {
  static propTypes = {
    dashInfo: PropTypes.instanceOf(Immutable.Map).isRequired,
  };
  componentWillMount() {
  }
  showIntroduce(introduce) {
    const views = [];
    if(introduce) {
      
    }
    return views;
  }
  render() {
    return (
      <div className={styles.contentOne}>
          <div className={styles.contentOneTitle1}>{this.props.dashInfo.get('title')}</div>
          <div className={styles.contentOneTitle3}>{this.props.dashInfo.get('smallTitle')}</div>
          {this.showIntroduce(this.props.dashInfo.get('introduce'))}
      </div>
    );
  }
}

export default Fellowship;
