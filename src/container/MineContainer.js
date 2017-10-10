// 组合所有组件  root component

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';
import * as MineAction from './../actions/MineAction';
import UserPro from './../components/UserPro';
import UserActivityList from './../components/UserActivityList'
import DashTabbar from './../components/DashTabbar'
import * as styles from './../assets/stylesheets/mine.css';
import { push } from 'react-router-redux';
import * as RoutingURL from './../core/RoutingURL/RoutingURL';
import { dispatch } from './../index';

const propTypes = {
  children: PropTypes.node,
  dispatch: PropTypes.func,
  openid: PropTypes.string,
};

class MineContainer extends React.Component {
  componentWillMount() {
    // dispatch(MineAction.getUserInfo());
    // dispatch(MineAction.getUserActivityData());
    // dispatch(MineAction.getLikeActivityData());
  }
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  render() {
    const avator = this.props.userInfo.get('photos').split(',')[0];
    return (
      <div>
        <div className={styles.bg}>
          <UserPro
            wxName={this.props.userInfo.get('wxName')}
            avator={avator}
            wxPortrait={this.props.userInfo.get('wxPortrait')}
            likeCount={this.props.userInfo.get('likeCount')}
            onclikHandler={() => dispatch(push(RoutingURL.UserInfo('')))}
          />
          <div style={{ marginTop: '2vw' }}>
            <UserActivityList
              myDash={this.props.activityInfo.get('myDash')}
              wantToDash={this.props.activityInfo.get('wantToDash')}
              routeToActivity={(id, info) => dispatch(push(RoutingURL.ActivityDetails(id, info)))}
            />
          </div>
          <div className={styles.creditCount}>
              <div>信用记录</div>
              <div>{this.props.userInfo.get('creditCount')}</div>
          </div>
        </div>
        <DashTabbar selected={2} />
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
