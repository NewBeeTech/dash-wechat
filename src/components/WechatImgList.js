/**
 * @flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import type { Dispatch } from '../../actions/types';
import * as styles from '../assets/stylesheets/detailes.css';

class WechatImgList extends React.PureComponent {
  static propTypes = {
    wechatImgList: PropTypes.instanceOf(Immutable.List).isRequired,
    type: PropTypes.string.isRequired,
    isShow: PropTypes.bool.isRequired,
  };
  render() {
    let content = '';
    if(this.props.type == '报名') {
      content = '你将会遇见';
    } else if(this.props.type == '想去') {
      content = '他们也想去';
    }
    const showList = (imgList) => {
      const views = [];
      if(imgList) {
        imgList.map((item, key) => {
          console.log(JSON.stringify(item));
          views.push(
            <div key={key} className={styles.wechatImg}>
                <div>
                    <img src={item.get('wxPortrait')} className={this.props.isShow ? styles.wechatImgItemShow : styles.wechatImgItem } />
                </div>
                <div className={styles.wechatImgName}>{item.get('wxName')}</div>
            </div>
          );
        });
      }
      return views;
    }
    return (
      <div className={styles.wechatImgContent}>
          <div className={styles.wechatImgText}>
          {content}
          </div>
          <div className={styles.wechatImgList}>{showList(this.props.wechatImgList)}</div>
      </div>
    );
  }
}

export default WechatImgList;
