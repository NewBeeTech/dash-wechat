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
    const time = this.props.dashItem.get('time');
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
         this.props.dispatch(push(RoutingURL.ActivityDetails(this.props.dashItem.get('id'), 'info')));
      }}
        key={this.props.dashItem.get('id')}
      >

         {/* 活动表头 */}
         <div className={styles.dashHeader}>
             {address ? <div className={styles.dashAddress} style={{ fontSize: `calc(12vw / (${address.length + 1}))`}}>
             {address}</div> : <div />}
             <div>
               <div className={styles.dashTimeOne}>
                 {time === -1 ? '' : `距离报名截止不足${Number(time) + 1}h！`}
               </div>
               <div className={styles.dashTimeTwo}>{this.props.dashItem.get('activityTime')}</div>
             </div>
         </div>
         {/* 活动banner */}
         <div className={styles.dashBanner}>
             <div className={styles.dashBannerImg} style={{ background: `url(${this.props.dashItem.get('backgroundImg')})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat'  }}>
                {/* <img src={this.props.dashItem.get('backgroundImg')} width="100%" height="100%" /> */}
                <div className={styles.dashBannerText}>
                   {this.props.dashItem.get('title')}
                </div>
                <div className={styles.dashBannerText2}>
                   {this.props.dashItem.get('title')}
                </div>
            </div>
         </div>
         {/* 活动人数 */}
         <div className={styles.dashNum}>
            <img src={'http://dash.oss-cn-beijing.aliyuncs.com/fe/mars.png'} className={styles.mars}/>
            <div className={styles.dashBoy}>男士{showNum(this.props.dashItem.get('boyNum'))}</div>
            <img src={'http://dash.oss-cn-beijing.aliyuncs.com/fe/venus.png'} className={styles.mars} />
            <div>女士{showNum(this.props.dashItem.get('girlNum'))}</div>
         </div>
         {/* 活动发起人 */}
         {isShowOriginator(this.props.dashItem.get('originatorName'), this.props.dashItem.get('originatorImg'))}
           {/* 活动提示 */}
         <div className={styles.dashFooter}>
             <span>{this.props.dashItem.get('smallTitle')}</span>
         </div>
      </div>
    );
  }
}

export default DashCard;
