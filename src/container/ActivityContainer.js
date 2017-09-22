// 组合所有组件  root component

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';
import Banner from './../components/Banner'
import ActivityTime from './../components/ActivityTime'

const propTypes = {
  children: PropTypes.node,
  dispatch: PropTypes.func,
  openid: PropTypes.string,
};

class ActivityContainer extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  render() {
    return (
      <div>
        <Banner
          leftTopText="" // 活动类型 暂时隐藏
          imgUrl=""
          handlerWantAction={() => {console.log(1)}}
          isWant={false}
        />
        <ActivityTime
          // leftTopText="" // 活动类型 暂时隐藏
          address="望京"
          deadline="4h"
          time="9月20日 16:00-19:00"
        />
      </div>
    );
  }
}

ActivityContainer.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    dispatch: state.dispatch,
    openid: state.UserReducer.get('openid'),
  };
};

export default connect(mapStateToProps)(ActivityContainer);
