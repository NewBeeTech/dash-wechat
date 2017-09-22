/* @flow */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import * as DashListAction from '../../actions/DashListAction';
import DashCarousel from './DashCarousel';
import type { Dispatch } from '../../actions/types';
import { redux, decorators } from 'amumu';

@redux.ConnectStore
@decorators.Loading(process.env.DEVICE)
@decorators.PureComponent
class DashList extends React.Component {
  static propTypes = {
    openid: PropTypes.string,
    dashData: PropTypes.instanceOf(Immutable.Map).isRequired,
    isFetching: PropTypes.bool,
  };
  componentWillMount() {
    // this.props.dispatch(
    //   DashListAction.getDashListData()
    // );
  }
  render() {
    return (
      <div>
        <div>
           <DashCarousel carousel={this.props.dashData.get('carouselImgs')}/>
        </div>
        <div>list</div>
      </div>
    );
  }
}

export default DashList;
