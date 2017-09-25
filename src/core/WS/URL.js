/* @flow */
<<<<<<< HEAD
// let host = window.location.host;
// if (process.env.NODE_ENV === 'development') {
//   host = 'dev.shaco.hsohealth.com/shacoapi';
// }
// if (process.env.NODE_ENV === 'test') {
//   host = 'dev.shaco.hsohealth.com/shacoapi';
// }
let host = window.location.host;
if (process.env.NODE_ENV === 'development') {
  host = 'http://120.27.12.128:80/';
}
if (process.env.NODE_ENV === 'test') {
  host = 'dev.shaco.hsohealth.com/shacoapi';
}
/**
 * 获取活动列表接口
 * @type {string}
 */
export const getDashListPath: string = `${host}/activity/list`;
/**
 * 获取轮播图列表接口
 * @type {string}
 */
export const getCarouselImgsPath: string = `${host}/banner/list`;
/**
 * 获取用户信息
 * @type {string}
 */

export const getDashInfoPath: string = `${host}/activity/getById`;

export const getUserInfoPath: string = `${host}/user/info`;
/**
 * 用户报名的
 * @type {string}
 */
export const getUserActivityDataPath: string = `${host}/activity/my/list`;
/**
 * 用户想去的联谊
 * @type {string}
 */
export const getLikeActivityDataPath: string = `${host}activity/my/collect`;
