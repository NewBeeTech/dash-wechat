/**
 * @flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import type { Dispatch } from '../../actions/types';
import { Picker, List, DatePicker, Toast } from 'antd-mobile';
import * as styles from './../assets/stylesheets/mine.css'
import moment from 'moment';
import * as MineAction from './../actions/MineAction';
import { dispatch } from './../index';

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

const maxDate = moment('2001-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('1970-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);

class UserForm extends React.Component {
  state = {
    phone: '',
    sex: [],
    birth: '',
    height: '',
    position: '',
    wait: 60,
    send: true,
  }
  componentWillMount() {
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.tab!== nextProps.tab) {
      this.setState({
        wait: 60,
        send: true,
      });
    }
  }
  props: Props;
  handleClick() {
    if(this.state.send){
      this.timer = setInterval(function () {
        var wait = this.state.wait;
        this.state.send = false;
        wait -= 1;
        if (wait < 1) {
          this.setState({
            send: true
          });
          wait = 60;
        }
        this.setState({
          wait,
        });
      }.bind(this), 1000);
    }
  }
  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  }
  checkMobile(mobile) {
    if(!mobile) {
      Toast.info('请填写手机号码', 1);
      return false;
    } else if(!(/^1[3|4|5|7|8]\d{9}$/.test(mobile))) {
      Toast.info('请填写正确的手机号码', 1);
      return false;
    } else {
      return true;
    }
  }
  render() {
    const { files } = this.state;
    const text = this.state.send ? '获取验证码' : this.state.wait + '秒后重发';
    return (
      <div>
        <form>
          <div className={styles.inputDiv}>
            <span className={styles.item}>手&nbsp;&nbsp;&nbsp;机</span>
            <span className={styles.itemBorder} />
            <span className={styles.itemForm}>
              <input
                defaultValue={this.state.phone}
                onChange={(e) => {
                  this.setState({phone: e.target.value})
                }}
              /></span>
          </div>
          <div className={styles.inputDiv}>
            <span className={styles.item}>验证码</span>
            <span className={styles.itemBorder} />
            <span className={styles.code}><input
              defaultValue={this.state.code}
              onChange={(e) => {
                this.setState({code: e.target.value})
              }}
            /></span>
            <span
              className={styles.sendCode}
              onClick={() => {
                if(this.checkMobile(this.state.phone)) {
                  dispatch(MineAction.getMbCode({ mobile: this.state.phone }));
                  this.handleClick()
                }
              }}>{text}
            </span>
          </div>
          <div className={styles.inputDiv}>
            <span className={styles.item}>性&nbsp;&nbsp;&nbsp;别</span>
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
                onChange={(e) => this.setState({ sex: e })}
              >
                <List.Item
                  arrow="horizontal"
                  style={{ background: 'none' }}
                >&nbsp;</List.Item>
              </Picker>
            </span>
          </div>
          <div className={styles.inputDiv}>
            <span className={styles.item}>生&nbsp;&nbsp;&nbsp;日</span>
            <span className={styles.itemBorder} />
            <span className={styles.itemForm}>
              <DatePicker
                format={val => val.format('YYYY.MM.DD')}
                mode="date"
                extra="请选择"
                minDate={minDate}
                maxDate={maxDate}
                value={this.state.birth}
                onChange={(e) => this.setState({ birth: e })}
              >

                <List.Item
                  arrow="horizontal"
                  style={{ background: 'none' }}
                >
                  &nbsp;
                </List.Item>
              </DatePicker>
            </span>
          </div>
          {this.state.sex[0] === 1 ?
            <div>
              <div className={styles.inputDiv}>
                <span className={styles.item}>身&nbsp;&nbsp;&nbsp;高</span>
                <span className={styles.itemBorder} />
                <span className={styles.itemForm}>
                  <input
                    defaultValue={this.state.height}
                    onChange={(e) => {
                      this.setState({code: e.target.height})
                    }}
                  />
                </span>
              </div>
              <div className={styles.inputDiv}>
                <span className={styles.item}>行&nbsp;&nbsp;&nbsp;业</span>
                <span className={styles.itemBorder} />
                <span className={styles.itemForm}>
                  <input
                    defaultValue={this.state.profession}
                    onChange={(e) => {
                      this.setState({code: e.target.profession})
                    }}
                  />
                </span>
              </div>
              <div className={styles.inputDiv}>
                <span className={styles.item}>职&nbsp;&nbsp;&nbsp;位</span>
                <span className={styles.itemBorder} />
                <span className={styles.itemForm}>
                  <input
                    defaultValue={this.state.position}
                    onChange={(e) => {
                      this.setState({code: e.target.position})
                    }}
                  />
                </span>
              </div>
              <div className={styles.inputDiv}>
                <span className={styles.item}>年收入</span>
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
                    value={this.state.income}
                    cols={1}
                    onChange={(e) => this.setState({ income: e})}
                  >
                    <List.Item
                      arrow="horizontal"
                      style={{ background: 'none' }}
                    >&nbsp;</List.Item>
                  </Picker>
                </span>
              </div>
              <div className={styles.inputDiv}>
                <span className={styles.item}>家&nbsp;&nbsp;&nbsp;乡</span>
                <span className={styles.itemBorder} />
                <span className={styles.itemForm}>
                  <input
                    defaultValue={this.state.hometown}
                    onChange={(e) => {
                      this.setState({code: e.target.hometown})
                    }}
                  />
                </span>
              </div>
              <div className={styles.inputDiv}>
                <span className={styles.item}>吸引异性的特质</span>
                <span className={styles.itemBorder} />
                <span className={styles.itemForm}>
                  <input
                    defaultValue={this.state.hometown}
                    onChange={(e) => {
                      this.setState({code: e.target.hometown})
                    }}
                  />
                </span>
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
