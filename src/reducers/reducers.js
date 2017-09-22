import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

// 引入各reducers
import UserReducer from './UserReducer';
import DashListReducer from './DashListReducer';
import MineReducer from './MineReducer';


// 状态入口
const appReducers = combineReducers({
  routing: routerReducer,
  UserReducer,
  DashListReducer,
  MineReducer,
});

export default appReducers;
