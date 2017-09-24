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
  };
  componentWillMount() {
  }
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
          views.push(
            <div key={key} className={styles.wechatImg}>
                <div>
                    <img src={item.get('touxiang')} className={styles.wechatImgItem} />
                </div>
                <div className={styles.wechatImgName}>{item.get('name')}</div>
            </div>
          );
        });
      }
      return views;
    }
    return (
      <div>
          <div className={styles.wechatImgText}>
          {content}
          </div>
          <div className={styles.wechatImgList}>{showList(this.props.wechatImgList)}</div>
      </div>
    );
  }
}

export default WechatImgList;
