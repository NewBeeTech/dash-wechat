export const shareTimeline = (title, link, imgUrl) => {
  wx.onMenuShareTimeline({
    title,
    link,
    imgUrl,
  });
  wx.error((res) => {
    console.log('wx.error: ', JSON.stringify(res));
  });
};

export const shareAppMessage = (title, desc, link, imgUrl, type = 'link') => {
  wx.onMenuShareAppMessage({
    title,
    desc,
    link,
    imgUrl,
    type,
  });
  wx.error((res) => {
    console.log('wx.error: ', JSON.stringify(res));
  });
};
