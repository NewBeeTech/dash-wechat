/**
 * @flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import type { Dispatch } from '../../actions/types';
import { List } from 'antd-mobile';
import * as styles from './../assets/stylesheets/mine.css'

type Props = {
  wxName: string,
  sex: number,
  age: string,
  phone: number,
  wxPortrait: string,
  avator: string,
  tab: string,
  var4: string,
};

const Item = List.Item;
const Brief = Item.Brief;

class UserInfoTitle extends React.Component {
  componentWillMount() {
  }
  props: Props;
  renderAvator(avator) {
    return(
      <div
          style={{
            padding: '1vw',
            borderRadius: '50%',
            backgroundColor: '#ffce3d',
           }}
      >
        <div className={styles.avator}
           style={{
             backgroundSize: 'cover',
             backgroundRepeat: 'no-repeat',
             backgroundImage: `url(${avator})`,
            }}
        />
      </div>
    )
  }
  render() {
    const gender = {0: '', 1: 'http://dash.oss-cn-beijing.aliyuncs.com/fe/mars.png', 2: 'http://dash.oss-cn-beijing.aliyuncs.com/fe/venus.png'};
    function renderImg(gender) {
      console.warn(this.props.sex);
      console.log(gender);
      if (gender == 0) {
        return <div />;
      } else if (gender == 1) {
        return (
          <img style={{ width: '4vw' }} src='http://dash.oss-cn-beijing.aliyuncs.com/fe/mars.png' />
        );
      } else if (gender == 2) {
        return (
          <img style={{ width: '4vw' }} src='http://dash.oss-cn-beijing.aliyuncs.com/fe/venus.png' />
        );
      }
    };
    // const genderImg = {
    //   0: <div />,
    //   1: <img style={{ width: '4vw' }} src='http://dash.oss-cn-beijing.aliyuncs.com/fe/mars.png />,
    //   2: <img style={{ width: '4vw' }} src='http://dash.oss-cn-beijing.aliyuncs.com/fe/venus.png' />,
    // };
    return (
      <List className="my-list">
        <Item
          style={{ height: '40vw' }}
          thumb={this.renderAvator(this.props.avator || this.props.wxPortrait)}
          multipleLine
        >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <span style={{ fontSize: '6vw' }}>{this.props.wxName}</span>&nbsp;&nbsp;
            {gender[this.props.sex] && <img style={{ height: '4vw', width: '4vw', color: '#999' }} src={gender[this.props.sex]}></img>}&nbsp;&nbsp;
          </div>
          <span style={{ fontSize: '4vw', color: '#999' }}>{this.props.age ? `${this.props.age}岁` : ''}</span>
          {
            this.props.tab === 'share' ? '' :
            <Brief style={{ fontSize: '4vw', color: '#999' }}>
              {this.props.var4}
            </Brief>
          }
        </Item>
      </List>
    );
  }
}

export default UserInfoTitle;
