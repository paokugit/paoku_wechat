// pages/order/detail/progress.js
var t = getApp(),
  a = t.requirejs("core");
var f = getApp();
var useropenid = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIcon: true,
    gloheight: t.globalData.gloheight,
    globalimg: t.globalData.appimg,
    infolist: [],
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid
    this.setData({
      show: !0,
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
    var tt = this
    var hh = []
    // 私信
    a.get("shop.notice.email", {
      openid: useropenid
    }, function (e) {
      if (e.result.email > 0) {
        tt.setData({
          infolist: e.result.list,
          sixinw: e.result.email,
          siback: 'block',
        })
      } else {
        tt.setData({
          infolist: e.result.list,
          sixinw: e.result.email,
          siback: 'none'
        })
      }
    })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})