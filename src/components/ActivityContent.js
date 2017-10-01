/**
 * @flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import type { Dispatch } from '../../actions/types';
import { WhiteSpace } from 'antd-mobile';
import * as styles from './../assets/stylesheets/bash.css'

class ActivityContent extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };
  componentWillMount() {
  }
  render() {
    const showMessage = () => {
      const views = [];
      for(let i=0; i<4; i++) {
        views.push(
          <div className={styles.messageRightDiv}>{i + 1}.此处是活动流程</div>
        );
      }
      return views;
    }
    
    const showTipsMessage = () => {
      return (
        <div style={{ height: '46vh', lineHeight: '4vh'}}>
          <div className={styles.messageRightDiv}>{'1.费用支付完成即报名成功。如有特殊原因，也可取消报名。关于主动取消报名：如果活动开始两天前取消，则全额退款；如果活动开始前一天取消，则退一半费用；如果活动开始当天取消活动，不支持退费。'}</div>
          <div className={styles.messageRightDiv}>{'2.活动人数满员即停止报名，如果活动当天00:00满足条件男女性别差<2，刚到时间就履行线下活动。否则，为保证活动的质量，运营人员被迫取消本次活动，并全额退款。'}</div>
          <div className={styles.messageRightDiv}>{'3.活动的具体地点会在活动开始前以短信通知到参与人。'}</div>
        </div>
      )
    }
    return (
      <div>
          <div className={styles.contentOne}>
              <div className={styles.contentOneTitle1}>活动标题活动标题活动标题</div>
              <div className={styles.contentOneTitle2}>活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍</div>
          </div>
          <div className={styles.contentTwo}>
            <div className={styles.contentThreeTitle}>
              <div className={styles.contentTwoImg}><img src={"http://dash.oss-cn-beijing.aliyuncs.com/fe/message.png"} width="100%" /></div>
              <div>联谊要素</div>
            </div>
            <div className={styles.contentTwoInfo}>
                <div className={styles.contentTwoTitle}>
                  <div className={styles.contentTwoImg1}><img src={"http://dash.oss-cn-beijing.aliyuncs.com/fe/calender.png"} width="100%" /></div>
                  <div>09月16日 周六  14：00-16：00</div>
                </div>
                <div className={styles.contentTwoTitle}>
                  <div className={styles.contentTwoImg1}><img src={"http://dash.oss-cn-beijing.aliyuncs.com/fe/map.png"} width="100%" /></div>
                  <div>望京附近</div>
                </div>
                <div className={styles.contentTwoTitle}>
                  <div className={styles.contentTwoImg1}><img src={"http://dash.oss-cn-beijing.aliyuncs.com/fe/people.png"} width="100%" /></div>
                  <div>男生3人 vs  女生3人</div>
                </div>
                <div className={styles.contentTwoTitle}>
                  <div className={styles.contentTwoImg1}><img src={"http://dash.oss-cn-beijing.aliyuncs.com/fe/fee.png"} width="100%" /></div>
                  <div>100元/人</div>
                </div>
                <div className={styles.contentTwoTitle}>
                  <div className={styles.contentTwoImg1}><img src={"http://dash.oss-cn-beijing.aliyuncs.com/fe/progress.png"} width="100%" /></div>
                  <div>流程</div>
                </div>
                <div className={styles.messageList}>
                  <div className={styles.messageLeftDiv} />
                  <div>{showMessage()}</div>
                </div>
                <div className={styles.contentTwoTitle}>
                  <div className={styles.contentTwoImg1}><img src={"http://dash.oss-cn-beijing.aliyuncs.com/fe/note.png"} width="100%" /></div>
                  <div>Tips</div>
                </div>
                <div className={styles.messageList}>
                  <div className={styles.messageLeftDiv} />
                  {showTipsMessage()}
                </div>
            </div>
          </div>
      </div>
    );
  }
}

export default ActivityContent;
