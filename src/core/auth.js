import { QueryString } from './Util';

const wechatCode = QueryString().code;
const WECHAT_APPID = 'wx4deb7d63144c59f9';
const WECHAT_SECRET = '7bfde98a41343bab6ccd38bc9d94f95a';

async function getOpenId(code) {
  if (code & code !== '') {
    const result = await fetch(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${WECHAT_APPID}&secret=${WECHAT_SECRET}&code=${code}&grant_type=authorization_code`);
    return result.openid;
  }
  return 'cant get openid';
}

export const openid = getOpenId(wechatCode);
