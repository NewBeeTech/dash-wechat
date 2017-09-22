/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import * as DashListAction from '../actions/DashListAction';
import DashCarousel from '../components/DashCarousel';
import DashCard from '../components/DashCard';
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
           view.push(<DashCard key={key} dashItem={item} />);
        });
      }
      return view;
    }
    return (
      <div style={{ backgroundColor: '#F0F0F0', height: '93vh', overflow: 'scroll', paddingBottom: '5rem'}} >
        <div className={styles.carousel}>
           <DashCarousel carousel={this.props.dashData.get('carouselImgs')}/>
        </div>
        <div>
          {showDashList(this.props.dashData.get('dashList'))}
        </div>
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
