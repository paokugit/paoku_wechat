// pages/jdproducts/jdproducts/list.js
//   当前登录人的openid
var f = getApp();
var t = getApp(),
  a = t.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: f.globalData.appimg,
    showIcon: true,
    gloheight: f.globalData.gloheight,
    type: 0,
    page: 1,
    loaded: !1,
    loading: !0,
    list: [],
    imgUrls: [
      'https://www.paokucoin.com/img/backgroup/grapegruit.png',
      'https://www.paokucoin.com/img/backgroup/guava.png',
      'https://www.paokucoin.com/img/backgroup/orange.png',
      'https://www.paokucoin.com/img/backgroup/peach.png',
    ],
    autoplay: true,
    interval: 5000,
    duration: 1000,
    swiperCurrent: 0,
    dots: true,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (a) {
    this.setData({
      show:!0
    })
  },
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})