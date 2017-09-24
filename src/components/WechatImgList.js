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
    const showImgList = (wechatImgList) => {
      const views = [];
      if(wechatImgList) {
         let content = '';
         if(this.props.type == '报名') {
           content = '这些人已经抢先报名了';
         } else if(this.props.type == '想去') {
           content = '这些人也想去这次活动';
         }
         views.push(
           <div>
              <p className={styles.wechatImgText}>{content}</p>
              <div className={styles.wechatImgList}>{showList(wechatImgList)}</div>
            </div>
         )
      }
      return views;
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
      <div style={{ backgroundColor: '#fff', padding: '1vh 0 3vh' }}>
          {showImgList(this.props.wechatImgList)}
      </div>
    );
  }
}

export default WechatImgList;
