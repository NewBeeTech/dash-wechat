import moment from 'moment';
const weeks = ['日', '一', '二', '三', '四', '五', '六'];
// 获取活动时间
export const getActivityTime = (startTime, endTime) => {
  if(startTime && endTime) {
    const date = moment(startTime).format('MM/DD');
    const week = moment(startTime).format('d');
    const start = moment(startTime).format('HH:mm');
    const end = moment(endTime).format('HH:mm');
    return `${date} (${weeks[week]}) ${start}-${end}`;
  }
}

export const getHaveTime = (startTime, endTime) => {
    let time = -1;
    if(startTime && endTime) {
      const data = moment().isBefore(startTime);
      if(!data) {
        var duration = moment.duration(moment(endTime).diff(moment()));
        var hours = parseInt(duration.asHours());
        if(hours <= 7 && hours >=0) {
           time = hours;
        }
      }
    }
    return time;
}
