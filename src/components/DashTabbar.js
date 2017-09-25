/**
 * @flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import type { Dispatch } from '../../actions/types';
import { TabBar } from 'antd-mobile';
import * as styles from './../assets/stylesheets/mine.css'
import { push } from 'react-router-redux';
import * as RoutingURL from './../core/RoutingURL/RoutingURL';
import { dispatch } from './../index';

type Props = {
  onclikHandler: func;
};

class DashTabbar extends React.Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      selected: 1,
    };
  }
  state: {
    selected: number,
  };

  componentWillMount() {
  }
  props: Props;
  render() {
    const selected = this.state.selected;
    return (
      <div className={styles.dashTabbar}>
        <div
          className={styles.tab}
          onClick={() => {
            this.setState({ selected: 1 });
            dispatch(push(RoutingURL.DashList()))
          }}
        >
          {selected === 1 ? <img src="./../assets/images/dash_checked.png" /> :
          <img src="./../assets/images/dash.png" />}&nbsp;
          <span className={styles.tabText} style={ selected === 1 ? { color: '#333'} : {}}>活动</span>
        </div>
        <div className={styles.tabBarBorder} />
        <div
          className={styles.tab}
          onClick={() => {
            this.setState({ selected: 2 });
            dispatch(push(RoutingURL.Mine()));
          }}
        >
          {selected === 2 ? <img src="./../assets/images/mine_checked.png" /> :
          <img src="./../assets/images/mine.png" />}&nbsp;
          <span className={styles.tabText} style={ selected === 2 ? { color: '#333'} : {}}>我的</span>
        </div>
      </div>
    );
  }
}

export default DashTabbar;
