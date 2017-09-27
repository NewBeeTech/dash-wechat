// 组合所有组件  root component

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as ActivityAction from '../actions/ActivityAction';
import * as RoutingURL from '../core/RoutingURL/RoutingURL';
import { push } from 'react-router-redux';
import Banner from '../components/Banner';
import ActivityTime from '../components/ActivityTime';
import SignUpInfo from '../components/SignUpInfo';
import WechatImgList from '../components/WechatImgList';
import ActivityContent from '../components/ActivityContent';
import QrCode from '../components/QrCode';
import SignUpButton from '../components/SignUpButton';
import DashTabbar from '../components/DashTabbar';
import { redux } from 'amumu';

const propTypes = {
  children: PropTypes.node,
  dispatch: PropTypes.func,
  openid: PropTypes.string,
};

@redux.ConnectStore
class ActivityContainer extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      weConfig: '',
    };
  }
  componentWillMount() {
    // 获取活动详情
    // this.props.dispatch(ActivityAction.getDashInfoData({id: this.props.params.activityId}));
    // this._getWeConfig(
    //   ['onMenuShareTimeline', 'onMenuShareAppMessage'],
    //   location.href.split('#')[0],
    // );
    // const weConfig = this.props.weConfig;
    // this.state.weConfig = weConfig;
    // this.setState({
    //   ...this.state,
    // });
    // this._weChatShare();
  }
  componentWillReceiveProps(nextProps: Object) {
    // if (!this.props.weConfig && nextProps.weConfig) {
    //   const weConfig = nextProps.weConfig;
    //   this.state.weConfig = weConfig;
    //   this.setState({
    //     ...this.state,
    //   });
    //   this._weChatShare();
    // }
  }
  _getWeConfig(jsApiList, currentURL) {
    // this.props.dispatch(
    //   ActivityInfoAction.getWeConfigDate({ api: jsApiList, url: currentURL })
    // );
  }
  _weChatShare() {
    if (this.state.weConfig) {
      this.state.weConfig.debug = false;
      window.wx.config(this.state.weConfig);
      window.wx.ready(() => {
        window.wx.onMenuShareTimeline({
          title: '活动标题',
          link: '',
          imgUrl: '',
        });
        window.wx.onMenuShareAppMessage({
          title: '活动标题',
          desc: '活动时间+活动地点',
          link: '',
          imgUrl: '',
          type: 'link',
          dataUrl: '',
        });
        window.wx.error((res) => {
          console.log('wx.error: ', JSON.stringify(res));
        });
      });
    }
  }
  render() {
    return (
      <div>
        <div style={{ backgroundColor: '#EEEEEE', height: 'calc(100vh - 14vw)', overflow: 'scroll'}}>
          <Banner
            leftTopText="活动类型" // 活动类型 暂时隐藏
            imgUrl=""
            handlerWantAction={() => {
              const isWant = this.props.isWant;
              // this.props.dispatch(ActivityAction.chargeIsWant({
              //    activityId: this.props.params.activityId,
              //    type: Number(!isWant),
              // }));
              // 
              this.props.changeAction('ActivityReducer/isWant', !isWant);
            }}
            isWant={this.props.isWant}
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
        <DashTabbar/>
      </div>
    
    );
  }
}

ActivityContainer.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    dispatch: state.dispatch,
    openid: state.UserReducer.get('openid'),
    isWant: state.ActivityReducer.get('isWant'),
    dashInfo: state.ActivityReducer.get('dashInfo'),
  };
};

export default connect(mapStateToProps)(ActivityContainer);
