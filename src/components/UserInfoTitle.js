/**
 * @flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import type { Dispatch } from '../../actions/types';
import { List } from 'antd-mobile';
import * as styles from './../assets/stylesheets/mine.css'

type Props = {
  wxName: string,
  sex: number,
  age: string,
  phone: number,
  wxPortrait: string,
  avator: string,
};

const Item = List.Item;
const Brief = Item.Brief;

class UserInfoTitle extends React.Component {
  componentWillMount() {
  }
  props: Props;
  renderAvator(avator) {
    return(
      <div className={styles.avator} style={{ background: `url(${avator})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}} />
    )
  }
  render() {
    const gender = {0: '未知', 1: '男', 2: '女'};
    return (
      <List className="my-list">
        <Item
          style={{ height: '40vw' }}
          thumb={this.renderAvator(this.props.avator || this.props.wxPortrait)}
          multipleLine
        >
          <span style={{ fontSize: '6vw' }}>{this.props.wxName}</span>&nbsp;&nbsp;
          <span style={{ fontSize: '4vw', color: '#999' }}>{gender[this.props.sex]}</span>&nbsp;&nbsp;
          <span style={{ fontSize: '4vw', color: '#999' }}>{this.props.age ? `${this.props.age}岁` : ''}</span>
          <Brief style={{ fontSize: '4vw', color: '#999' }}>
            手机：{this.props.phone}
          </Brief>
        </Item>
      </List>
    );
  }
}

export default UserInfoTitle;
