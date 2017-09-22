import moment from 'moment';
/**
 *@getValueDate 获取当前日期
 *return string 今天的年月日
**/
export const getValueDate = () => {
  const date = new Date();
  const month = `0${(date.getMonth() + 1)}`;
  const day = `0${date.getDate()}`;
  const time = `${date.getFullYear()}年${month.substr(-2, 2)}月${day.substr(-2, 2)}日`;
  return time;
};

// 将时间格式转为字符串
export const toDateString = (data) => {
  const date = new Date(data);
  const month = `0${(date.getMonth() + 1)}`;
  const day = `0${date.getDate()}`;
  const time = `${date.getFullYear()}-${month.substr(-2, 2)}-${day.substr(-2, 2)}`;
  return time;
};

export const getDateString = (data) => {
  const dateArray = data.split('-');
  const year = dateArray[0];
  const month = dateArray[1].length === 1 ? `0${dateArray[1]}` : dateArray[1];
  const day = dateArray[2].length === 1 ? `0${dateArray[2]}` : dateArray[2];
  return `${year}-${month}-${day}`;
};

// 获取中文时间显示
export const getChinaDate = (dateString) => {
  if (dateString) {
    const data = dateString.split('-');
    return `${data[0]}年${data[1]}月${data[2]}日`;
  }
  return false;
};

// 获取中文time显示
export const getChinaTime = (dateString) => {
  if (dateString) {
    const data = dateString.split(':');
    return `${data[0]}时${data[1]}分`;
  }
  return false;
};

// 获取上下午
export const getTimeType = (dateString) => {
  if (dateString === '09:00:00') {
    return '上午';
  }
  if (dateString === '15:00:00') {
    return '下午';
  }
  return '';
};

export const getBirthday = (dateString) => {
  if (dateString === '0000-00-00 00:00:00' || !dateString) {
    return '';
  }
  const arr = dateString.split('-');
  const time = `${arr[0]}年${arr[1].replace(/\b(0+)/gi, '')}月`;
  return time;
};

export const getBirthdayData = (dateString) => {
  console.log(dateString);
  const arr = dateString.split('年');
  const twoArr = arr[1].split('月');
  const month = `0${twoArr[0]}`.substr(-2, 2);
  const time = `${arr[0]}-${month}-01 00:00:00`;
  return time;
};
