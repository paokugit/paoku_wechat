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
    attention:0,

    iconA: 'drq_inco_dz_per@2x',
    iconB: 'drq_inco_dz_nor@2x',
    boxShow: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;
  },

  noticeWei:function(){
    var m = this;
    m.setData({
      attention:1
    })
  },
  noticeYi: function () {
    var m = this;
    m.setData({
      attention: 0
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
    this.setData({
      boxShow: 0
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // var animation = wx.createAnimation({
    //   duration: 500,
    //   timingFunction: 'ease',
    //   delay: 0
    // });
    // animation.opacity(1).step();
    this.setData({
      boxShow: 1,
      // ani: animation.export(),
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})