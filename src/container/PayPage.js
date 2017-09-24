/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import * as styles from '../assets/stylesheets/dashList.css';
import * as payStyle from '../assets/stylesheets/payPage.css';
import { push } from 'react-router-redux';
import * as RoutingURL from '../core/RoutingURL/RoutingURL';

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
        that.props.dispatch(push(RoutingURL.ActivityDetails(1)));
      }
      that.setState({ residueTime: --time });
    },1000);
  }
  render() {
    const showNum = (num) => {
      if(num > 0) {
        return `仅余${num}席`;
      }
      return '满员'
    }
    const dashItem = JSON.parse(JSON.stringify(this.props.dashData.get('dashList')))[this.props.index];
    return (
      <div style={{ backgroundColor: '#EEEEEE', height: '93vh'}} >
          {/*pay title*/}
         <div className={payStyle.payTitle}>
               <div className={payStyle.dashNum}>
                  <img src={'../assets/images/mars.png'} className={styles.mars}/>
                  <div className={payStyle.dashBoy}>男士：{showNum(dashItem.boyNum)}</div>
                  <img src={'../assets/images/venus.png'} className={styles.mars} />
                  <div>女士：{showNum(dashItem.girlNum)}</div>
               </div>
               <div className={payStyle.payText}>支付剩余时间</div>
               <div className={payStyle.payNum}><span>{this.state.residueTime}</span>S</div>
         </div>
         {/*pay content*/}
         <div className={payStyle.payContent}>
           <div className={payStyle.dashHeader}>
              <img src={'https://img.shaka.hsohealth.com/insurance/diet_banner_4_20170206.png'} className={payStyle.payImg} />
               <div>
                   <div className={payStyle.money}>￥100</div>
                   <div className={payStyle.dashTitle}>活动标题！</div>
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
            <div className={payStyle.wechatPay}><img src={'../assets/images/wechat_pay.png'} className={payStyle.wechatPayImg}/>微信支付</div>
            <div><img src={this.state.checked ? '../assets/images/支付选中.png' : '../assets/images/支付未选.png'} /></div>
         </div>
         {/*pay button*/}
         <div 
           className={this.state.checked ? payStyle.payButton : payStyle.noPayButton}
           onClick={() => {
             if(this.state.checked) {
               console.log('pay ok!');
               this.setResidueTime('stop');
             }
           }}
         >
              确认支付  ￥100
         </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dispatch: state.dispatch,
    openid: state.UserReducer.get('openid'),
    dashData: state.DashListReducer.get('dashData'),
    index: state.DashListReducer.get('index'),
  };
};

export default connect(mapStateToProps)(PayPage);
