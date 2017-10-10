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
import { createForm } from 'rc-form';

type Props = {
  originPhone: string,
  phone: string,
  sex: Array,
  birth: string,
  height: string,
  position: string,
  hometown: string,
  profession: string,
  income: Array,
  hometown: string,
  var4: string,
  code: string,
  wxAccount: string,
};

const maxDate = moment('2001-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('1970-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);

class UserForm extends React.Component {
  state = {
    wait: 60,
    send: true,
  }
  componentWillMount() {
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.tab === 'edit' && nextProps.tab === '') {
      this.setState({
        wait: 60,
        send: true,
      });
    }
    if(this.props.tab === '' && nextProps.tab === 'edit') {
      this.setState({
        wait: 60,
        send: false,
      });
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  props: Props;
  handleClick() {
    if(this.checkMobile(this.props.phone)){
      if(this.state.send){
        dispatch(MineAction.getMbCode({ mobile: this.props.phone }));
        this.state.send = false;
        this.timer = setInterval(function () {
          var wait = this.state.wait;
          // this.state.send = false;
          wait -= 1;
          if (wait < 1) {
            this.setState({
              send: true
            });
            wait = 60;
            clearTimeout(this.timer);
          }
          this.setState({
            wait,
          });
        }.bind(this), 1000);
      }
    }
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
    const { getFieldProps } = this.props.form;
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
                defaultValue={this.props.phone}
                onChange={(e) => {
                  this.props.changeCell(e.target.value, 'phone');
                  // this.setState({phone: e.target.value})
                }}
              /></span>
          </div>
          {this.props.phone !== this.props.originPhone ?
            <div className={styles.inputDiv}>
              <span className={styles.item}>验证码</span>
              <span className={styles.itemBorder} />
              <span className={styles.code}><input
                defaultValue={this.props.code}
                onChange={(e) => {
                  this.props.changeCell(e.target.value, 'code');
                }}
              /></span>
              <span
                style={ this.state.send ? {} : { backgroundColor: '#e7e7e7'}}
                className={styles.sendCode}
                onClick={() => this.handleClick()}
              >{text}
              </span>
            </div> : <div />
          }
          <div className={styles.inputDiv}>
            <span className={styles.item}>微信号</span>
            <span className={styles.itemBorder} />
            <span className={styles.itemForm}>
              <input
                defaultValue={this.props.wxAccount}
                onChange={(e) => {
                  this.props.changeCell(e.target.value, 'wxAccount');
                  // this.setState({phone: e.target.value})
                }}
              /></span>
          </div>
          <div className={styles.inputDiv}>
            <span className={styles.item}>性&nbsp;&nbsp;&nbsp;别</span>
            <span className={styles.itemBorder} />
            <span className={styles.itemForm}>
              <Picker
                data={[
                  {
                    label: '请选择',
                    value: 0,
                  },
                  {
                    label: '男',
                    value: 1,
                  },
                  {
                    label: '女',
                    value: 2,
                  }]}
                {...getFieldProps('sex', {
                   initialValue: this.props.sex,
                   onChange: (e) => this.props.changeCell(e, 'sex'),
                 })}
                // defaultValue={this.props.sex}
                cols={1}
                // onChange={(e) => this.props.changeCell(e, 'sex')}
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
                {...getFieldProps('birth', {
                   initialValue: this.props.birth ? moment(this.props.birth) : '',
                   onChange: (e) => this.props.changeCell(e, 'birth'),
                 })}
                // value={this.props.birth ? moment(this.props.birth) : ''}
                // onChange={(e) => {
                //   this.props.changeCell(e, 'birth')
                // }}
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
          {this.props.sex[0] === 1 ?
            <div>
              <div className={styles.inputDiv}>
                <span className={styles.item}>身&nbsp;&nbsp;&nbsp;高</span>
                <span className={styles.itemBorder} />
                <span className={styles.itemForm}>
                  <input
                    defaultValue={this.props.height}
                    onChange={(e) => {
                      this.props.changeCell(e.target.value, 'height');
                    }}
                  />
                </span>
              </div>
              <div className={styles.inputDiv}>
                <span className={styles.item}>行&nbsp;&nbsp;&nbsp;业</span>
                <span className={styles.itemBorder} />
                <span className={styles.itemForm}>
                  <input
                    defaultValue={this.props.profession}
                    onChange={(e) => {
                      this.props.changeCell(e.target.value, 'profession');
                    }}
                  />
                </span>
              </div>
              <div className={styles.inputDiv}>
                <span className={styles.item}>职&nbsp;&nbsp;&nbsp;位</span>
                <span className={styles.itemBorder} />
                <span className={styles.itemForm}>
                  <input
                    defaultValue={this.props.position}
                    onChange={(e) => {
                      this.props.changeCell(e.target.value, 'position');
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
                        label: '请选择',
                        value: 0,
                      },
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
                    {...getFieldProps('income', {
                       initialValue: this.props.income,
                       onChange: (e) => this.props.changeCell(e, 'income'),
                     })}
                    // value={this.props.income}
                    cols={1}
                    // onChange={(e) => this.props.changeCell(e, 'income')}
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
                    defaultValue={this.props.hometown}
                    onChange={(e) => {
                      this.props.changeCell(e.target.value, 'hometown')
                    }}
                  />
                </span>
              </div>
            </div>
          : ''}
          <div className={styles.inputDiv}>
            <span className={styles.item}>吸引异性的特质</span>
            <span className={styles.itemBorder} />
            <span className={styles.itemForm}>
              <input
                defaultValue={this.props.var4}
                onChange={(e) => {
                  this.props.changeCell(e.target.value, 'var4')
                }}
              />
            </span>
          </div>
          <div style={{ width: '84vw', border: '2px solid #f3f3f3', margin: '5vw auto' }} />
        </form>
      </div>
    );
  }
}

export default createForm()(UserForm);
