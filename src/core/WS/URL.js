/* @flow */
// let host = window.location.host;
// if (process.env.NODE_ENV === 'development') {
//   host = 'dev.shaco.hsohealth.com/shacoapi';
// }
// if (process.env.NODE_ENV === 'test') {
//   host = 'dev.shaco.hsohealth.com/shacoapi';
// }
export const rootURL: string = 'http://120.27.12.128:80';
/**
 * 获取活动列表接口
 * @type {string}
 */
export const getDashListPath: string = `${rootURL}/activity/list`;
/**
 * 获取轮播图列表接口
 * @type {string}
 */
export const getCarouselImgsPath: string = `${rootURL}/banner/list`;
/**
 * 获取用户信息
 * @type {string}
 */
export const getUserInfoPath: string = '/user/info';

export const getDashInfoPath: string = '/activity/getById';
