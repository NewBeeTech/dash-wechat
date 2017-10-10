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
import Fellowship from '../components/Fellowship';
import ActivityContent from '../components/ActivityContent';
import QrCode from '../components/QrCode';
import SignUpButton from '../components/SignUpButton';
import DashTabbar from '../components/DashTabbar';
import { redux, decorators } from 'amumu';
import moment from 'moment';
import { Modal } from 'antd-mobile';
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

    this.setState({
      isSignUp: this.props.isSignUp,
      signNum: this.props.signNum,
     });
     // 设置Button按钮
     if(this.props.dashInfo.get('id')) {
       this.setButton(this.props.params.type, this.props.dashInfo);
     }
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.isSignUp != nextProps.isSignUp || this.props.signNum != nextProps.signNum) {
      this.setState({
        isSignUp: nextProps.isSignUp,
        signNum: nextProps.signNum,
       });
    }
    this.setButton(this.props.params.type, nextProps.dashInfo);
  }
  setButton(type, dashInfo) {
    const signupStartTime = dashInfo.get('signupStartTime');
    const signupEndTime = dashInfo.get('signupEndTime');
    const isShow = moment().isBefore(signupEndTime) && moment(signupStartTime).isBefore(moment());
    const isSignUp = this.state.isSignUp; // 1失败 0未支付 1成功 2运营拒绝 3用户取消
    const signNum = this.state.signNum;
    const sex = this.props.userData.get('userInfo').get('sex');
    const UserStatus = this.props.userData.get('userInfo').get('status');
    let buttonText = '报名联谊';
    let status = true;
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
    Alter('取消报名', '确定取消报名么???', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确定', onPress: () => { this.props.dispatch(ActivityAction.cancelSignUp({ activityId: this.props.params.activityId })) } },
    ])
  }
  showActivity(dashInfo, sex) {
    const bodyHeight = this.state.isShowButton ? 'calc(100vh - 14vw - 8vh)' : 'calc(100vh - 14vw)';
    const views = [];
    if(dashInfo.get('id')) {
      views.push(
        <div>
         <div style={{ backgroundColor: '#EEEEEE', height: `${bodyHeight}`, overflow: 'scroll'}}>
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
          <div style={{ backgroundColor: '#fff', padding: '3vw'}}>
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
       {this.state.isShowButton ? <SignUpButton
          buttonText={this.state.buttonText} // 按钮名称
          status={this.state.status} // 是否点击
          returnAction = {
            () => { this.props.dispatch(goBack()) }
          }
          paymentAction = {() => {
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
       /> : <div />}
       <DashTabbar selected={1} />
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
  };
};

export default connect(mapStateToProps)(ActivityContainer);
