// 组合所有组件  root component

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';

const propTypes = {
  children: PropTypes.node,
  dispatch: PropTypes.func,
  openid: PropTypes.string,
};

class RootContainer extends React.PureComponent {
  render() {
    return (
      <div style={{ overflow: 'hidden', width: '100vw', height: '100vh' }}>
        {this.props.children}
        {console.log(this.props.children)}
      </div>
    );
  }
}

RootContainer.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    dispatch: state.dispatch,
    openid: state.UserReducer.get('openid'),
  };
};

export default connect(mapStateToProps)(RootContainer);
