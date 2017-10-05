/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import * as styles from '../assets/stylesheets/dashList.css';
import * as payStyle from '../assets/stylesheets/payPage.css';
import { push, replace } from 'react-router-redux';
import * as RoutingURL from '../core/RoutingURL/RoutingURL';
import * as PayPageAction from '../actions/PayPageAction';
import DashTabbar from '../components/DashTabbar';

class PayPage extends React.PureComponent {
  static propTypes = {
    openid: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      residueTime: 30,
    };
  }
  componentWillMount() {
    this.setResidueTime();
  }
  setResidueTime(type) {
    const that = this;
    var interval = setInterval(function(){
      let time = that.state.residueTime;
      if(type == 'stop') {
        clearInterval(interval);
        return;
      }
      if(time <= 0) {
        clearInterval(interval);
        that.props.dispatch(replace(RoutingURL.ActivityDetails(that.props.dashInfo.get('id'), 'info')));
      }
      that.setState({ residueTime: --time });
    },1000);
  }
  _submitApplicationAction() {
    const submitParams = {
      activityId: this.props.dashInfo.get('id'),
    };
    this.props.dispatch(
      PayPageAction.getChargeData(submitParams)
    );
    return false;
  }
  render() {
    const showNum = (num) => {
      if(num > 0) {
        return `仅余${num}席`;
      }
      return '满员'
    }
    const dashItem = JSON.parse(JSON.stringify(this.props.dashInfo));
    const sex = this.props.userData.get('userInfo').get('sex');
    alert(`性别${sex}`);
    return (
      <div>
      <div style={{ backgroundColor: '#EEEEEE', height: 'calc(100vh - 14vw)'}} >
          {/*pay title*/}
         <div className={payStyle.payTitle}>
               <div className={payStyle.dashNum}>
                  <img src={'http://dash.oss-cn-beijing.aliyuncs.com/fe/mars.png'} className={styles.mars}/>
                  <div className={payStyle.dashBoy}>男士: {showNum(dashItem.boyNum)}</div>
                  <img src={'http://dash.oss-cn-beijing.aliyuncs.com/fe/venus.png'} className={styles.mars} />
                  <div>女士: {showNum(dashItem.girlNum)}</div>
               </div>
               <div className={payStyle.payText}>支付剩余时间</div>
               <div className={payStyle.payNum}><span>{this.state.residueTime}</span>S</div>
         </div>
         {/*pay content*/}
         <div className={payStyle.payContent}>
           <div className={payStyle.dashHeader}>
              <img src={'https://img.shaka.hsohealth.com/insurance/diet_banner_4_20170206.png'} className={payStyle.payImg} />
               <div>
                   <div className={payStyle.money}>￥{sex == 1 ? dashItem.cost : dashItem.girlCost}</div>
                   <div className={payStyle.dashTitle}>{dashItem.title}</div>
                   <div className={payStyle.smallDashTitle}>{dashItem.address}({dashItem.activityTime})</div>
               </div>
           </div>
         </div>
         {/*pay type*/}
         <div
           className={payStyle.selectType}
           onClick={() => {
             const checked = this.state.checked;
             this.setState({ checked: !checked });
           }}
         >
            <div className={payStyle.wechatPay}><img src={'http://dash.oss-cn-beijing.aliyuncs.com/fe/wechat_pay.png'} className={payStyle.wechatPayImg}/>微信支付</div>
            <div><img src={this.state.checked ? 'http://dash.oss-cn-beijing.aliyuncs.com/fe/支付选中.png' : 'http://dash.oss-cn-beijing.aliyuncs.com/fe/支付未选.png'} style={{ width: '3vh' }}/></div>
         </div>
         {/*pay button*/}
         <div
           className={this.state.checked ? payStyle.payButton : payStyle.noPayButton}
           onClick={() => {
             if(this.state.checked) {
               this._submitApplicationAction();
             }
           }}
         >
              确认支付  ￥{sex == 1 ? dashItem.cost : dashItem.girlCost}
         </div>
      </div>
      <DashTabbar selected={1} />
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    dispatch: state.dispatch,
    openid: state.UserReducer.get('openid'),
    dashInfo: state.ActivityReducer.get('dashInfo'),
    userData: state.MineReducer.get('userData'),
  };
};

export default connect(mapStateToProps)(PayPage);
