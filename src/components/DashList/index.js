/* @flow */
import { connect } from 'react-redux';
import DashList from './DashList';

export const mapStateToProps = (state: Object): Object => ({
  dispatch: state.dispatch,
  openid: state.UserReducer.get('openid'),
  status: state.DashListReducer.get('status'),
  isFetching: state.DashListReducer.get('isFetching'),
  dashData: state.DashListReducer.get('dashData'),
});

export default connect(mapStateToProps)(DashList);
