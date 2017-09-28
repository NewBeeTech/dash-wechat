/**
 * @flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import type { Dispatch } from '../../actions/types';
import { List, Accordion, Modal } from 'antd-mobile';
import * as styles from './../assets/stylesheets/mine.css'
import { getActivityTime } from './../core/CommonFun/moment';

type Props = {
  UserActivityList: immutable.list<any>,
  wantToDash: immutable.list<any>,
  routeToActivity: func,
};


class UserActivityList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      like: '',
      visible: false,
      memberList: Immutable.List([]),
    }
  }
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
    const statusText = { 0: '已取消报名', 1: '报名成功', 2: '运营拒绝' };
    const statusColor = { 0: '#999', 1: '#ffce3d', 2: '#999' };
    list.map((item, index) => {
      view.push(
        <List.Item
          key={index}
          style={{ height: '34vw', position: 'relative' }}
          thumb={this.renderImg(item.get('photos'))}
          multipleLine
          onClick={() => {this.props.routeToActivity()}}
        >
          <span style={{ fontSize: '4vw' }}>{item.get('activityName')}</span>
          <List.Item.Brief style={{ fontSize: '3.5vw', color: '#999' }}>
            活动时间：{getActivityTime(item.get('startTime'), item.get('endTime'))}
          </List.Item.Brief>
          <List.Item.Brief style={{ fontSize: '3.5vw', color: '#999' }}>
            活动地点：{item.get('address')}
          </List.Item.Brief>
          <div
            className={styles.status}
            style={{ color: statusColor[item.get('status')] }}
          >
            {item.get('status') === 1 && new Date(item.get('endTime')).getTime() < new Date().getTime() ?
            <span
              className={styles.vote}
              onClick={(e) => {
                e.stopPropagation();
                this.setState({ visible: true, memberList: item.get('member') });
              }}
            >去投票</span>
            : ''}
            &nbsp;&nbsp;{statusText[item.get('status')]}
          </div>
        </List.Item>
      );
    });
    return view;
  }
  renderMember(members) {
    const view = [];
    members.map((item, index) => {
      view.push(
        <div className={styles.member} key={index} onClick={() => {this.setState({ like: item.get('userId')})}}>
          {this.state.like === item.get('userId') ?
          <div className={styles.like}><img width="40px" src="./../assets/images/like.png" /></div> :''}
          <div className={styles.wxPortrait}><img width="100%" src={item.get('wxPortrait')} /></div>
          <div className={styles.wxName}>{item.get('wxName')}</div>
        </div>
      );
    });
    return view;
  }
  render() {
    // 历史活动（活动时间已过 或者 已经取消的）
    const historyDash = this.props.myDash.filter(item => {
      const isDone = new Date(item.get('endTime')).getTime() < new Date().getTime();
      if(isDone) {
        return isDone;
      } else {
        return item.get('status' === 0);
      }
    });
    // 正在进行的活动
    const todoDash = this.props.myDash.filter(item => {
      const isDone = new Date(item.get('endTime')).getTime() < new Date().getTime();
      if(!isDone) {
        return !isDone;
      } else {
        return item.get('status' === 1);
      }
    });
    return (
      <div>
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
        <Modal
          transparent
          maskClosable={true}
          visible={this.state.visible}
          onClose={() => this.setState({visible: false, like: ''})}
          footer={[{
            text: '投票',
            onPress: () => {
              this.setState({visible: false, like: ''});
            }
          }]}
        >
          <div style={{ textAlign: 'center', fontSize: '4vw', color: '#e7a82e' }}>
            点击喜欢的异性为TA投上一票哦!</div>
          <div className={styles.members}>
            {this.renderMember(this.state.memberList)}
          </div>
        </Modal>
      </div>
    );
  }
}

export default UserActivityList;
