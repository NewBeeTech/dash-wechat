/**
 * @flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import type { Dispatch } from '../../actions/types';
import { List, Accordion, Modal, Toast } from 'antd-mobile';
import * as styles from './../assets/stylesheets/mine.css'
import { getActivityTime } from './../core/CommonFun/moment';
import * as MineAction from './../actions/MineAction';
import { dispatch } from './../index';

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
      otherUserList: Immutable.List([]),
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
    const statusText = { '-1': '报名失败', '0': '已取消报名', '1': '报名成功', '2': '运营拒绝' };
    const statusColor = { '-1': '#999', '0': '#999', '1': '#ffce3d', '2': '#999' };
    let info = '';
    list.map((item, index) => {
      if(item.get('status') === 1 ) info === 'done';
      if(item.get('status') === -1 || item.get('status') === 2 ) info === 'primary';
      if(item.get('status') === 0 ) info === 'cancel';
      view.push(
        <List.Item
          key={index}
          style={{ height: '34vw', position: 'relative' }}
          thumb={this.renderImg(item.get('photos'))}
          multipleLine
          onClick={() => {this.props.routeToActivity(item.get('activityId', info))}}
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
            style={{ color: statusColor[String(item.get('status'))] }}
          >
            {item.get('status') === 1 && new Date(item.get('endTime')).getTime() < new Date().getTime() ?
            <span
              className={styles.vote}
              onClick={(e) => {
                e.stopPropagation();
                this.setState({ visible: true, otherUserList: item.get('otherUserList') });
              }}
            >去投票</span>
            : ''}
            &nbsp;&nbsp;{statusText[String(item.get('status'))]}
          </div>
        </List.Item>
      );
    });
    return view;
  }
  renderMember(otherUserList) {
    const view = [];
    otherUserList.map((item, index) => {
      view.push(
        <div
          className={styles.member}
          style={{ width: `calc(90% / ${otherUserList.size})`}}
          key={index}
          onClick={() => {this.setState({ like: item.get(0)})}}
        >
          {this.state.like === item.get(0) ?
          <div className={styles.like}><img width="40px" src="./../assets/images/like.png" /></div> :''}
          <div className={styles.wxPortrait}><img width="100%" src={item.get(2)} /></div>
          <div className={styles.wxName}>{item.get(1)}</div>
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
          onClose={() => {
            this.setState({visible: false, like: ''});
          }}
          closable
          footer={[{
            text: '投票',
            onPress: () => {
              if(!this.state.like) {
                return Toast.info('请选择喜欢的异性！')
              }
              dispatch(MineAction.likeU({ userId: this.state.like }))
              this.setState({visible: false, like: ''});
            }
          }]}
        >
          <div style={{ textAlign: 'center', fontSize: '4vw', color: '#e7a82e' }}>
            点击喜欢的异性为TA投上一票</div>
          <div className={styles.members}>
            {this.renderMember(this.state.otherUserList)}
          </div>
        </Modal>
      </div>
    );
  }
}

export default UserActivityList;
