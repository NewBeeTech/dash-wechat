/* @flow */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import * as styles from '../assets/stylesheets/dashList.css';
import * as infoStyles from '../assets/stylesheets/detailes.css';
import Boy from '../assets/images/boy.svg';
import Girl from '../assets/images/girl.svg';

class SignUpInfo extends React.PureComponent {
  static propTypes = {
    originatorInfo: PropTypes.instanceOf(Immutable.Map).isRequired,
    boyNum: PropTypes.number.isRequired,
    girlNum: PropTypes.number.isRequired,
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
           <img src={'http://dash.oss-cn-beijing.aliyuncs.com/fe/mars.png'} className={styles.mars}/>
           <div className={styles.dashBoy}>男士: {showNum(this.props.boyNum)}</div>
           <img src={'http://dash.oss-cn-beijing.aliyuncs.com/fe/venus.png'} className={styles.mars} />
           <div>女士: {showNum(this.props.girlNum)}</div>
         </div>
         <div className={infoStyles.originatorInfo}>
             <div className={infoStyles.originator}>
                 <div className={infoStyles.originatorName}>干事: {this.props.originatorInfo.get('originatorName')}</div>
                 <div className={infoStyles.originatorDesc}>{this.props.originatorInfo.get('originUserDesc')}</div>
             </div>
             <img src={this.props.originatorInfo.get('originatorImg')} className={infoStyles.originatorImg}/>
         </div>
      </div>
    );
  }
}

export default SignUpInfo;
