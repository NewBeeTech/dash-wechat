/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import * as styles from '../assets/stylesheets/dashList.css';
import * as payStyle from '../assets/stylesheets/payPage.css';
import Boy from '../assets/images/boy.svg';
import Girl from '../assets/images/girl.svg';
import { List, Radio, Flex, WhiteSpace } from 'antd-mobile';

const RadioItem = Radio.RadioItem;

class PayPage extends React.PureComponent {
  static propTypes = {
    openid: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
    };
  }
  render() {
    const showNum = (num) => {
      if(num > 0) {
        return `余${num}位`;
      }
      return '报名已满'
    }
    const dashItem = JSON.parse(JSON.stringify(this.props.dashData.get('dashList')))[this.props.index];
    return (
      <div style={{ backgroundColor: '#EEEEEE', height: '93vh'}} >
          {/*pay title*/}
         <div className={payStyle.payTitle}>
               <div className={payStyle.dashNum}>
                  <Boy className={styles.dashImg}/>
                  <div className={payStyle.dashBoy}>男士：{showNum(dashItem.boyNum)}</div>
                  <Girl className={styles.dashImg}/>
                  <div>女士：{showNum(dashItem.girlNum)}</div>
               </div>
               <div className={payStyle.payText}>支付剩余时间</div>
               <div className={payStyle.payNum}><span>30</span>S</div>
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
         <div className={payStyle.selectType}>
           <RadioItem checked={this.state.checked} onChange={() => {
               const checked = this.state.checked;
               this.setState({ checked: !checked });
           }}>
             微信支付
           </RadioItem>
         </div>
         {/*pay button*/}
         <div className={payStyle.payButton}>
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
