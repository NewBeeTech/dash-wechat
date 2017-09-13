/* @flow weak */

// import fetchp from 'fetch-jsonp';
// import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();
require('isomorphic-fetch');
require('babel-polyfill');
// import 'whatwg-fetch';
import * as URL from './URL';
import { random_string } from '../Util';
import { Toast } from 'antd-mobile';
import * as imgURL from '../../common/imgURL';

/**
 * 将Object转为url params string
 * @param params
 * @returns {string}
 * @private
 */
const _param = (params: {}): string => {
  return Object.keys(params).map((key) => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
  }).join('&');
};

export const GET = async (path: string, params = {}) => {
  const paramsWithToken = Object.assign(
    {},
    params,
  );
  const RequestURL = `${URL.rootURL}${path}?${_param(paramsWithToken)}`;
  try {
    const response = await fetch(RequestURL, {
      method: 'GET',
      headers: {
      },
      mode: 'cors',
    });
    if (response.status >= 500 && response.status < 600) {
      Toast.info('我们正在修复中!', 1);
    }
    const result = await response.json();
    // console.log('get webservice result: ', result);
    return result;
  } catch (err) {
    console.warn(`WSHandler -> GET -> err: ${err}`);
    return {
      errMsg: err,
    };
  }
};

export const POSTJSON = async (path: string, json = {}) => {
  const RequestURL = URL.rootURL + path;
  // console.error('POSTJSON RequestURL', RequestURL);
  // const apiToken = userInfoStorage.getItem('apiToken') ? userInfoStorage.getItem('apiToken') : '';
  const paramsWithToken = Object.assign({}, json);
  const body = JSON.stringify(paramsWithToken);
  try {
    const response = await fetch(RequestURL, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body,
    });
    if (response.status >= 500 && response.status < 600) {
      Toast.info('我们正在修复中!', 1);
    }
    const result = await response.json();
    // console.log('postjson webservice result: ', result);
    return result;
  } catch (err) {
    // console.log(err);
    console.warn(`WSHandler -> POSTJSON -> err: ${err}`);
    return {
      errMsg: err,
    };
  }
};

export const GETURL = (path: string, params : Object = {}) => {
  const paramsWithToken = Object.assign(
    {},
    params,
    // { apiToken: userInfoStorage.getItem('apiToken') }
  );
  const RequestURL = `${URL.rootURL}${path}?${_param(paramsWithToken)}`;
  return RequestURL;
};

export const Upload = (baseURL, params, filename, file) => new Promise((resolve, reject) => {
  if (typeof XMLHttpRequest === 'undefined') {
    return;
  }
  const xhr = new XMLHttpRequest();
  const formData = new FormData();
  if (params) {
    Object.keys(params).map(key => {
      formData.append(key, params[key]);
      return key;
    });
  }
  formData.append('file', file);
  xhr.onload = () => {
  };

  xhr.open('post', baseURL, true);

  if (xhr.upload) {
     // 上传进度
    xhr.upload.onprogress = (e) => {
      if (e.total > 0) {
        e.percent = Math.round(e.loaded / e.total * 100 );
      }
    };
  }
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        resolve(xhr.responseText);
      } else {
        resolve();
      }
    }
  };
  const headers = params.headers || {};
  for (const h in headers) {
    if (headers.hasOwnProperty(h) && headers[h] !== null) {
      xhr.setRequestHeader(h, headers[h]);
    }
  }
  xhr.send(formData);
});


export const UploadFileToOSS = async (params = {}) => {
  console.log(params);
  const signature = await GET(URL.GetOSSSignature, params);
  const localName = `/${random_string(6)}-${params.filename}`;
  // localName = encodeURIComponent(localName);
  let fileURL = `${signature.host}/${signature.dir}${localName}`;
  fileURL = encodeURI(fileURL);

  const uploadParams = {
    name: params.filename,
    key: `${signature.dir}${localName}`,
    policy: signature.policy,
    OSSAccessKeyId: signature.accessid,
    success_action_status: '200',
    callback: signature.callback,
    signature: signature.signature,
  };
  const uploadResult = await Upload(signature.host, uploadParams, localName, params.file);
  if (!uploadResult) {
    fileURL = '';
  }
  const result = {
    filename: params.filename,
    fileURL,
    fileOriginUrl: fileURL,
  };
  return result;
};
