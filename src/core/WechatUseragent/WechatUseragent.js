const whichBrowser = () => {
  const browser = {
    versions: function() {
      const u = navigator.userAgent;
      // var app = navigator.appVersion;
      return {
        // 移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, // IE内核
        presto: u.indexOf('Presto') > -1, // opera内核
        webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
        iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, // 是否iPad
        webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
        weixin: u.indexOf('MicroMessenger') > -1, // 是否微信 （2015-01-22新增）
        qq: u.match(/\sQQ/i) === 'qq', // 是否QQ
      };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase(),
  };
  return browser;
};

export const iosOrAndroidResultHeight = () => {
  if (whichBrowser().versions.ios && whichBrowser().versions.weixin) {
    return 'calc(100vh - 99px)';
  }
  if (whichBrowser().versions.android && whichBrowser().versions.weixin) {
    const fullH = window.innerHeight;
    const h = fullH - 99;
    return `${h}px`;
  }
  if (whichBrowser().versions.webKit) {
    return 'calc(100vh - 99px)';
  }
  return 'calc(100vh - 99px)';
};

export const iosOrAndroidHistoryHeight = () => {
  if (whichBrowser().versions.ios && whichBrowser().versions.weixin) {
    const sH = screen.availHeight;
    if (sH >= 1 && sH < 500) {
      return 'calc(100vh - 99px)';
    }
    if (sH >= 501 && sH < 600) {
      return 'calc(100vh - 159px)';
    }
    if (sH >= 601 && sH < 700) {
      return 'calc(100vh - 199px)';
    }
    if (sH >= 701 && sH < 800) {
      return 'calc(100vh - 249px)';
    }
  }
  return 'auto';
};
