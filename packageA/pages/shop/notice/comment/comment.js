// pages/order/detail/progress.js
var t = getApp(),
  a = t.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIcon: true,
    gloheight: t.globalData.gloheight,
    globalimg: t.globalData.appimg,
    informlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      show: !0,
      informlist: [{
        time: '2018-2-15',
        step: '郑州市】快件已由【丰巢的新苑都市领地，丰巢智能快递柜】代签收,如有问题请电联客服,感谢您使用中通快递'
      },]
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