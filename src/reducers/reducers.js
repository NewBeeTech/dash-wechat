import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

// 引入各reducers
import UserReducer from './UserReducer';


// 状态入口
const appReducers = combineReducers({
  routing: routerReducer,
  UserReducer,
});

export default appReducers;
