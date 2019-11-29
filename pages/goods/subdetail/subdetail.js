var a, e, i = getApp(),
  s = i.requirejs("core");
var WxParse = require('../../../utils/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: i.globalData.appimg,
    content: '',
    showIcon: true,
    gloheight: i.globalData.gloheight

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var a = this
    s.get("myown/devote/detail", {}, function (e) {
      console.log(e)
      a.setData({
        content: WxParse.wxParse('content', 'html', e.message.content, a, 5)
        // content: WxParse.wxParse('content', 'html', '<p>' + e.message.content+'</p>', a, 5)
      })
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