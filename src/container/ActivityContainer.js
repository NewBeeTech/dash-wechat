// 组合所有组件  root component

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as ActivityAction from '../actions/ActivityAction';
import * as WechatAuthAction from '../actions/WechatAuthAction';
import * as RoutingURL from '../core/RoutingURL/RoutingURL';
import { push, goBack } from 'react-router-redux';
import Banner from '../components/Banner';
import ActivityTime from '../components/ActivityTime';
import SignUpInfo from '../components/SignUpInfo';
import WechatImgList from '../components/WechatImgList';
import Fellowship from '../components/Fellowship';
import ActivityContent from '../components/ActivityContent';
import QrCode from '../components/QrCode';
import SignUpButton from '../components/SignUpButton';
import DashTabbar from '../components/DashTabbar';
import { redux, decorators } from 'amumu';
import moment from 'moment';
import { Modal, Button, Toast } from 'antd-mobile';
import * as Immutable from 'immutable';

const Alter = Modal.alert;

@redux.ConnectStore
@decorators.Loading(process.env.DEVICE)
@decorators.PureComponent
class ActivityContainer extends React.PureComponent {
  static propTypes = {
    isWant: PropTypes.bool,
    dashInfo: PropTypes.instanceOf(Immutable.Map).isRequired,
    isSignUp: PropTypes.number,
    signNum: PropTypes.number,
  };
  constructor(props: Object) {
    super(props);
    this.state = {
      weConfig: '',
      buttonText: '',
      status: true,
      isShowButton: true,
      isSignUp: 0,
      signNum: 0,
    };
  }
  componentWillMount() {
    // 获取活动详情
    this.props.dispatch(ActivityAction.getDashInfoData({activityId: this.props.params.activityId}));
    // 获取患者在该活动的状态
    this.props.dispatch(ActivityAction.getUserForDashData({activityId: this.props.params.activityId}));
      const timestamp = this.props.timestamp;
      const nonceStr = this.props.nonceStr;
      const signature = this.props.signature;
      const isSignUp =  this.props.isSignUp;
      const signNum =  this.props.signNum;
      this.state.timestamp = timestamp;
      this.state.nonceStr = nonceStr;
      this.state.signature = signature;
      this.state.isSignUp = isSignUp;
      this.state.signNum = signNum;
      this.setState({
        ...this.state,
      });
     // 设置Button按钮
     if(this.props.dashInfo.get('id')) {
       this.setButton(this.props.params.type, this.props.dashInfo);
     }
     this._getWeConfig(location.href.split('#')[0]);
     this._weChatShare();
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.isSignUp != nextProps.isSignUp || this.props.signNum != nextProps.signNum) {
      this.setState({
        isSignUp: nextProps.isSignUp,
        signNum: nextProps.signNum,
       });
    }
    this.setButton(this.props.params.type, nextProps.dashInfo);
    if (!this.props.signature && nextProps.timestamp && nextProps.nonceStr && nextProps.signature) {
      const timestamp = nextProps.timestamp;
      const nonceStr = nextProps.nonceStr;
      const signature = nextProps.signature;
      this.state.timestamp = timestamp;
      this.state.nonceStr = nonceStr;
      this.state.signature = signature;
      this.setState({
        ...this.state,
      });
      this._weChatShare();
    }
  }
  _getWeConfig(currentURL) {
    this.props.dispatch(
      WechatAuthAction.getWeConfigDate({ url: currentURL })
    );
  }
  _weChatShare() {
    if(this.state.timestamp) {
      window.wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx186971588dd1f238', // 必填，企业号的唯一标识，此处填写企业号corpid
        timestamp: this.state.timestamp, // 必填，生成签名的时间戳
        nonceStr: this.state.nonceStr, // 必填，生成签名的随机串
        signature: this.state.signature,// 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      window.wx.ready(() => {
        window.wx.onMenuShareTimeline({
          title: `${this.props.dashInfo.get('title')}`,
          link: `http://dash.sameyou.cn/wx/index.html#/activity-details/${this.props.dashInfo.get('id')}/type/info?_k=qze0fo)`,
          imgUrl: `${this.props.dashInfo.get('backgroundImg')}`,
        });
        window.wx.onMenuShareAppMessage({
          title: `${this.props.dashInfo.get('title')}`,
          desc: `${this.props.dashInfo.get('activityTime')}  ${this.props.dashInfo.get('address')}`,
          link: `http://dash.sameyou.cn/wx/index.html#/activity-details/${this.props.dashInfo.get('id')}/type/info?_k=qze0fo)`,
          imgUrl: `${this.props.dashInfo.get('backgroundImg')}`,
          type: 'link',
          dataUrl: '',
        });
        window.wx.error((res) => {
          console.log('wx.error: ', JSON.stringify(res));
        });
      });
    }
  }
  setButton(type, dashInfo) {
    const signupStartTime = dashInfo.get('signupStartTime');
    const signupEndTime = dashInfo.get('signupEndTime');
    let isDeadline = moment().isBefore(signupEndTime) && moment(signupStartTime).isBefore(moment());
    let isShow = this.props.userData.get('userInfo').get('status'); // 如果冻结则不显示按钮
    const isSignUp = this.state.isSignUp; // 1失败 0未支付 1成功 2运营拒绝 3用户取消
    const signNum = this.state.signNum;
    const sex = this.props.userData.get('userInfo').get('sex');
    let buttonText = '报名联谊';
    let status = true;
    if(!isDeadline) {
      buttonText = '报名已截止';
      status = false;
    }
    console.log('isSignUp', isSignUp);
    if(isSignUp == 0 && ((sex == 1 && dashInfo.get('boyNum') == signNum) || (sex == 2 && dashInfo.get('grilNum') == signNum))) {
      buttonText = '同性报名人数已满';
      status = false;
    }
    if(type === 'done' || isSignUp == 1) {
      buttonText = '取消报名';
    }else if(type === 'cancel' || isSignUp == 3) {
      buttonText = '已取消报名';
      status = false;
    }else if(isSignUp == 2) {
      buttonText = '运营拒绝';
      status = false;
    }
    this.setState({ buttonText, buttonText, status, isShowButton: isShow });
  }
  cancelAction() {
    // 取消报名
    Alter('建议先细读退款规则',
      <div style={{ fontSize: '3.5vw' }}>
        <div>客服会根据取消时间，在一个工作日后处理退款</div>
        <div>你真的确定取消报名吗？</div>
      </div>, [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确定', onPress: () => { this.props.dispatch(ActivityAction.cancelSignUp({ activityId: this.props.params.activityId })) } },
    ])
  }
  checkUserInfo() {
    const sex = this.props.userData.get('userInfo').get('sex');
    const phone = this.props.userData.get('userInfo').get('phone');
    const birth = this.props.userData.get('userInfo').get('birth');
    return (!sex || !phone || !birth);

  }
  showActivity(dashInfo, sex) {
    // const bodyHeight = this.state.isShowButton ? 'calc(100vh - 8vh)' : '100vh';
    const bodyHeight = 'calc(100vh - 8vh)';
    const views = [];
    if(dashInfo.get('id')) {
      views.push(
        <div>
         <div style={{ backgroundColor: '#EEEEEE', height: `${bodyHeight}`, overflow: 'scroll', WebkitOverflowScrolling: 'touch' }}>
         <Banner
           leftTopText={''} // 活动类型 暂时隐藏
           imgUrl={this.props.dashInfo.get('backgroundImg')}
           handlerWantAction={() => {
             const isWant = this.props.isWant;
             this.props.dispatch(ActivityAction.chargeIsWant({
                activityId: this.props.params.activityId,
                type: Number(!isWant),
             }));
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
              dashInfo={dashInfo}
           />
          </div>
           <Fellowship
              dashInfo={dashInfo}
           />
          <div style={{ backgroundColor: '#fff'}}>
           {this.props.dashInfo.get('signupPeople').toJS().length ?
             <WechatImgList
                wechatImgList={this.props.dashInfo.get('signupPeople')}
                type={'报名'}
                isShow={this.props.isSignUp == 1}
             />
           : <div />}
         </div>
         <ActivityContent
             dashInfo={dashInfo}
         />
         {this.props.dashInfo.get('wantToPeople').toJS().length ?
           <div style={{ backgroundColor: '#fff', padding: '1.5vh 0 2vh'}}>
             <WechatImgList
                wechatImgList={this.props.dashInfo.get('wantToPeople')}
                type={'想去'}
                isShow={true}
             />
           </div>
         : <div />}
         <QrCode />
       </div>
       <SignUpButton
          buttonText={this.state.buttonText} // 按钮名称
          status={this.state.status} // 是否点击
          returnAction = {
            () => { this.props.dispatch(goBack()) }
          }
          paymentAction = {() => {
            if(this.props.userData.get('userInfo').get('status') === 0) {
              return Toast.info('该用户被屏蔽，文案待定', 3);
            }
            if(this.checkUserInfo()) {
              Alter('完善信息',
                <div style={{ fontSize: '3.5vw' }}>
                  <div>请完善个人信息</div>
                </div>, [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '前往', onPress: () => { this.props.dispatch(push(RoutingURL.UserInfo('edit', ''))) } },
              ]);
              return false;
            }
            const type = this.props.params.type;
            const status = this.state.status;
            if(status) {
              if(type == 'done' || this.state.buttonText === '取消报名') {
                this.cancelAction();
              }else {
                this.props.dispatch(push(RoutingURL.PayPage()))
              }
            }
          }}
       />
       {/* <DashTabbar selected={1} /> */}
      </div>)
    }
    return views;
  }

  render() {
    return (
      <div>
      {this.showActivity(this.props.dashInfo, this.state.sex )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dispatch: state.dispatch,
    isWant: state.ActivityReducer.get('isWant'),
    dashInfo: state.ActivityReducer.get('dashInfo'),
    isSignUp: state.ActivityReducer.get('isSignUp'),
    signNum: state.ActivityReducer.get('signNum'),
    userData: state.MineReducer.get('userData'),
    timestamp: state.UserReducer.get('timestamp'),
    nonceStr: state.UserReducer.get('nonceStr'),
    signature: state.UserReducer.get('signature'),
  };
};

export default connect(mapStateToProps)(ActivityContainer);
