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
    expresslist: [{
        time: '2018-2-15',
        step: '退款成功,商家同意退款'
      },
      {
        time: '2018-3-15',
        step: '商家已同意你的退款申请,请耐心等耐'
      },
      {
        time: '2018-4-15',
        step: '你的退款申请已提交'
      }

    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      show: !0,
    })
  },
  onLoad: function(s) {
    console.log(s)
    var s = {
      id: "40803"
    }
    this.setData({
      show: !0,
      options: s
    })
  },
  // get_list: function () {
  //   var t = this;
  //   a.get("order/express", t.data.options, function (e) {
  //     console.log(e)
  //     0 == e.error ? (e.show = !0, t.setData(e)) : a.toast(e.message, "loading");
  //   });
  // },

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