/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import { ListView } from 'antd-mobile';

class ListComponents extends React.Component {
  static propTypes = {
    dataSource: PropTypes.instanceOf(Immutable.List).isRequired,
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
  onEndReached = (event) => {
    //加载Action
    if (this.state.isLoading && !this.props.hasMore) {
      return;
    }
    this.setState({isLoading: true });
    this.props.loadAction();
  }

  render() {
    const row = (dataRow) => {
      const ComponentsCurrent = this.props.compontent[0];
      return (
        <div key={dataRow.id} className="row">
            <ComponentsCurrent key={dataRow.id} dashItem={Immutable.Map(dataRow)} dispatch={this.props.dispatch} />
        </div>
      )
    }

    return (
      <div style={{ width: '100%', backgroundColor: '#F0F0F0' }}>
      <ListView ref="lv"
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? '加载更多...' : '到底了~'}
        </div>)}
        renderRow={row}
        style={{
          height: document.documentElement.clientHeight - 30,
          overflow: 'auto',
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
