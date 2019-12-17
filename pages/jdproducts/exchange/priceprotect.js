// pages/discount/zkbaccount/zkbaccount.js
var a, e, i = getApp(),
  s = i.requirejs("core");
//   当前登录人的openid
var f = getApp();
var t = getApp(),
  a = t.requirejs("core");
var useropenid = ''
var conbind = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: i.globalData.appimg,
    showIcon: true,
    gloheight: i.globalData.gloheight,
    type: 1,
    isopen: !1,
    page: 1,
    show: !0,
  },
  /**
   * 生命周期函数--监听页面加载
   */

  // 上拉加载
  onLoad: function(a) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid


  },
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
  },
  onReachBottom: function() {

  },
  myTab: function(t) {
    console.log(t)
    console.log(a.pdata(t))
    var e = this,
      i = a.pdata(t).type;
    e.setData({
      type: i,
      page: 1,
      list: [],
      loading: !0
    });
  }
})