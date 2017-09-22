/* @flow */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import * as styles from '../assets/stylesheets/dashList.css';
import Boy from '../assets/images/boy.svg';
import Girl from '../assets/images/girl.svg';

class DashCard extends React.PureComponent {
  static propTypes = {
    dashItem: PropTypes.instanceOf(Immutable.Map).isRequired,
  };
  render() {
    const address = this.props.dashItem.get('address');
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
      <div className={styles.dashCard}>
         {/* 活动表头 */}
         <div className={styles.dashHeader}>
             <div className={styles.dashAddress} style={{ fontSize: `calc(12vw / (${address.length + 1}))`}}>
             {address}</div>
             <div>
                 <div className={styles.dashTimeOne}>距离活动截止报名还有{this.props.dashItem.get('time')}！</div>
                 <div className={styles.dashTimeTwo}>{this.props.dashItem.get('activityTime')}</div>
             </div>
         </div>
         {/* 活动banner */}
         <div className={styles.dashBanner}>
             <div className={styles.dashBannerImg}>
                <img src={this.props.dashItem.get('backgroundImg')} width="100%" height="100%" />
            </div>
             <div className={styles.dashBannerText}>
                <span className={styles.dashTextOne}>{this.props.dashItem.get('title')}</span><br/>
                <span>{this.props.dashItem.get('smallTitle')}</span>
             </div>
         </div>
         {/* 活动人数 */}
         <div className={styles.dashNum}>
            <Boy className={styles.dashImg}/>
            <div className={styles.dashBoy}>男士：{showNum(this.props.dashItem.get('boyNum'))}</div>
            <Girl className={styles.dashImg}/>
            <div>女士：{showNum(this.props.dashItem.get('girlNum'))}</div>
         </div>
         {/* 活动发起人 */}
         {isShowOriginator(this.props.dashItem.get('originatorName'), this.props.dashItem.get('originatorImg'))}
           {/* 活动提示 */}
         <div className={styles.dashFooter}>
             <span>提示：如遇报名人数已满，可随时关注活动报名情况，尤其在活动开始前的两天时间里或有人退出，届时可伺机抢座！</span>
         </div>
      </div>
    );
  }
}

export default DashCard;
