/**
 * @flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import type { Dispatch } from '../../actions/types';
import { List, WhiteSpace, Icon } from 'antd-mobile';
import * as styles from './../assets/stylesheets/mine.css'

type Props = {
  tags: string,
  tab: string,
};

class UserTags extends React.Component {
  componentWillMount() {
    this.state = {
      tags: this.props.tags,
    }
  }
  props: Props;
  deleteTag(index) {
    const tags = this.state.tags;
    tags.splice(index, 1);
    this.setState({ tags });
  }
  renderTags(tags) {
    const list = tags;
    const view = [];
    list.map((item, index) => {
      view.push(
        <span
          key={index}
          className={styles.tag}
          style={this.props.tab === 'edit' ? { paddingRight: '1vw' } : '' }
        >
          {item}
          {
            this.props.tab === 'edit' ?
            <Icon
              style={{ marginLeft: '2vw' }}
              type="cross-circle-o" size="xxs"
              color="white"
              onClick={() => this.deleteTag(index)}
            />
            : ''
          }
        </span>
      );
    });
    return view;
  }
  renderAddTags(tags) {
    const list = tags;
    const view = [];
    list.map((item, index) => {
      view.push(
        <span
          key={index}
          className={styles.tag}
        >
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
          {this.renderTags(this.state.tags)}
        </div>
        <WhiteSpace size="lg" />
        <div className={styles.addTags}>
          <WhiteSpace size="lg" />
          <div className={styles.changeTags} onClick={() => console.log('换一批')}>
            换一批&nbsp;<img src="./../assets/images/reload.png" style={{ width: '3vw' }} />
          </div>
          <WhiteSpace size="md" />
          <WhiteSpace size="md" />
          {this.renderAddTags(this.state.tags)}
          <WhiteSpace />
        </div>
      </div>
    );
  }
}

export default UserTags;
