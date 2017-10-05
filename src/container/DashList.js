/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import * as DashListAction from '../actions/DashListAction';
import DashCard from '../components/DashCard';
import DashTabbar from '../components/DashTabbar';
import type { Dispatch } from '../../actions/types';
import { redux, decorators } from 'amumu';
import * as styles from '../assets/stylesheets/dashList.css';
import ListComponents from '../components/ListComponents';

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
  componentWillMount() {
    // 获取轮播图片
    this.props.dispatch(DashListAction.getCarouselImgsData({ type: 1 }));
    // 获取活动列表
    this.props.dispatch(DashListAction.getDashListData(
      { pageNum: this.props.pageNum, pageSize: this.props.pageSize, status: 1 }
    ));
  }
  componentWillUnmount() {
    this.props.changeAction('DashListReducer/dashData/dashList',
      Immutable.fromJS([]));
    this.props.changeAction('DashListReducer/pageNum', 1);
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
  };
};

export default connect(mapStateToProps)(DashList);
