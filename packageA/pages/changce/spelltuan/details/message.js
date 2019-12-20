var t = getApp(),
  a = t.requirejs("core");
var f = getApp();

var useropenid = "";


Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: t.globalData.appimg,
    showIcon: true,
    gloheight: t.globalData.gloheight,

    advWidth:0,
    advHeight:0,
    yi_zan: 'circle_parise@2.png',
    wei_zan: 'circle_parise@1.png',
    focusTxt: '关注',
    goodimg: [
      'https://www.paokucoin.com/attachment/images/1/2019/12/R4KRAkTK14CRSK4FZLhHasV7ZSDR1L.jpg',
      'https://www.paokucoin.com/attachment/images/1/2019/12/CXzg4iWrORIIeiirHH4QGIzEhO4Erq.jpg'
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;
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
    var e = this;
    wx.getSystemInfo({
      success: function (t) {
        console.log(t)
        var a = t.windowWidth / 1;
        e.setData({
          advWidth: t.windowWidth,
          advHeight: t.windowWidth
        });
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