import React from 'react';
import { Picker, List, DatePicker, Toast } from 'antd-mobile';
import moment from 'moment';

const maxDate = moment('2001-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('1970-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);

class SexPicker extends React.PureComponent {
  render() {
    return (
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
        {...this.props.getFieldProps('sex', {
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
    );
  }

}

export default SexPicker;
