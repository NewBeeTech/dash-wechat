/* @flow */
import * as Immutable from 'immutable';
import * as DashListAction from '../actions/DashListAction';
import type { Action } from '../actions/types';
import { getActivityTime } from '../core/CommonFun/moment';
import { redux } from 'amumu';
const ActionHandler = redux.ActionHandler;

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
           time: '5h',
           boyNum: '2',
           girlNum: '0',
           originatorName: 'XXXXX',
           originatorImg: 'https://img.shaka.hsohealth.com/insurance/diet_banner_4_20170206.png',
       }),
       Immutable.Map({
           id: 2,
           address: '望京',
           title: '大标题',
           smallTitle: '小标题',
           backgroundImg: '../assets/images/default-banner.jpg',
           activityTime: '9月20日 16：00-19：00',
           time: '1h',
           boyNum: '2',
           girlNum: '0',
           originatorName: '',
           originatorImg: '../assets/images/default-banner.jpg',
       }),
    ]),
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
    let dashList = [];
    if(action.data.length) {
      action.data.map((item) => {
        dashList.push({
          id: item.id,
          address: item.address,
          activityTime: getActivityTime(item.signupStartTime, item.signupEndTime),
          
        });
      })
    }
    
    return state.setIn(['dashData', 'dashList'], Immutable.fromJS(dashList))
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
