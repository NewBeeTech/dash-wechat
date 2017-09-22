/* @flow */
let host = window.location.host;
if (process.env.NODE_ENV === 'development') {
  host = 'dev.shaco.hsohealth.com/shacoapi';
}
if (process.env.NODE_ENV === 'test') {
  host = 'dev.shaco.hsohealth.com/shacoapi';
}
export const rootURL: string = `https://${host}/api/v1/`;
export const commonURL: string = `https://${host}/`;
/**
 * 获取活动列表接口
 * @type {string}
 */
export const getDashListPath: string = '';
/**
 * 获取轮播图列表接口
 * @type {string}
 */
export const getCarouselImgsPath: string = '';