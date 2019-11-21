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

    credit: '',
    come_total: '',
    frozen_credit: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;

    this.rvcindex();
  },

  rvcindex:function(){
    var t = this
    a.get('member/log/member_RVC', {
      openid: useropenid
    }, function (e) {
      console.log(e)
      t.setData({
        credit: e.info.RVC,
        come_total: e.info.come_total,
        frozen_credit: e.info.sale_total
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
    this.rvcindex();
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