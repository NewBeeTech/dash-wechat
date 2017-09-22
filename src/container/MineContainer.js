// 组合所有组件  root component

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';
import UserPro from './../components/UserPro'
import UserActivityList from './../components/UserActivityList'
import * as styles from './../assets/stylesheets/mine.css';

const propTypes = {
  children: PropTypes.node,
  dispatch: PropTypes.func,
  openid: PropTypes.string,
};

class MineContainer extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  render() {
    const avator = this.props.userInfo.get('photos').split(',')[0];
    return (
      <div className={styles.bg}>
        <UserPro
          wxName={this.props.userInfo.get('wxName')}
          avator={avator}
          wxPortrait={this.props.userInfo.get('wxPortrait')}
          likeCount={this.props.userInfo.get('likeCount')}
          onclikHandler={() => console.log('跳转到用户详情/编辑')}
        />
        <div style={{ marginTop: '2vw' }}>
          <UserActivityList
            todoDash={this.props.activityInfo.get('todoDash')}
            wantToDash={this.props.activityInfo.get('wantToDash')}
            historyDash={this.props.activityInfo.get('historyDash')}
            routeToActivity={() => console.log('活动详情')}
          />
        </div>
      </div>
    );
  }
}

MineContainer.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    dispatch: state.dispatch,
    openid: state.UserReducer.get('openid'),
    userInfo: state.MineReducer.get('userData').get('userInfo'),
    activityInfo: state.MineReducer.get('userData').get('activityInfo'),
  };
};

export default connect(mapStateToProps)(MineContainer);
