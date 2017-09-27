/* @flow */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import * as styles from '../assets/stylesheets/dashList.css';
import { push } from 'react-router-redux';
import * as RoutingURL from '../core/RoutingURL/RoutingURL';

class DashCard extends React.PureComponent {
  static propTypes = {
    dashItem: PropTypes.instanceOf(Immutable.Map).isRequired,
    dispatch: PropTypes.func,
  };
  render() {
    const address = this.props.dashItem.get('address');
    const showNum = (num) => {
      if(num > 0) {
        return `仅余${num}席`;
      }
      return '满员'
    }
    
    const isShowOriginator = (name, img) => {
      const views = [];
      if(name) {
        views.push(
          <div className={styles.dashOriginator}>
             干事:&nbsp;&nbsp;
             <img src={img} className={styles.dashOriginatorImg}/>
             {name}
          </div>
        );
      }
      return views;
    }
    return (
      <div className={styles.dashCard} onClick={() => {
         this.props.dispatch(push(RoutingURL.ActivityDetails(this.props.dashItem.get('id'))));
      }}
        key={this.props.dashItem.get('id')}
      >
         {/* 活动表头 */}
         <div className={styles.dashHeader}>
             <div className={styles.dashAddress} style={{ fontSize: `calc(12vw / (${address.length + 1}))`}}>
             {address}</div>
             <div>
                 <div className={styles.dashTimeOne}>距离报名截止还有{this.props.dashItem.get('time')}！</div>
                 <div className={styles.dashTimeTwo}>{this.props.dashItem.get('activityTime')}</div>
             </div>
         </div>
         {/* 活动banner */}
         <div className={styles.dashBanner}>
             <div className={styles.dashBannerImg}>
                <img src={this.props.dashItem.get('backgroundImg')} width="100%" height="100%" />
            </div>
             <div className={styles.dashBannerText}>
                <span>{this.props.dashItem.get('title')}{this.props.dashItem.get('smallTitle')}</span>
             </div>
         </div>
         {/* 活动人数 */}
         <div className={styles.dashNum}>
            <img src={'../assets/images/mars.png'} className={styles.mars}/>
            <div className={styles.dashBoy}>男士: {showNum(this.props.dashItem.get('boyNum'))}</div>
            <img src={'../assets/images/venus.png'} className={styles.mars} />
            <div>女士: {showNum(this.props.dashItem.get('girlNum'))}</div>
         </div>
         {/* 活动发起人 */}
         {isShowOriginator(this.props.dashItem.get('originatorName'), this.props.dashItem.get('originatorImg'))}
           {/* 活动提示 */}
         <div className={styles.dashFooter}>
             <span>提示: 如遇报名人数已满, 可随时关注活动报名情况, 尤其在活动开始前的两天时间里或有人退出, 届时可伺机抢座!</span>
         </div>
      </div>
    );
  }
}

export default DashCard;
