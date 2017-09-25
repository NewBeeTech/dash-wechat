/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import * as DashListAction from '../actions/DashListAction';
import DashCarousel from '../components/DashCarousel';
import DashCard from '../components/DashCard';
import DashTabbar from '../components/DashTabbar';
import type { Dispatch } from '../../actions/types';
import { redux, decorators } from 'amumu';
import * as styles from '../assets/stylesheets/dashList.css';

@redux.ConnectStore
@decorators.Loading(process.env.DEVICE)
@decorators.PureComponent
class DashList extends React.Component {
  static propTypes = {
    openid: PropTypes.string,
    dashData: PropTypes.instanceOf(Immutable.Map).isRequired,
    isFetching: PropTypes.bool,
  };
  render() {
    const showDashList = (dashList) => {
      const view = [];
      if(dashList) {
        dashList.map((item, key) => {
           view.push(<DashCard key={key} dashItem={item} dispatch={this.props.dispatch} />);
        });
      }
      return view;
    }
    return (
      <div>
        <div style={{ backgroundColor: '#F0F0F0', height: 'calc(100vh - 14vw)', overflow: 'scroll'}} >
          <div className={styles.carousel}>
             <DashCarousel carousel={this.props.dashData.get('carouselImgs')}/>
          </div>
          <div>
            {showDashList(this.props.dashData.get('dashList'))}
          </div>
        </div>
        <DashTabbar/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dispatch: state.dispatch,
    openid: state.UserReducer.get('openid'),
    status: state.DashListReducer.get('status'),
    isFetching: state.DashListReducer.get('isFetching'),
    dashData: state.DashListReducer.get('dashData'),
  };
};

export default connect(mapStateToProps)(DashList);
