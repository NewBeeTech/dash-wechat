// 组合所有组件  root component

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Toast } from 'antd-mobile';
import shallowCompare from 'react-addons-shallow-compare';
import UserInfoTitle from './../components/UserInfoTitle'
import UserTags from './../components/UserTags'
import UploadPic from './../components/UploadPic'
import EditBar from './../components/EditBar'
import UserForm from './../components/UserForm'
import * as styles from './../assets/stylesheets/mine.css';
import * as MineAction from './../actions/MineAction';
import { dispatch } from './../index';
import moment from 'moment';

const propTypes = {
  children: PropTypes.node,
  dispatch: PropTypes.func,
  userId: PropTypes.number,
};
type state = {
  photos: Array,
  phone: string,
  sex: Array,
  birth: string,
  height: string,
  position: string,
  profession: string,
  income: Array,
  hometown: string,
  var4: string,
  code: string,
  tags: Array,
  moreTags: any,
};
class UserInfoContainer extends React.Component {
  componentWillMount() {
    this.setState({
      photos: this.props.userInfo.get('photos').split(','),
      phone: this.props.userInfo.get('phone'),
      sex: [this.props.userInfo.get('sex')],
      birth: this.props.userInfo.get('birth'),
      height: this.props.userInfo.get('var2'),
      position: this.props.userInfo.get('position'),
      profession: this.props.userInfo.get('profession'),
      hometown: this.props.userInfo.get('var3'),
      income: [this.props.userInfo.get('income')],
      var4: this.props.userInfo.get('var4'),
      tags: this.props.userInfo.get('tags').split(','),
      moreTags: this.props.moreTags,
      code: '',
    });
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.params.tab !== nextProps.params.tab) {
      this.setState({
        tags: nextProps.userInfo.get('tags').split(','),
        photos: nextProps.userInfo.get('photos').split(','),
        sex: [nextProps.userInfo.get('sex')],
        birth: nextProps.userInfo.get('birth'),
        phone: nextProps.userInfo.get('phone'),
        height: nextProps.userInfo.get('var2'),
        position: nextProps.userInfo.get('position'),
        profession: nextProps.userInfo.get('profession'),
        hometown: nextProps.userInfo.get('var3'),
        income: nextProps.userInfo.get('income'),
        var4: nextProps.userInfo.get('var4'),
        code: '',
      });
    }
    if(!this.props.moreTags.equals(nextProps.moreTags)) {
      this.setState({
        moreTags: nextProps.moreTags,
      });
    }
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   return shallowCompare(this, nextProps, nextState);
  // }
  changeCell(value, title){
    const item = this.state[title];
    this.state[title] = value;
    this.setState({
      ...this.state,
    });
  }
  deleteTag(index, item) {
    const tags = this.state.tags;
    const moreTags = this.state.moreTags;
    const newMoreTags = moreTags.push(item);
    tags.splice(index, 1);
    this.setState({ tags, moreTags: newMoreTags });
  }
  addTag(index, item) {
    const tags = this.state.tags;
    const moreTags = this.state.moreTags;
    tags.push(item);
    const newMoreTags = moreTags.splice(index, 1);
    this.setState({ tags, moreTags: newMoreTags });
  }
  submitHandler() {
    const tags = [];
    this.state.tags.map((item, index) => {
      if(item) tags.push(item);
      return tags;
    });
    const params = {
      photos: this.state.photos.join(','),
      phone: this.state.phone,
      sex: this.state.sex.length ? this.state.sex[0] : '',
      birth: moment(this.state.birth).format('YYYY-MM-DD'),
      photos: this.state.photos,
      var2: this.state.height,
      position: this.state.position,
      profession: this.state.profession,
      var3: this.state.hometown,
      income: this.state.income.length ? this.state.income[0] : '',
      var4: this.state.var4,
      code: this.state.code,
      id: this.props.userId,
      tags: tags.join(','),
    };
    if(!params.photos) return Toast.info('请上传个人照片!', 1);
    if(!params.phone) {
      return Toast.info('请填写手机号码!', 1);
    } else if(!(/^1[3|4|5|7|8]\d{9}$/.test(params.phone))) {
        return Toast.info('请填写正确的手机号码', 1);
      if(params.phone !== this.props.userInfo.get('phone')) {
        if(!params.code) {
          return Toast.info('请填写验证码!', 1);
        }
      }
    }
    if(params.sex === '') return Toast.info('请选择性别!', 1);
    if(params.sex === 1) {
      if(!params.var2) return Toast.info('请填写身高!', 1);
      if(!params.position) return Toast.info('请填写职位!', 1);
      if(!params.profession) return Toast.info('请填写行业!', 1);
      if(!params.var3) return Toast.info('请填写家乡!', 1);
      if(params.income === '') return Toast.info('请选择收入!', 1);
    }
    console.log(params);
    if(this.state.phone !== this.props.userInfo.get('phone')) {
      dispatch(MineAction.checkMbCode(params));
    } else {
      dispatch(MineAction.updateUserInfo(params));
    }
  }
  render() {
    const avator = this.props.userInfo.get('photos').split(',')[0];
    const birth = this.props.userInfo.get('birth');
    const now = new Date();
    const age = birth ? now.getFullYear() - birth.slice(0, 4) + 1: '';
    return (
      <div>
        <div className={styles.bg} style={{ backgroundColor: '#fff' }}>
          {this.props.params.tab === 'edit' ?
            <UploadPic
              photos={this.state.photos}
              setStatePhotos={(photos) => {
                this.setState({ photos });
              }}
            /> :
            <UserInfoTitle
              wxName={this.props.userInfo.get('wxName')}
              sex={this.props.userInfo.get('sex')}
              age={this.props.userInfo.get('age') || age}
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
            phone={this.state.phone}
            originPhone={this.props.userInfo.get('phone')}
            sex={this.state.sex}
            birth={this.state.birth}
            height={this.state.height}
            position={this.state.position}
            profession={this.state.profession}
            hometown={this.state.hometown}
            income={this.state.income}
            var4={this.state.var4}
            code={this.state.code}
            changeCell={(value, title) => this.changeCell(value, title)}
          /> : ''}
          <UserTags
            moreTags={this.state.moreTags}
            tags={this.state.tags}
            tab={this.props.params.tab}
            deleteTag={(index, item) => this.deleteTag(index, item)}
            addTag={(index, item) => this.addTag(index, item)}
          />
        </div>
        <EditBar
          text={this.props.params.tab === 'edit' ? '完成了' : '编辑'}
          tab={this.props.params.tab}
          submitHandler={() => this.submitHandler()}
        />
      </div>
    );
  }
}

UserInfoContainer.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    dispatch: state.dispatch,
    userId: state.MineReducer.get('userData').get('userInfo').get('id'),
    userInfo: state.MineReducer.get('userData').get('userInfo'),
    moreTags: state.MineReducer.get('tags'),
    activityInfo: state.MineReducer.get('userData').get('activityInfo'),
  };
};

export default connect(mapStateToProps)(UserInfoContainer);
