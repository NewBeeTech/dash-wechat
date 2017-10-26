/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import * as DashListAction from '../actions/DashListAction';
import * as MineAction from './../actions/MineAction';
import DashCard from '../components/DashCard';
import DashTabbar from '../components/DashTabbar';
import type { Dispatch } from '../../actions/types';
import { redux, decorators } from 'amumu';
import * as styles from '../assets/stylesheets/dashList.css';
import ListComponents from '../components/ListComponents';
import * as WechatAuthAction from '../actions/WechatAuthAction';

@redux.ConnectStore
@decorators.Loading(process.env.DEVICE)
@decorators.PureComponent
class DashList extends React.Component {
  static propTypes = {
    openid: PropTypes.string,
    dashData: PropTypes.instanceOf(Immutable.Map).isRequired,
    isFetching: PropTypes.bool,
    pageNum: PropTypes.number,
    pageSize: PropTypes.number,
    hasMore: PropTypes.bool,
  };
  constructor(props: Object) {
    super(props);
    this.state = {
      weConfig: '',
    };
  }
  componentWillMount() {
    // 获取轮播图片
    this.props.dispatch(DashListAction.getCarouselImgsData({ type: 1 }));
    // 获取活动列表
    this.props.dispatch(DashListAction.getDashListData(
      { pageNum: this.props.pageNum, pageSize: this.props.pageSize, status: 1 }
    ));
    this.props.dispatch(MineAction.getUserInfo());
    const timestamp = this.props.timestamp;
    const nonceStr = this.props.nonceStr;
    const signature = this.props.signature;
    this.state.timestamp = timestamp;
    this.state.nonceStr = nonceStr;
    this.state.signature = signature;
    this.setState({
      ...this.state,
    });
    this._getWeConfig(location.href.split('#')[0]);
    this._weChatShare();
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.signature && nextProps.timestamp && nextProps.nonceStr && nextProps.signature) {
      const timestamp = nextProps.timestamp;
      const nonceStr = nextProps.nonceStr;
      const signature = nextProps.signature;
      this.state.timestamp = timestamp;
      this.state.nonceStr = nonceStr;
      this.state.signature = signature;
      this.setState({
        ...this.state,
      });
      this._weChatShare();
    }
  }
  componentWillUnmount() {
    this.props.changeAction('DashListReducer/dashData/dashList',
      Immutable.fromJS([]));
    this.props.changeAction('DashListReducer/pageNum', 1);
  }
  _getWeConfig(currentURL) {
    this.props.dispatch(
      WechatAuthAction.getWeConfigDate({ url: currentURL })
    );
  }
  _weChatShare() {
    if(this.state.timestamp) {
      window.wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx186971588dd1f238', // 必填，企业号的唯一标识，此处填写企业号corpid
        timestamp: this.state.timestamp, // 必填，生成签名的时间戳
        nonceStr: this.state.nonceStr, // 必填，生成签名的随机串
        signature: this.state.signature,// 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      window.wx.ready(() => {
        window.wx.onMenuShareTimeline({
          title: "我们做个社交产品，就是因为看不惯其他一切社交产品",
          link: "http://dashooo.com/wx/index.html#/dash-list?_k=qze0fo",
          imgUrl: "http://dash.oss-cn-beijing.aliyuncs.com/fe/logo02.png",
        });
        window.wx.onMenuShareAppMessage({
          title: `「那个小子必须死」联谊`,
          desc: "我们做个社交产品，就是因为看不惯其他一切社交产品",
          link: "http://dashooo.com/wx/index.html#/dash-list?_k=qze0fo",
          imgUrl: "http://dash.oss-cn-beijing.aliyuncs.com/fe/logo02.png",
          type: 'link',
          dataUrl: '',
        });
        window.wx.error((res) => {
          console.log('wx.error: ', JSON.stringify(res));
        });
      });
    }
  }
  render() {
    return (
      <div>
        <div style={{ backgroundColor: '#F0F0F0', height: 'calc(100vh - 14vw)', overflow: 'hidden' }} >
          <div>
            <ListComponents
                dispatch={this.props.dispatch}
                dataSource={this.props.dashData.get('dashList')}
                carouselImgs={this.props.dashData.get('carouselImgs')}
                compontent={[DashCard]}
                loadAction={() => {
                  if(this.props.hasMore) {
                    let pageNum = this.props.pageNum;
                    const pageSize = this.props.pageSize;
                    // 获取活动列表
                    this.props.dispatch(DashListAction.getDashListData(
                      {pageNum: ++pageNum, pageSize }
                    ));
                  }
                }}
                hasMore={this.props.hasMore}
            />
           </div>
        </div>
        <DashTabbar selected={1} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dispatch: state.dispatch,
    status: state.DashListReducer.get('status'),
    isFetching: state.DashListReducer.get('isFetching'),
    dashData: state.DashListReducer.get('dashData'),
    pageNum: state.DashListReducer.get('pageNum'),
    pageSize: state.DashListReducer.get('pageSize'),
    hasMore: state.DashListReducer.get('hasMore'),
    timestamp: state.UserReducer.get('timestamp'),
    nonceStr: state.UserReducer.get('nonceStr'),
    signature: state.UserReducer.get('signature'),
  };
};

export default connect(mapStateToProps)(DashList);
