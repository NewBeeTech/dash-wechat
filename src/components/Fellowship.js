/**
 * @flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import type { Dispatch } from '../../actions/types';
import { WhiteSpace } from 'antd-mobile';
import * as styles from './../assets/stylesheets/bash.css'

class Fellowship extends React.PureComponent {
  static propTypes = {
    dashInfo: PropTypes.instanceOf(Immutable.Map).isRequired,
  };
  componentWillMount() {
  }
  showIntroduce(introduce){
    const views = [];
    if(introduce !== undefined) {
      const list = JSON.parse(introduce);
      list.map((item, index) => {
        if(item.type === 1) {
          views.push(
            <div key={index} className={styles.introduceContent}><pre>{item.content }<br /><br /></pre></div>
          )
        }
        if(item.type === 2) {
          views.push(
            <div key={index}>
              <img src={item.content} width="100%" /><br /><br />
            </div>
          )
        }
      });
    }
    return views;
  }
  render() {
    return (
      <div className={styles.contentOne}>
          <div className={styles.contentOneTitle1}>{this.props.dashInfo.get('title')}</div>
          <div className={styles.contentOneTitle1Line} />
          <div className={styles.contentOneTitle3}>{this.props.dashInfo.get('smallTitle')}</div>
          <div className={styles.introduce}>{this.showIntroduce(this.props.dashInfo.get('introduce'))}</div>
      </div>
    );
  }
}

export default Fellowship;
