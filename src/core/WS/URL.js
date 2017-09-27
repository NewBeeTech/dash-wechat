/* @flow */
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
export const getDashListPath: string = `${host}activity/list`;
/**
 * 获取轮播图列表接口
 * @type {string}
 */
export const getCarouselImgsPath: string = `${host}banner/list`;
/**
 * 获取活动详情接口
 * @type {string}
 */
export const getDashInfoPath: string = `${host}activity/getById`;
/**
 * 活动收藏
 * @type {string}
 */
export const chargeIsWantPath: string = `${host}/activity/collect`;
/**
 * 获取用户信息
 * @type {string}
 */

export const getUserInfoPath: string = `${host}user/info`;
/**
 * 用户报名的
 * @type {string}
 */
export const getUserActivityDataPath: string = `${host}activity/my/list`;
/**
 * 用户想去的联谊
 * @type {string}
 */
export const getLikeActivityDataPath: string = `${host}activity/my/collect`;
/**
 * 支付获取charge接口
 * @type {string}
 */
export const getChargePath: string = `${host}`;

// 支付接口
export const payPath: string = '';
/**
 * 换一批标签
 * @type {string}
 */
export const getMoreTagsPath: string = `${host}user/tags`;
/**
 * 生成短信验证码
 * @type {string}
 */
export const getMbCodePath: string = `${host}user/getMbCode`;
/**
 * 验证短信验证码
 * @type {string}
 */
export const checkMbCodePath: string = `${host}user/checkMbCode`;
