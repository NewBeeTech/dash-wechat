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
import { redux, decorators } from 'amumu';
import moment from 'moment';
import { Modal } from 'antd-mobile';
import * as Immutable from 'immutable';

const alert = Modal.alert;

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
    };
  }
  componentWillMount() {
    // 设置Button按钮
    this.setButton(this.props.params.type);
    // 获取活动详情
    this.props.dispatch(ActivityAction.getDashInfoData({activityId: this.props.params.activityId}));
    // 获取患者在该活动的状态
    this.props.dispatch(ActivityAction.getUserForDashData({activityId: this.props.params.activityId}));
  }
  setButton(type) {
    const isShow = moment().isBefore(this.props.dashInfo.get('endTime'));
    const isSignUp = this.props.isSignUp; // 1失败 0未支付 1成功 2运营拒绝 3用户取消
    const signNum = this.props.signNum;
    //
    // console.log(isShow);
    // console.log(isSignUp);
    // console.log(signNum);
    let buttonText = '报名';
    let status = true;
    if(type === 'done' || isSignUp == 1) {
      buttonText = '取消报名';
    }else if(type === 'cancel' || isSignUp == 3) {
      buttonText = '已取消报名';
      status = false;
    }else if(isSignUp == 2) {
      buttonText = '运营拒绝';
      status = false;
    }
    this.setState({ buttonText, status, isShowButton: isShow });
  }
  cancelAction() {
    // 取消报名
    alert('取消报名', '确定取消报名么???', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确定', onPress: () => { this.props.dispatch(ActivityAction.cancelSginUp({ id: this.props.params.activityId })) } },
    ])
  }
  showActivity(dashInfo) {
    const views = [];
    if(dashInfo.get('id')) {
      views.push(
        <div>
         <div style={{ backgroundColor: '#EEEEEE', height: 'calc(100vh - 14vw)', overflow: 'scroll'}}>
         <Banner
           leftTopText={this.props.dashInfo.get('type')} // 活动类型 暂时隐藏
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
           <WechatImgList
              wechatImgList={this.props.dashInfo.get('signupPeople')}
              type={'报名'}
              isShow={this.props.isSignUp == 1}
           />
         </div>
         <ActivityContent
             dashInfo={dashInfo}
         />
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
              const type = this.props.params.type;
              if(type == 'done') {
                this.cancelAction();
              }else {
                this.props.dispatch(push(RoutingURL.PayPage()))
              }
            }}
         /> : <div />}
       </div>
       <DashTabbar selected={1} />
      </div>)
    }
    return views;
  }
  render() {
    return (
      <div>
      {this.showActivity(this.props.dashInfo)}
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
  };
};

export default connect(mapStateToProps)(ActivityContainer);
