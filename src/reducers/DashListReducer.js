/* @flow */
import * as Immutable from 'immutable';
import * as DashListAction from '../actions/DashListAction';
import type { Action } from '../actions/types';
import { getActivityTime, getHaveTime } from '../core/CommonFun/moment';
import { redux } from 'amumu';
const ActionHandler = redux.ActionHandler;
const getPeopleNum = (sexRate, num) => {
  return sexRate - num;
}

type stateType = Immutable.Map< 'isFetching' | 'errMsg' | any, any>;

// defaultState
const defaultState: stateType = Immutable.Map({
  isFetching: false,
  errMsg: '',
  index: 0,
  pageSize: 5,
  pageNum: 1,
  hasMore: true,
  dashData: Immutable.Map({
    dashList: Immutable.List([
      //  Immutable.Map({
      //      id: 1,
      //      address: '望京南',
      //      title: '大标题',
      //      smallTitle: '小标题',
      //      backgroundImg: 'http://dash.oss-cn-beijing.aliyuncs.com/fe/default-banner.jpg',
      //      activityTime: '9/20 (周六) 16：00-19：00',
      //      time: 4,
      //      boyNum: 2,
      //      girlNum: 0,
      //      originatorName: 'XXXXX',
      //      originatorImg: 'https://img.shaka.hsohealth.com/insurance/diet_banner_4_20170206.png',
      //  }),
      //  Immutable.Map({
      //      id: 2,
      //      address: '望京',
      //      title: '大标题',
      //      smallTitle: '小标题', // ?
      //      backgroundImg: 'http://dash.oss-cn-beijing.aliyuncs.com/fe/default-banner.jpg',
      //      activityTime: '9月20日 16：00-19：00',
      //      time: -1,
      //      boyNum: 0,
      //      girlNum: 3,
      //      originatorName: '',
      //      originatorImg: 'http://dash.oss-cn-beijing.aliyuncs.com/fe/default-banner.jpg',
      //  }),
    ]),
    carouselImgs: Immutable.List([
      // Immutable.Map({
      //   img: 'http://dash.oss-cn-beijing.aliyuncs.com/fe/default-banner.jpg',
      //   url: 'www.baodu.com',
      // }),
      // Immutable.Map({
      //   img: 'http://dash.oss-cn-beijing.aliyuncs.com/fe/default-banner.jpg',
      //   url: 'www.baodu.com',
      // }),
      // Immutable.Map({
      //   img: 'http://dash.oss-cn-beijing.aliyuncs.com/fe/default-banner.jpg',
      //   url: 'www.baodu.com',
      // })
    ]),
  }),
});

const getDashListHandler =
new ActionHandler.handleAction(DashListAction.GET_DASHLIST)
  .success((state: stateType, action: Action) => {
    // 拼接数据
    let dashList = state.get('dashData').get('dashList').toJS();
    if(action.data.list.length) {
      action.data.list.map((item) => {
        dashList.push({
          id: item.id,
          address: item.address,
          backgroundImg: item.photos,
          activityTime: getActivityTime(item.startTime, item.endTime),
          time: getHaveTime(item.signupStartTime, item.signupEndTime),
          originatorName: item.originUserName,
          originatorImg: item.originUserPortrait,
          boyNum: item.sexRate ? getPeopleNum(item.sexRate.split(':')[0], item.mCount) : 0,
          girlNum: item.sexRate ? getPeopleNum(item.sexRate.split(':')[1], item.wCount) : 0,
          title: item.name,
        });
      })
    }
    const hasMore = action.data.pageNumber * action.data.pageSize < action.data.totalRow;
    return state.setIn(['dashData', 'dashList'], Immutable.fromJS(dashList))
                .set('pageNum', action.data.pageNumber)
                .set('hasMore', hasMore)
                .set('isFetching', false);
  });
  
  const getCarouselImgsHandler =
  new ActionHandler.handleAction(DashListAction.GET_CAROUSELIMGS)
    .success((state: stateType, action: Action) => {
      // 拼接数据
      let carouselImgs = [];
      if(action.data.length) {
        action.data.map((item) => {
          carouselImgs.push({
            img: item.img,
            url: item.url,
          });
        });
      }
      return state.setIn(['dashData', 'carouselImgs'], Immutable.fromJS(carouselImgs))
                  .set('isFetching', false);
    });


export default ActionHandler.handleActions(
  [
    getDashListHandler,
    getCarouselImgsHandler
  ],
  defaultState,
  /^DashListReducer\//
);
