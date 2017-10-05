/**
 * @flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import * as MineAction from './../actions/MineAction';
import type { Dispatch } from '../../actions/types';
import { List } from 'antd-mobile';
import * as styles from './../assets/stylesheets/mine.css'
import { replace } from 'react-router-redux';
import * as RoutingURL from './../core/RoutingURL/RoutingURL';
import { dispatch } from './../index';

type Props = {
  text: string,
  submitHandler: Function,
};

class EditBar extends React.Component {
  componentWillMount() {
  }
  props: Props;
  render() {
    return (
      <div className={styles.editBar}>
        <div
          className={styles.returnArrow}
          onClick={() => this.props.tab === 'edit' ? dispatch(replace(RoutingURL.UserInfo(''))) : dispatch(replace(RoutingURL.Mine()))}
        >
          <img src="http://dash.oss-cn-beijing.aliyuncs.com/fe/left_arrow.png" />
        </div>
        <div className={styles.triangle} onClick={() => dispatch(goBack())} />
        <div
          className={styles.buttonDiv}
          onClick={() => {
            this.props.tab === 'edit' ?
            this.props.submitHandler() :
            dispatch(replace(RoutingURL.UserInfo('/edit')));
          }}
        >
          {this.props.text}
        </div>
      </div>
    );
  }
}

export default EditBar;
