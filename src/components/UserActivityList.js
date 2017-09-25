/**
 * @flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import type { Dispatch } from '../../actions/types';
import { List, Accordion } from 'antd-mobile';
import * as styles from './../assets/stylesheets/mine.css'
import moment from 'moment';

type Props = {
  UserActivityList: immutable.list<any>,
  wantToDash: immutable.list<any>,
  routeToActivity: func,
};


class UserActivityList extends React.Component {
  componentWillMount() {
  }
  props: Props;
  renderImg(avator) {
    return(
      <img src={avator} style={{ width: '20vw', height: '20vw', borderRadius: '10%' }} />
    )
  }
  renderCard(list) {
    const view = [];
    let statusColor = null;
    let statusText = '';
    list.map((item, index) => {
      if(item.get('status') === 1){
        statusColor = '#ffce3d';
        statusText = '报名成功';
      }
      if(item.get('status') === 0){
        statusColor = '#999';
        statusText = '已取消报名';
      }
      view.push(
        <List.Item
          key={index}
          style={{ height: '34vw', position: 'relative' }}
          thumb={this.renderImg(item.get('img'))}
          multipleLine
          onClick={() => {this.props.routeToActivity()}}
        >
          <span style={{ fontSize: '4vw' }}>{item.get('title')}</span>
          <List.Item.Brief style={{ fontSize: '3.5vw', color: '#999' }}>
            活动时间：{item.get('time').slice(0, 10)}
          </List.Item.Brief>
          <List.Item.Brief style={{ fontSize: '3.5vw', color: '#999' }}>
            活动地点：{item.get('address')}
          </List.Item.Brief>
          <div className={styles.status} style={{ color: statusColor }}>{statusText}</div>
        </List.Item>
      );
    });
    return view;
  }
  render() {
    // 历史活动（活动时间已过 或者 已经取消的）
    const historyDash = this.props.myDash.filter(item => {
      const isDone = new Date(item.get('time')).getTime() < new Date().getTime();
      if(isDone) {
        return isDone;
      } else {
        return item.get('status' === 0);
      }
    });
    const todoDash = this.props.myDash.filter(item => {
      const isDone = new Date(item.get('time')).getTime() < new Date().getTime();
      if(!isDone) {
        return !isDone;
      } else {
        return item.get('status' === 1);
      }
    });
    console.log(historyDash);
    return (
      <Accordion defaultActiveKey="0" className="my-accordion" style={{ marginBottom: '10vw'}}>
        <Accordion.Panel header="计划中的联谊">
          <List className="my-list">
            {this.renderCard(todoDash)}
          </List>
        </Accordion.Panel>
        <Accordion.Panel header="想去的联谊" className="pad">
          <List className="my-list">
            {this.renderCard(this.props.wantToDash)}
          </List>
        </Accordion.Panel>
        <Accordion.Panel header="联过的谊" className="pad">
          <List className="my-list">
            {this.renderCard(historyDash)}
          </List>
        </Accordion.Panel>
      </Accordion>
    );
  }
}

export default UserActivityList;
