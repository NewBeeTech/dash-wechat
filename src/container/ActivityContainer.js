// 组合所有组件  root component

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as ActivityAction from '../actions/ActivityAction';
import * as RoutingURL from '../core/RoutingURL/RoutingURL';
import { push, goBack } from 'react-router-redux';
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
      buttonText: '',
      status: true,
      isShowButton: true,
    };
  }
  componentWillMount() {
    // 设置Button按钮
    this.setButton(this.props.params.type);
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
  setButton(type) {
    let buttonText = '报名';
    let status = true;
    if(type === 'done') {
      buttonText = '取消报名';
    }else if(type === 'cancel') {
      buttonText = '已取消报名';
    }
    this.setState({ buttonText, status });
  }
  render() {
    return (
      <div>
        <div style={{ backgroundColor: '#EEEEEE', height: 'calc(100vh - 14vw)', overflow: 'scroll'}}>
          <Banner
            leftTopText={this.props.dashInfo.get('type')} // 活动类型 暂时隐藏
            imgUrl={this.props.dashInfo.get('backgroundImg')}
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
              address={this.props.dashInfo.get('address')}
              deadline={this.props.dashInfo.get('time')}
              time={this.props.dashInfo.get('activityTime')}
            />
            <SignUpInfo
               originatorInfo={this.props.dashInfo.get('originatorInfo')}
               boyNum={this.props.dashInfo.get('boyNum')}
               girlNum={this.props.dashInfo.get('girlNum')}
            />
            <WechatImgList
               wechatImgList={this.props.dashInfo.get('signupPeople')}
               type={'报名'}
               isShow={this.props.isSignUp}
            />
          </div>
          <ActivityContent />
          <div style={{ backgroundColor: '#fff', padding: '1.5vh 0 2vh'}}>
            <WechatImgList
               wechatImgList={this.props.dashInfo.get('wantToPeople')}
               type={'想去'}
               isShow={true}
            />
          </div>
          <QrCode />
          {this.state.isShowButton ? <SignUpButton
             buttonText={this.state.buttonText} // 按钮名称
             status={this.state.status} // 是否点击
             returnAction = {
               () => { this.props.dispatch(goBack()) }
             }
             paymentAction = {() => {
               this.props.dispatch(push(RoutingURL.PayPage()))
             }}
          /> : <div />}
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
    isSignUp: state.ActivityReducer.get('isSignUp'),
  };
};

export default connect(mapStateToProps)(ActivityContainer);
