import React from 'react';
import { Picker, List, DatePicker, Toast } from 'antd-mobile';
import moment from 'moment';

const maxDate = moment('2001-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('1970-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);

class AgePicker extends React.PureComponent {
  render() {
    return (
      <DatePicker
        format={val => val.format('YYYY.MM.DD')}
        mode="date"
        extra="请选择"
        minDate={minDate}
        maxDate={maxDate}
        {...this.props.getFieldProps('birth', {
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
    );
  }

}

export default AgePicker;
