/**
 * @flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import type { Dispatch } from '../../actions/types';
import { List, WhiteSpace } from 'antd-mobile';
import * as styles from './../assets/stylesheets/mine.css'

type Props = {
  tags: string,
};

class UserTags extends React.Component {
  componentWillMount() {
  }
  props: Props;
  renderTags(tags) {
    const list = tags.split(',');
    const view = [];
    list.map((item, index) => {
      view.push(
        <span key={index} className={styles.tag}>
          {item}
        </span>
      );
    });
    return view;
  }
  render() {
    return (
      <div className={styles.tagsBg}>
        <WhiteSpace />
      <div className={styles.modulesTitle}>我的属性</div>
        <WhiteSpace />
        <div className={styles.tags}>
          {this.renderTags(this.props.tags)}
        </div>
      </div>
    );
  }
}

export default UserTags;
