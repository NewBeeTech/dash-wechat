// 组合所有组件  root component

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';
import UserInfoTitle from './../components/UserInfoTitle'
import UserTags from './../components/UserTags'
import UploadPic from './../components/UploadPic'
import EditBar from './../components/EditBar'
import UserForm from './../components/UserForm'
import * as styles from './../assets/stylesheets/mine.css';

const propTypes = {
  children: PropTypes.node,
  dispatch: PropTypes.func,
  openid: PropTypes.string,
};

class UserInfoContainer extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  render() {
    console.log(this.props.params.tab);
    const avator = this.props.userInfo.get('photos').split(',')[0];
    return (
      <div>
        <div className={styles.bg} style={{ backgroundColor: '#fff' }}>
          {this.props.params.tab === 'edit' ?
            <UploadPic /> :
            <UserInfoTitle
              wxName={this.props.userInfo.get('wxName')}
              sex={this.props.userInfo.get('sex')}
              age={this.props.userInfo.get('age')}
              phone={this.props.userInfo.get('phone')}
              wxPortrait={this.props.userInfo.get('wxPortrait')}
              avator={avator}
            />
          }
          {this.props.params.tab === 'edit' ? '':
          <div style={{ width: '100vw', height: '2vw', backgroundColor: '#f0f0f0' }} />}
          {this.props.params.tab === 'edit' ?
          <UserForm
            tags={this.props.userInfo.get('tags')}
          /> : ''}
          <UserTags
            tags={this.props.userInfo.get('tags').split(',')}
            tab={this.props.params.tab}
          />
        </div>
        <EditBar
          text={this.props.params.tab === 'edit' ? '完成了' : '编辑'}
          tab={this.props.params.tab}
        />
      </div>
    );
  }
}

UserInfoContainer.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    dispatch: state.dispatch,
    openid: state.UserReducer.get('openid'),
    userInfo: state.MineReducer.get('userData').get('userInfo'),
    activityInfo: state.MineReducer.get('userData').get('activityInfo'),
  };
};

export default connect(mapStateToProps)(UserInfoContainer);
