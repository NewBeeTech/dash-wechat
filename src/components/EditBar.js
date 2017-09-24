/**
 * @flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import type { Dispatch } from '../../actions/types';
import { List, Icon } from 'antd-mobile';
import * as styles from './../assets/stylesheets/mine.css'
import { push, goBack } from 'react-router-redux';
import * as RoutingURL from './../core/RoutingURL/RoutingURL';
import { dispatch } from './../index';

type Props = {
  text: string,
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
          onClick={() => dispatch(goBack())}
        >
          <Icon size="lg" type="left" color="#ffce3d" />
        </div>
        <div className={styles.triangle} onClick={() => dispatch(goBack())} />
        <div
          className={styles.buttonDiv}
          onClick={() => dispatch(push(RoutingURL.UserInfo('/edit')))}
        >
          {this.props.text}
        </div>
      </div>
    );
  }
}

export default EditBar;
