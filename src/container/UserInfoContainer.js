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
import * as WechatAuthAction from './../actions/WechatAuthAction';
var Base64 = require('js-base64').Base64;

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
  timestamp: string | number,
  nonceStr: string,
  signature: string,
};
class UserInfoContainer extends React.Component {
  constructor(props: Object) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    if(Number(this.props.params.tab)) {
      dispatch(MineAction.getUserInfoById({ id: this.props.params.tab }));
    }
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
    const timestamp = this.props.timestamp;
    const nonceStr = this.props.nonceStr;
    const signature = this.props.signature;
    this.state.timestamp = timestamp;
    this.state.nonceStr = nonceStr;
    this.state.signature = signature;
    this.setState({
      ...this.state,
    });
    this._getWeConfig(
      location.href.split('#')[0]
      // location.origin + location.pathname + location.search
    );
    this._weChatShare();
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.params.tab !== nextProps.params.tab || !this.props.userInfo.equals(nextProps.userInfo)) {
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
        income: [nextProps.userInfo.get('income')],
        var4: nextProps.userInfo.get('var4'),
        code: '',
      });
    }
    if(!this.props.moreTags.equals(nextProps.moreTags)) {
      this.setState({
        moreTags: nextProps.moreTags,
      });
    }
    console.log(nextProps);
    if (nextProps.timestamp && nextProps.nonceStr && nextProps.signature) {
      const timestamp = nextProps.timestamp;
      const nonceStr = nextProps.nonceStr;
      const signature = nextProps.signature;
      this.state.timestamp = timestamp;
      this.state.nonceStr = nonceStr;
      this.state.signature = signature;
      this.setState({
        ...this.state,
      });
      console.log(this.state);
      this._weChatShare();
    }
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   return shallowCompare(this, nextProps, nextState);
  // }
  _getWeConfig(currentURL) {
    alert(currentURL);
    this.props.dispatch(
      WechatAuthAction.getWeConfigDate({ url: currentURL })
    );
  }
  _weChatShare() {
    if(this.state.timestamp) {
      window.wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx186971588dd1f238', // 必填，企业号的唯一标识，此处填写企业号corpid
        timestamp: this.state.timestamp, // 必填，生成签名的时间戳
        nonceStr: this.state.nonceStr, // 必填，生成签名的随机串
        signature: this.state.signature,// 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      window.wx.ready(() => {
        wx.checkJsApi({
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
            ]
        });

        // alert(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx186971588dd1f238&redirect_uri=http://dash.sameyou.cn/wx/outh/outh?page=${Base64.encode(`user-info/${this.props.userId}`)}&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`);
        window.wx.onMenuShareTimeline({
          title: '我的个人信息',
          link: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx186971588dd1f238&redirect_uri=http://dash.sameyou.cn/wx/outh/outh?page=${Base64.encode(`user-info/${this.props.userId}`)}&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`,
          imgUrl: `${this.props.userInfo.get('wxPortrait')}`,
        });
        window.wx.onMenuShareAppMessage({
          title: '我的个人信息',
          desc: '',
          link: `http://dash.sameyou.cn/wx/index.html#/user-info/${this.props.userId}?_k=qze0fo)`,
          imgUrl: `${this.props.userInfo.get('wxPortrait')}`,
          type: 'link',
          dataUrl: '',
          trigger: function (res) {
              alert('用户点击分享到朋友',res);
          },
          success: function (res) {
              alert('已分享',res);
          },
          cancel: function (res) {
              alert('已取消',res);
          },
          fail: function (res) {
              alert('wx.onMenuShareTimeline:fail: '+JSON.stringify(res));
          }
        });
        window.wx.error((res) => {
          console.log('wx.error: ', JSON.stringify(res));
        });
      });
    }
  }
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
      sex: String(this.state.sex) ? this.state.sex[0] : '',
      birth: moment(this.state.birth).format('YYYY-MM-DD'),
      photos: this.state.photos,
      var2: this.state.height,
      position: this.state.position,
      profession: this.state.profession,
      var3: this.state.hometown,
      income: String(this.state.income) ? this.state.income[0] : '',
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
              tab={this.props.params.tab}
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
        {
          Number(this.props.params.id) ? '' :
          <EditBar
            text={this.props.params.tab === 'edit' ? '完成了' : '编辑'}
            tab={this.props.params.tab}
            submitHandler={() => this.submitHandler()}
          />
        }
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
    timestamp: state.UserReducer.get('timestamp'),
    nonceStr: state.UserReducer.get('nonceStr'),
    signature: state.UserReducer.get('signature'),
  };
};

export default connect(mapStateToProps)(UserInfoContainer);
