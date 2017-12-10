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
var logo = require('./../assets/images/logo.png');

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
      title: '',
      activityTime: '',
      address: '',
    };
  }
  componentWillMount() {
    // 获取活动详情
    this.props.dispatch(ActivityAction.getDashInfoData({activityId: this.props.params.activityId}));
    // 获取患者在该活动的状态
    this.props.dispatch(ActivityAction.getUserForDashData({activityId: this.props.params.activityId}));
    // console.log(this.props.isSignUp, this.props.isSignUp);
    const timestamp = this.props.timestamp;
    const nonceStr = this.props.nonceStr;
    const signature = this.props.signature;
    const isSignUp =  this.props.isSignUp;
    const signNum =  this.props.signNum;
    const count =  this.props.count;
    const title =  this.props.dashInfo.get('title');
    const activityTime =  this.props.dashInfo.get('activityTime');
    const address =  this.props.dashInfo.get('address');
    this.state.timestamp = timestamp;
    this.state.nonceStr = nonceStr;
    this.state.signature = signature;
    this.state.isSignUp = isSignUp;
    this.state.signNum = signNum;
    this.state.title = title;
    this.state.activityTime = activityTime;
    this.state.count = count;
    this.state.address = address;
    this.setState({
      ...this.state,
    });
    // console.log(this.state);
     // 设置Button按钮
   if(this.props.dashInfo.get('id')) {
     this.setButton(this.props.params.type, this.props.dashInfo);
   }
   this._getWeConfig(location.href.split('#')[0]);
   this._weChatShare();

  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props.dashInfo.get('title'), nextProps.dashInfo.get('title'));
    if(this.props.dashInfo.get('title') !== nextProps.dashInfo.get('title')) {
      const title = nextProps.dashInfo.get('title');
      const activityTime = nextProps.dashInfo.get('activityTime');
      const address = nextProps.dashInfo.get('address');
      this.state.title = title;
      this.state.activityTime = activityTime;
      this.state.address = address;
      this.setState({
        ...this.state,
      });
      console.log(this.state.title);
      this._weChatShare();
    }
    if(this.props.isSignUp != nextProps.isSignUp ||
      this.props.signNum != nextProps.signNum ||
      this.props.count !== nextProps.count) {
      const isSignUp =  nextProps.isSignUp;
      const signNum =  nextProps.signNum;
      const count =  nextProps.count;
      this.state.isSignUp = isSignUp;
      this.state.signNum = signNum;
      this.state.count = count;
      this.setState({
        ...this.state,
      });
      // console.log(this.state);
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
    if(this.props.params.activityId !== nextProps.params.activityId) {
      this.props.dispatch(ActivityAction.getUserForDashData({activityId: nextProps.params.activityId}));
    }
  }
  _getWeConfig(currentURL) {
    this.props.dispatch(
      WechatAuthAction.getWeConfigDate({ url: currentURL })
    );
  }
  _weChatShare() {
    console.log(this.state.title);
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
          title: `${this.state.title}`,
          link: `http://dashooo.com/wx/index.html#/activity-details/${this.props.params.activityId}/type/info?_k=qze0fo)`,
          imgUrl: "http://dash.oss-cn-beijing.aliyuncs.com/fe/logo02.png",
        });
        window.wx.onMenuShareAppMessage({
          title: `${this.state.title}`,
          desc: `${this.state.activityTime}  ${this.state.address}`,
          link: `http://dashooo.com/wx/index.html#/activity-details/${this.props.params.activityId}/type/info?_k=qze0fo)`,
          imgUrl: "http://dash.oss-cn-beijing.aliyuncs.com/fe/logo02.png",
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
    const startTime = dashInfo.get('startTime');
    const endTime = dashInfo.get('endTime');
    let isDeadline = moment().isBefore(signupEndTime) && moment(signupStartTime).isBefore(moment());
    let noStart = moment().isBefore(moment(startTime));
    let noSignUpStart = moment().isBefore(moment(signupStartTime));
    let isOver = moment(endTime).isBefore(moment());
    // console.log('报名没开始', noSignUpStart);
    // console.log('报名已经截止', !isDeadline);
    // console.log('活动没开始', noStart);
    // console.log('活动已结束', isOver);
    let isShow = this.props.userData.get('userInfo').get('status'); // 如果冻结则不显示按钮
    const isSignUp = this.state.isSignUp; // 1失败 0未支付 1成功 2运营拒绝 3用户取消
    const signNum = this.state.signNum;
    const sex = this.props.userData.get('userInfo').get('sex');
    let buttonText = '报名联谊';
    let status = true;
    if(!isDeadline && isSignUp == 0) {
      buttonText = '报名已截止';
      status = false;
    }
    if(noSignUpStart && isSignUp == 0 ) {
      buttonText = '报名未开始';
      status = false;
    }
    if(isSignUp == 0 && ((sex == 1 && !dashInfo.get('boyNum')) || (sex == 2 && !dashInfo.get('girlNum')))) {
      buttonText = '报名已满';
      status = false;
    }
    if(type === 'done' || isSignUp == 1) {
      buttonText = '取消报名';
    }else if(type === 'cancel' || isSignUp == 3 || isSignUp == 6) {
      buttonText = '已取消报名';
      status = false;
    }else if(isSignUp == 2) {
      buttonText = '流局';
      status = false;
    }
    if(isOver) {
      buttonText = '活动已经结束';
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
           <div style={{ backgroundColor: '#fff'}}>
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
            if(this.state.signup == 0 && this.state.count == 1) {
              return Toast.info('您不能报名同一天的两局，会分身乏术', 3);
            }
            if(this.props.userData.get('userInfo').get('status') === 0) {
              return Toast.info('您的账号已经被关闭，请联系客服。', 3);
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
    count: state.ActivityReducer.get('count'),
    userData: state.MineReducer.get('userData'),
    timestamp: state.UserReducer.get('timestamp'),
    nonceStr: state.UserReducer.get('nonceStr'),
    signature: state.UserReducer.get('signature'),
  };
};

export default connect(mapStateToProps)(ActivityContainer);
