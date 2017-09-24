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
        return `仅余${num}席`;
      }
      return '满员'
    }
    return (
      <div className={infoStyles.originatorContent}>
         <div className={infoStyles.dashNum}>
           <img src={'../assets/images/mars.png'} className={styles.mars}/>
           <div className={styles.dashBoy}>男士：{showNum(this.props.signUpInfo.get('boyNum'))}</div>
           <img src={'../assets/images/venus.png'} className={styles.mars} />
           <div>女士：{showNum(this.props.signUpInfo.get('girlNum'))}</div>
         </div>
         <div className={infoStyles.originatorInfo}>
             <div className={infoStyles.originator}>
                 <div className={infoStyles.originatorName}>干事： 王晓丹</div>
                 <ul>
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
