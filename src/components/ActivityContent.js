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
    dashInfo: PropTypes.instanceOf(Immutable.Map).isRequired,
  };
  componentWillMount() {
  }
  render() {
    const showTipsMessage = (tips) => {
      return (
        <div>
          <div className={styles.messageRightDiv}>{tips}</div>
        </div>
      )
    }
    return (
      <div>
          <div className={styles.contentOne}>
              <div className={styles.contentOneTitle1}>{this.props.dashInfo.get('title')}{this.props.dashInfo.get('smallTitle')}</div>
              <div className={styles.contentOneTitle2}>{this.props.dashInfo.get('introduce')}</div>
          </div>
          <div className={styles.contentTwo}>
            <div className={styles.contentThreeTitle}>
              <div className={styles.contentTwoImg}><img src={"http://dash.oss-cn-beijing.aliyuncs.com/fe/message.png"} width="100%" /></div>
              <div>联谊要素</div>
            </div>
            <div className={styles.contentTwoInfo}>
                <div className={styles.contentTwoTitle}>
                  <div className={styles.contentTwoImg1}><img src={"http://dash.oss-cn-beijing.aliyuncs.com/fe/calender.png"} width="100%" /></div>
                  <div>{this.props.dashInfo.get('activityTime')}</div>
                </div>
                <div className={styles.contentTwoTitle}>
                  <div className={styles.contentTwoImg1}><img src={"http://dash.oss-cn-beijing.aliyuncs.com/fe/map.png"} width="100%" /></div>
                  <div>{this.props.dashInfo.get('address')}</div>
                </div>
                <div className={styles.contentTwoTitle}>
                  <div className={styles.contentTwoImg1}><img src={"http://dash.oss-cn-beijing.aliyuncs.com/fe/people.png"} width="100%" /></div>
                  <div>男生{this.props.dashInfo.get('boy')}人 vs  女生{this.props.dashInfo.get('girl')}人</div>
                </div>
                <div className={styles.contentTwoTitle}>
                  <div className={styles.contentTwoImg1}><img src={"http://dash.oss-cn-beijing.aliyuncs.com/fe/fee.png"} width="100%" /></div>
                  <div>{this.props.dashInfo.get('cost')}元/人(男)   {this.props.dashInfo.get('girlCost')}元/人(女)</div>
                </div>
                <div className={styles.contentTwoTitle}>
                  <div className={styles.contentTwoImg1}><img src={"http://dash.oss-cn-beijing.aliyuncs.com/fe/progress.png"} width="100%" /></div>
                  <div>流程</div>
                </div>
                <div className={styles.messageList}>
                  <div className={styles.messageLeftDiv} />
                  <div className={styles.messageRightDiv}>{this.props.dashInfo.get('acvitivityFlow')}</div>
                </div>
                <div className={styles.contentTwoTitle}>
                  <div className={styles.contentTwoImg1}><img src={"http://dash.oss-cn-beijing.aliyuncs.com/fe/note.png"} width="100%" /></div>
                  <div>Tips</div>
                </div>
                <div className={styles.messageList}>
                  <div className={styles.messageLeftDiv} />
                  {showTipsMessage(this.props.dashInfo.get('tips'))}
                </div>
            </div>
          </div>
      </div>
    );
  }
}

export default ActivityContent;
