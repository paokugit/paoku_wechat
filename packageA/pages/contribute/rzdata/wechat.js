// pages/contribute/rzdata/rzdata.js
var a, e, i = getApp(),
  s = i.requirejs("core");
//   当前登录人的openid
var f = getApp();
var userinfo = f.getCache('userinfo');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: i.globalData.appimg,
    showIcon: true,
    gloheight: i.globalData.gloheight,
    wechatnumber: ''
  },
  gobindbtn: function() {
    wx.navigateTo({
      url: '/pages/member/bind/index?param=' + 3,
    })
  },
  inputChange: function(event) {
    userwechat = event.detail.value
    console.log(userwechat)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var t = this
    t.setData({
      wechatnumber: options.wechatnum
    })
  },
  bindwechat: function() {
    wx.navigateTo({
      url: '/packageA/pages/contribute/rzdata/bindwechat',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})