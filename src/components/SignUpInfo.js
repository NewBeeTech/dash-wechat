/* @flow */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import * as styles from '../assets/stylesheets/dashList.css';
import * as infoStyles from '../assets/stylesheets/detailes.css';
import Boy from '../assets/images/boy.svg';
import Girl from '../assets/images/girl.svg';

class SignUpInfo extends React.PureComponent {
  static propTypes = {
    signUpInfo: PropTypes.instanceOf(Immutable.Map).isRequired,
  };
  render() {
    const showNum = (num) => {
      if(num > 0) {
        return `余${num}位`;
      }
      return '报名已满'
    }
    
    const isShowOriginator = (name, img) => {
      const views = [];
      if(name) {
        views.push(
          <div className={styles.dashOriginator}>
             发起人：
             <img src={img} className={styles.dashOriginatorImg}/>
             {name}
          </div>
        );
      }
      return views;
    }
    return (
      <div className={infoStyles.originatorContent}>
         <div className={infoStyles.dashNum}>
            <Boy className={styles.dashImg}/>
            <div className={styles.dashBoy}>男士：{showNum(this.props.signUpInfo.get('boyNum'))}</div>
            <Girl className={styles.dashImg}/>
            <div>女士：{showNum(this.props.signUpInfo.get('girlNum'))}</div>
         </div>
         <div className={infoStyles.originatorInfo}>
             <div className={infoStyles.originator}>
                 <ul>
                   <li className={infoStyles.originatorName}>发起人： 王晓丹</li>
                   <li>职业： 演员</li>
                   <li>生日： 1997年8月3号</li>
                   <li>个人信息： 179cm/57kg</li>
                   <li>.......</li>
                 </ul>
             </div>
             <img src={this.props.signUpInfo.get('originatorImg')} className={infoStyles.originatorImg}/>
         </div>
      </div>
    );
  }
}

export default SignUpInfo;
