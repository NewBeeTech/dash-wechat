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
  pageNo: 1,
  dashData: Immutable.Map({
    dashList: Immutable.List([
       Immutable.Map({
           id: 1,
           address: '望京南',
           title: '大标题',
           smallTitle: '小标题',
           backgroundImg: '../assets/images/default-banner.jpg',
           activityTime: '9/20 (周六) 16：00-19：00',
           time: 4,
           boyNum: 2,
           girlNum: 0,
           originatorName: 'XXXXX',
           originatorImg: 'https://img.shaka.hsohealth.com/insurance/diet_banner_4_20170206.png',
       }),
       Immutable.Map({
           id: 2,
           address: '望京',
           title: '大标题',
           smallTitle: '小标题', // ?
           backgroundImg: '../assets/images/default-banner.jpg',
           activityTime: '9月20日 16：00-19：00',
           time: -1,
           boyNum: 0,
           girlNum: 3,
           originatorName: '',
           originatorImg: '../assets/images/default-banner.jpg',
       }),
    ]),
    pageNo: 1,
    pageSize: 5,
    carouselImgs: Immutable.List([
      Immutable.Map({
        img: '../assets/images/default-banner.jpg',
        url: 'www.baodu.com',
      }),
      Immutable.Map({
        img: '../assets/images/default-banner.jpg',
        url: 'www.baodu.com',
      }),
      Immutable.Map({
        img: '../assets/images/default-banner.jpg',
        url: 'www.baodu.com',
      })
    ]),
  }),
});

const getDashListHandler =
new ActionHandler.handleAction(DashListAction.GET_DASHLIST)
  .success((state: stateType, action: Action) => {
    // 拼接数据
    let dashList = defaultState.get('dashData').get('dashList');
    if(action.data.length) {
      action.data.dashList.map((item) => {
        dashList.push(Immutable.Map({
          id: item.id,
          address: item.address,
          backgroundImg: item.photos,
          activityTime: getActivityTime(item.startTime, item.endTime),
          time: getHaveTime(item.signupStartTime, item.signupEndTime),
          originatorName: item.originatorName,
          originatorImg: item.originUserPortrait,
          boyNum: getPeopleNum(item.sexRate.split(':')[0], item.mCount),
          girlNum: getPeopleNum(item.sexRate.split(':')[1], item.wCount),
          title: item.name,
        }));
      })
    }
    
    return state.setIn(['dashData', 'dashList'], dashList)
                .setIn(['dashData', 'pageNo'], action.data.pageNo)
                .set('isFetching', false);
  });
  
  const getCarouselImgsHandler =
  new ActionHandler.handleAction(DashListAction.GET_CAROUSELIMGS)
    .success((state: stateType, action: Action) => {
      // 拼接数据
      let carouselImgs = JSON.parse(defaultState.get('dashData').get('carouselImgs'));
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
