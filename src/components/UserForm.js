/**
 * @flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import type { Dispatch } from '../../actions/types';
import { Picker, List, DatePicker } from 'antd-mobile';
import * as styles from './../assets/stylesheets/mine.css'
import moment from 'moment';

type Props = {
  avator: string,
  wxPortrait: string,
  wxName: string,
  likeCount: number,
  onclikHandler: func,
};
const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121',
}, {
  url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
  id: '2122',
}];

const maxDate = moment('2016-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2015-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);

class UserForm extends React.Component {
  state = {
    phone: null,
    sex: [],
    birth: null,
    height: null,
  }
  componentWillMount() {
  }
  props: Props;
  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  }
  render() {
    const { files } = this.state;
    return (
      <div>
        <form>
          <div className={styles.inputDiv}>
            <span className={styles.item}>手&nbsp;&nbsp;机</span>
            <span className={styles.itemBorder} />
            <span className={styles.itemForm}><input value={this.state.phone}/></span>
          </div>
          <div className={styles.inputDiv}>
            <span className={styles.item}>性&nbsp;&nbsp;别</span>
            <span className={styles.itemBorder} />
            <span className={styles.itemForm}>
              <Picker
                extra="未知"
                data={[
                  {
                    label: '男',
                    value: 1,
                  },
                  {
                    label: '女',
                    value: 2,
                  }]}
                value={this.state.sex}
                cols={1}
                onChange={(e) => this.setState({ sex: e})}
              >
                <List.Item
                  arrow="horizontal"
                  style={{ background: 'none' }}
                >&nbsp;</List.Item>
              </Picker>
            </span>
          </div>
          <div className={styles.inputDiv}>
            <span className={styles.item}>生&nbsp;&nbsp;日</span>
            <span className={styles.itemBorder} />
            <span className={styles.itemForm}>
              <DatePicker
                mode="date"
                extra="请选择"
                minDate={minDate}
                maxDate={maxDate}
                value={this.state.birth}
                onChange={(e) => this.setState({ birth: e})}
              >
                <List.Item
                  arrow="horizontal"
                  style={{ background: 'none' }}
                >&nbsp;</List.Item>
              </DatePicker>
            </span>
          </div>
          {console.log(this.state.sex)}
          {this.state.sex[0] === 1 ?
            <div>
              <div className={styles.inputDiv}>
                <span className={styles.item}>身&nbsp;&nbsp;高</span>
                <span className={styles.itemBorder} />
                <span className={styles.itemForm}><input value={this.state.phone}/></span>
              </div>
              <div className={styles.inputDiv}>
                <span className={styles.item}>行&nbsp;&nbsp;业</span>
                <span className={styles.itemBorder} />
                <span className={styles.itemForm}><input value={this.state.phone}/></span>
              </div>
              <div className={styles.inputDiv}>
                <span className={styles.item}>职&nbsp;&nbsp;位</span>
                <span className={styles.itemBorder} />
                <span className={styles.itemForm}>
                  <input value={this.state.phone}/>
                </span>
              </div>
              <div className={styles.inputDiv}>
                <span className={styles.item}>收&nbsp;&nbsp;入</span>
                <span className={styles.itemBorder} />
                <span className={styles.itemForm}>
                  <Picker
                    extra="请选择"
                    data={[
                      {
                        label: '5万以下',
                        value: 1,
                      },
                      {
                        label: '5万-10万',
                        value: 2,
                      },
                      {
                        label: '10万-20万',
                        value: 3,
                      },
                      {
                        label: '20-40万',
                        value: 4,
                      },
                      {
                        label: '40万-80万',
                        value: 5,
                      },
                      {
                        label: '80万以上',
                        value: 6,
                      }]}
                    value={this.state.sex}
                    cols={1}
                    onChange={(e) => this.setState({ sex: e})}
                  >
                    <List.Item
                      arrow="horizontal"
                      style={{ background: 'none' }}
                    >&nbsp;</List.Item>
                  </Picker>
                </span>
              </div>
              <div className={styles.inputDiv}>
                <span className={styles.item}>家&nbsp;&nbsp;乡</span>
                <span className={styles.itemBorder} />
                <span className={styles.itemForm}><input value={this.state.phone}/></span>
              </div>
              <div className={styles.inputDiv}>
                <span className={styles.item}>特&nbsp;&nbsp;长</span>
                <span className={styles.itemBorder} />
                <span className={styles.itemForm}><input value={this.state.phone}/></span>
              </div>
            </div>
          : ''}
          <div style={{ width: '84vw', border: '2px solid #f3f3f3', margin: '5vw auto' }} />
        </form>
      </div>
    );
  }
}

export default UserForm;
