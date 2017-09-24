// 组合所有组件  root component

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';
import Banner from '../components/Banner';
import ActivityTime from '../components/ActivityTime';
import SignUpInfo from '../components/SignUpInfo';
import WechatImgList from '../components/WechatImgList';
import ActivityContent from '../components/ActivityContent';
import QrCode from '../components/QrCode';

const propTypes = {
  children: PropTypes.node,
  dispatch: PropTypes.func,
  openid: PropTypes.string,
};

class ActivityContainer extends React.PureComponent {
  render() {
    return (
      <div style={{ backgroundColor: '#EEEEEE', height: '100vh', overflow: 'scroll'}}>
        <Banner
          leftTopText="" // 活动类型 暂时隐藏
          imgUrl=""
          handlerWantAction={() => {console.log(1)}}
          isWant={false}
        />
        <div style={{ backgroundColor: '#fff'}}>
          <ActivityTime
            // leftTopText="" // 活动类型 暂时隐藏
            address="望京"
            deadline="4h"
            time="9月20日 16:00-19:00"
          />
          <SignUpInfo 
             signUpInfo={this.props.dashInfo.get('signUpInfo')}
          />
          <WechatImgList
             wechatImgList={this.props.dashInfo.get('baomingrenshu')}
             type={'报名'}
          />
        </div>
        <ActivityContent />
        <WechatImgList
           wechatImgList={this.props.dashInfo.get('baomingrenshu')}
           type={'想去'}
        />
        <QrCode />
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
