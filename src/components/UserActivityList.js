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
      activityId: '',
      visible: false,
      otherUserList: Immutable.List([]),
    }
  }
  componentWillMount() {
  }
  props: Props;
  renderImg(avator) {
    return(
      <img src={avator} style={{ width: '20vw', height: '11.25vw', borderRadius: '10%' }} />
    )
  }
  renderMyDash(list, status) {
    const view = [];
    const statusText = { 1: '报名成功', 2: '流局', 3: '已取消报名', 4: '活动成功', 5: '活动失败'};
    const statusColor = { 1: '#ffce3d', 2: '#f40',  3: '#999', 4: '#ffce3d', 5: '#999' };
    const info = { 1: 'done', 2: 'primary',  3: 'cancel', 4: 'primary',  5: 'primary' };
    list.map((item, index) => {
      if(status.indexOf(item.get('status')) > -1) {
        view.push(
          <List.Item
            key={index}
            style={{ height: '34vw', position: 'relative' }}
            thumb={this.renderImg(item.get('photos'))}
            multipleLine
            onClick={() => {this.props.routeToActivity(item.get('activityId'), info[item.get('status')])}}
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
              {item.get('status') === 4 || (item.get('status') === 1 && new Date(item.get('startTime')).getTime() < new Date().getTime()) ?
              <span
                className={styles.vote}
                onClick={(e) => {
                  e.stopPropagation();
                  this.setState({ visible: true, otherUserList: item.get('otherUserList'), activityId: item.get('activityId') });
                }}
              >去投票</span>
              : ''}
              &nbsp;&nbsp;{statusText[item.get('status')]}
            </div>
          </List.Item>
        );
      }
    });
    return view;
  }
  renderCard(list) {
    const view = [];
    let info = '';
    list.map((item, index) => {
      if(item.get('status') === 1 ) info = 'done';
      if(item.get('status') === 0 ) info = 'primary';
      view.push(
        <List.Item
          key={index}
          style={{ height: '34vw', position: 'relative' }}
          thumb={this.renderImg(item.get('photos'))}
          multipleLine
          onClick={() => {this.props.routeToActivity(item.get('activityId'), info)}}
        >
          <span style={{ fontSize: '4vw' }}>{item.get('activityName')}</span>
          <List.Item.Brief style={{ fontSize: '3.5vw', color: '#999' }}>
            活动时间：{getActivityTime(item.get('startTime'), item.get('endTime'))}
          </List.Item.Brief>
          <List.Item.Brief style={{ fontSize: '3.5vw', color: '#999' }}>
            活动地点：{item.get('address')}
          </List.Item.Brief>
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
          onClick={() => {this.setState({ like: item.get(0) })}}
        >
          {this.state.like === item.get(0) ?
          <div className={styles.like}><img width="40px" src="http://dash.oss-cn-beijing.aliyuncs.com/fe/like.png" /></div> :''}
          <div className={styles.wxPortrait}><img width="100%" src={item.get(2).split(',')[0]} /></div>
          <div className={styles.wxName}>{item.get(1)}</div>
        </div>
      );
    });
    return view;
  }
  render() {
    // 历史活动（活动时间已过 或者 已经取消的）
    // const historyDash = this.props.myDash.filter(item => {
    //   const isDone = new Date(item.get('endTime')).getTime() < new Date().getTime();
    //   if(isDone) {
    //     return isDone;
    //   } else {
    //     return item.get('status' === 0);
    //   }
    // });
    // // 正在进行的活动
    // const todoDash = this.props.myDash.filter(item => {
    //   const isDone = new Date(item.get('endTime')).getTime() < new Date().getTime();
    //   if(!isDone) {
    //     return !isDone;
    //   } else {
    //     return item.get('status' === 1);
    //   }
    // });
    return (
      <div>
        <Accordion defaultActiveKey="0" className="my-accordion">
          <Accordion.Panel header={<div className={styles.panelHeader}><img src="http://dash.oss-cn-beijing.aliyuncs.com/fe/todo.png" />&nbsp;&nbsp;计划中的联谊</div>}>
            <List className="my-list">
              {this.renderMyDash(this.props.myDash, [1])}
            </List>
          </Accordion.Panel>
          <Accordion.Panel header={<div className={styles.panelHeader}><img src="http://dash.oss-cn-beijing.aliyuncs.com/fe/wantto.png" />&nbsp;&nbsp;想去的联谊</div>} className="pad">
            <List className="my-list">
              {this.renderCard(this.props.wantToDash)}
            </List>
          </Accordion.Panel>
          <Accordion.Panel header={<div className={styles.panelHeader}><img src="http://dash.oss-cn-beijing.aliyuncs.com/fe/history.png" />&nbsp;&nbsp;联过的谊</div>} className="pad">
            <List className="my-list">
              {this.renderMyDash(this.props.myDash, [2, 3, 4, 5])}
            </List>
          </Accordion.Panel>
        </Accordion>
        <Modal
          transparent
          maskClosable={true}
          visible={this.state.visible}
          onClose={() => {
            this.setState({visible: false, like: '', activityId: ''});
          }}
          closable
          footer={[{
            text: '投票',
            onPress: () => {
              if(!this.state.like) {
                return Toast.info('请选择喜欢的异性！', 2)
              }
              dispatch(MineAction.likeU({ beLikeUserId: this.state.like, activityId: this.state.activityId }))
              this.setState({visible: false, like: '', activityId: ''});
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
