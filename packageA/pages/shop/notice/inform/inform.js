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
    informlist: [],
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid
    this.setData({
      show: !0,
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
    var tt = this
    //系统通知
    a.get("shop.notice.get_list", {
      page: 1,
      openid: useropenid
    }, function(e) {
      console.log(e)
      // if (e.notice > 0) {
      if (e.error == 0) {
        tt.setData({
          // mask: 0,
          informlist: e.list,
          weidux: e.notice,
          xiback: 'block',
        })
      }else{
        // wx.showModal({
        //   title: '',
        //   content: '',
        // })
      }

      // } else {
      //   tt.setData({
      //     // mask: 0,
      //     informlist: e.list,
      //     weidux: e.notice,
      //     xiback: 'none',
      //   })
      // }
    })
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