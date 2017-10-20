/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import { ListView } from 'antd-mobile';
import * as styles from '../assets/stylesheets/dashList.css';
import DashCarousel from '../components/DashCarousel';
const Cry = require('../assets/images/cry.jpg');

class ListComponents extends React.Component {
  static propTypes = {
    dataSource: PropTypes.instanceOf(Immutable.List).isRequired,
    carouselImgs:  PropTypes.instanceOf(Immutable.List).isRequired,
    loadAction: PropTypes.func,
    dispatch: PropTypes.func,
    compontent: PropTypes.array,
    hasMore: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
    this.state = {
      dataSource: dataSource.cloneWithRows({}),
      isLoading: true,
    }
  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(JSON.parse(JSON.stringify(this.props.dataSource))),
      isLoading: false,
    })
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.dataSource !== this.props.dataSource && nextProps) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(JSON.parse(JSON.stringify(nextProps.dataSource))),
        isLoading: false,
      })
    }
  }

  onEndReached = (event) => {
    //加载Action
    if(this.props.hasMore) {
      this.setState({isLoading: true });
      this.props.loadAction();
    }
    return;
  }
  render() {
    const row = (dataRow) => {
      const ComponentsCurrent = this.props.compontent[0];
      return (
        <div key={dataRow.id}>
            <ComponentsCurrent key={dataRow.id} dashItem={Immutable.Map(dataRow)} dispatch={this.props.dispatch} />
        </div>
      )
    }
    return (
      <div style={{ width: '100%', backgroundColor: '#F0F0F0' }}>
      <ListView ref="lv"
        className={styles.myList}
        renderHeader={() =>
          <div className={styles.carousel} style={{ width: '100vw' }}>
             <DashCarousel carousel={this.props.carouselImgs} />
          </div>
        }
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ?
            '加载更多...' :
             <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'center' }}>
               <div>没有更多联谊咯</div>
               <img src={Cry} style={{ width: '5vw', height: '5vw'}}/>
             </div>
           }
        </div>)}
        renderRow={row}
        style={{
          height: '90vh',
          overflow: 'auto',
          marginBottom: '20vh',
        }}
        pageSize={4}
        scrollRenderAheadDistance={500}
        scrollEventThrottle={100}
        onEndReached={() => this.onEndReached()}
        onEndReachedThreshold={10} // 什么时候调用 onEndReached 方法
      />
    </div>);
  }
}

export default ListComponents;
