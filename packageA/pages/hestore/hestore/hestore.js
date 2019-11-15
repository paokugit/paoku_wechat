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
    page: 1,
    type: 0,
    loaded: !1,
    loading: !0,
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
  change: function () {
    var hid = this.data.hidden;
    if (hid == true) {
      hid = false;
    }
    else {
      hid = true;
    }
    this.setData({
      hidden: hid // 改变状态
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
  myTab: function (t) {
    console.log(t)
    var e = this, i = a.pdata(t).type;
    e.setData({
      type: i,
      page: 1,
      list: [],
      loading: !0
    });
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