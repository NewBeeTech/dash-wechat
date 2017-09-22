/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import * as styles from '../assets/stylesheets/dashList.css';
import Boy from '../assets/images/boy.svg';
import Girl from '../assets/images/girl.svg';

class PayPage extends React.PureComponent {
  static propTypes = {
    openid: PropTypes.string,
  };
  render() {
    const showNum = (num) => {
      if(num > 0) {
        return `余${num}位`;
      }
      return '报名已满'
    }
    const dashItem = JSON.parse(JSON.stringify(this.props.dashData.get('dashList')))[this.props.index];
    return (
      <div style={{ backgroundColor: '#EEEEEE', height: '93vh'}} >
          {/*pay title*/}
         <div>
               <div className={styles.dashNum}>
                  <Boy className={styles.dashImg}/>
                  <div className={styles.dashBoy}>男士：{showNum(dashItem.boyNum)}</div>
                  <Girl className={styles.dashImg}/>
                  <div>女士：{showNum(dashItem.girlNum)}</div>
               </div>
              <div></div>
         </div>
         {/*pay content*/}
         <div></div>
         {/*pay type*/}
         <div></div>
         {/*pay button*/}
         <div></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dispatch: state.dispatch,
    openid: state.UserReducer.get('openid'),
    dashData: state.DashListReducer.get('dashData'),
    index: state.DashListReducer.get('index'),
  };
};

export default connect(mapStateToProps)(PayPage);
