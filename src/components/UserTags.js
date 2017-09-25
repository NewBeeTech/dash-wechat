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
  moreTags: string,
  tab: string,
};

class UserTags extends React.Component {
  componentWillMount() {
    this.state = {
      tags: this.props.tags,
      moreTags: this.props.moreTags,
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
    if(!this.props.tag.equale(nextProps)) {
      this.setState({
        tags: this.props.tags,
        moreTags: this.props.moreTags,
      });
    }
  }
  // componentWillUnmount() {
  //   this.setState({
  //     tags: this.props.tags,
  //     moreTags: this.props.moreTags,
  //   });
  // }
  props: Props;
  // 删除属性、添加属性
  deleteTag(index, item) {
    const tags = this.state.tags;
    const moreTags = this.state.moreTags;
    moreTags.push(item);
    tags.splice(index, 1);
    this.setState({ tags, moreTags });
  }
  addTag(index, item) {
    const tags = this.state.tags;
    const moreTags = this.state.moreTags;
    tags.push(item);
    moreTags.splice(index, 1);
    this.setState({ tags, moreTags });
  }
  renderTags(tags) {
    const list = tags;
    const view = [];
    list.map((item, index) => {
      view.push(
        <span
          key={index}
          className={styles.tag}
          style={this.props.tab === 'edit' ? { paddingRight: '1vw' } : {} }
        >
          {item}
          {
            this.props.tab === 'edit' ?
            <Icon
              style={{ marginLeft: '2vw' }}
              type="cross-circle-o" size="xxs"
              color="white"
              onClick={() => this.deleteTag(index, item)}
            />
            : ''
          }
        </span>
      );
    });
    return view;
  }
  renderAddTags(moreTags) {
    const view = [];
    moreTags.map((item, index) => {
      view.push(
        <span
          key={index}
          className={styles.tag}
          onClick={() => this.addTag(index, item)}
        >
          {item}
        </span>
      );
    });
    return view;
  }
  getMoreTags(moreTags) {

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
        {this.props.tab === 'edit' ?
          <div className={styles.addTags}>
            <WhiteSpace size="lg" />
            <div className={styles.changeTags} onClick={() => console.log('换一批')}>
              换一批&nbsp;<img src="./../assets/images/reload.png" style={{ width: '3vw' }} />
            </div>
            <WhiteSpace size="md" />
            {this.renderAddTags(this.state.moreTags)}
          </div> : ''}
      </div>
    );
  }
}

export default UserTags;
