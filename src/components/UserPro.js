/**
 * @flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import type { Dispatch } from '../../actions/types';
import { List } from 'antd-mobile';
import * as styles from './../assets/stylesheets/mine.css'

type Props = {
  avator: string,
  wxPortrait: string,
  wxName: string,
  likeCount: number,
  onclikHandler: func,
};

const Item = List.Item;
const Brief = Item.Brief;

class UserPro extends React.Component {
  componentWillMount() {
  }
  props: Props;
  renderAvator(avator) {
    return(
      <div className={styles.avator} style={{ background: `url(${avator})`, backgroundSize: 'cover'}} />
    )
  }
  render() {
    return (
      <List className="my-list">
        <Item
          style={{ height: '40vw' }}
          arrow="horizontal"
          thumb={this.renderAvator(this.props.avator || this.props.wxPortrait)}
          multipleLine
          onClick={() => {this.props.onclikHandler()}}
        >
          <span style={{ fontSize: '6vw' }}>{this.props.wxName}</span>
          <Brief style={{ fontSize: '4vw', color: '#999' }}>
            <span style={{ color: '#000', fontWeight: '500' }}>{this.props.likeCount || 0}</span> 人喜欢了你
          </Brief>
        </Item>
      </List>
    );
  }
}

export default UserPro;
