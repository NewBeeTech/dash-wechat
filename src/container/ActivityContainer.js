// 组合所有组件  root component

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as RoutingURL from '../core/RoutingURL/RoutingURL';
import { push } from 'react-router-redux';
import Banner from '../components/Banner';
import ActivityTime from '../components/ActivityTime';
import SignUpInfo from '../components/SignUpInfo';
import WechatImgList from '../components/WechatImgList';
import ActivityContent from '../components/ActivityContent';
import QrCode from '../components/QrCode';
import SignUpButton from '../components/SignUpButton';

const propTypes = {
  children: PropTypes.node,
  dispatch: PropTypes.func,
  openid: PropTypes.string,
};

class ActivityContainer extends React.PureComponent {
  render() {
    return (
      <div style={{ backgroundColor: '#EEEEEE', height: '93vh', overflow: 'scroll'}}>
        <Banner
          leftTopText="活动类型" // 活动类型 暂时隐藏
          imgUrl=""
          handlerWantAction={() => {console.log(1)}}
          isWant={true}
        />
        <div style={{ backgroundColor: '#fff', padding: '3vw'}}>
          <ActivityTime
            address="望京"
            deadline="4h"
            time="9/20 (六) 18:00-21:00"
          />
          <SignUpInfo 
             signUpInfo={this.props.dashInfo.get('signUpInfo')}
          />
          <WechatImgList
             wechatImgList={this.props.dashInfo.get('baomingrenshu')}
             type={'报名'}
             isShow={false}
          />
        </div>
        <ActivityContent />
        <div style={{ backgroundColor: '#fff', padding: '1.5vh 0 2vh'}}>
          <WechatImgList
             wechatImgList={this.props.dashInfo.get('baomingrenshu')}
             type={'想去'}
             isShow={true}
          />
        </div>
        <QrCode />
        <SignUpButton
           buttonText={'报名活动'} // 按钮名称
           status={true} // 是否点击
           returnAction = {
             () => { this.props.dispatch(push(RoutingURL.DashList()))}
           }
           paymentAction = {() => {
             this.props.dispatch(push(RoutingURL.PayPage()))
           }}
        />
      </div>
    );
  }
}

ActivityContainer.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    dispatch: state.dispatch,
    openid: state.UserReducer.get('openid'),
    dashInfo: state.ActivityReducer.get('dashInfo'),
  };
};

export default connect(mapStateToProps)(ActivityContainer);
