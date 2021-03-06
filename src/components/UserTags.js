/**
 * @flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import type { Dispatch } from '../../actions/types';
import { List, WhiteSpace } from 'antd-mobile';
import * as styles from './../assets/stylesheets/mine.css'
import * as MineAction from './../actions/MineAction';
import { dispatch } from './../index';

type Props = {
  tags: string,
  moreTags: Immutable.List<>,
  tab: string,
};

class UserTags extends React.Component {
  componentWillMount() {
    if(this.props.tab === 'edit') {
      dispatch(MineAction.getMoreTags({ count: 10 }));
    }
    // this.state = {
    //   tags: this.props.tags,
    //   moreTags: this.props.moreTags,
    // };
  }
  componentWillReceiveProps(nextProps) {
    // if(this.props.tab!== nextProps.tab || !this.props.moreTags.equals(nextProps.moreTags)) {
    //   this.setState({
    //     tags: nextProps.tags,
    //     moreTags: nextProps.moreTags,
    //   });
    // }
    if(this.props.tab !== 'edit' &&  nextProps.tab === 'edit') {
      dispatch(MineAction.getMoreTags({ count: 10 }));
    }
  }
  props: Props;
  // 删除属性、添加属性
  // deleteTag(index, item) {
  //   const tags = this.state.tags;
  //   const moreTags = this.state.moreTags;
  //   const newMoreTags = moreTags.push(item);
  //   tags.splice(index, 1);
  //   this.setState({ tags, moreTags: newMoreTags });
  // }
  // addTag(index, item) {
  //   const tags = this.state.tags;
  //   const moreTags = this.state.moreTags;
  //   tags.push(item);
  //   const newMoreTags = moreTags.splice(index, 1);
  //   this.setState({ tags, moreTags: newMoreTags });
  // }
  renderTags(tags) {
    if(this.props.tab !== 'edit') {
      if (!tags[0] && tags.length === 1) {
        return (
          <div style={{
            height: '60vh',
            width: '100vw',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '4vw',
            lineHeight: '6vw',
          }}>
            你太神秘了，何不打俩标签<br/>让我们认识认识？
          </div>
        );
      }
    }
    if(!tags[0] && tags.length === 1) return;
    const view = [];
    tags.map((item, index) => {
      if(item) {
        view.push(
          <span
            key={index}
            className={styles.tag}
            style={this.props.tab === 'edit' ? { paddingRight: '1vw' } : {} }
          >
            {item}
            {
              this.props.tab === 'edit' ?
              <img
                style={{ marginLeft: '2vw', width: '3.5vw' }}
                src="http://dash.oss-cn-beijing.aliyuncs.com/fe/del.png"
                onClick={() => this.props.deleteTag(index, item)}
              />
              : ''
            }
          </span>
        );
      }
    });
    return view;
  }
  renderAddTags(moreTags) {
    const tags = this.props.tags;
    const newMore = moreTags.filter(item => {
      return tags.indexOf(item) === -1;
    });
    const view = [];
    newMore.map((item, index) => {
      view.push(
        <span
          key={index}
          className={styles.tag}
          onClick={() => this.props.addTag(index, item)}
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
          {this.renderTags(this.props.tags)}
        </div>
        <WhiteSpace size="lg" />
        {this.props.tab === 'edit' ?
          <div className={styles.addTags}>
            <WhiteSpace size="lg" />
            <div
              className={styles.changeTags}
              onClick={() => dispatch(MineAction.getMoreTags({ count: 10 }))}
            >
              换一批&nbsp;<img src="http://dash.oss-cn-beijing.aliyuncs.com/fe/reload.png" style={{ width: '3vw' }} />
            </div>
            <WhiteSpace size="md" />
          {this.renderAddTags(this.props.moreTags)}
          </div> : ''}
      </div>
    );
  }
}

export default UserTags;
