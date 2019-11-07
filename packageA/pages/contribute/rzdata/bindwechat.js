// pages/contribute/rzdata/rzdata.js
var a, e, i = getApp(),
  s = i.requirejs("core");
//   当前登录人的openid
var f = getApp();
var userinfo = f.getCache('userinfo');
var userwechat = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: i.globalData.appimg,
    showIcon: true,
    gloheight: i.globalData.gloheight,
    wechatnum: ''
  },
  inputChange: function(event) {
    console.log(event)
    userwechat = event.detail.value
    console.log(userwechat)
    this.setData({
      wechatnum: event.detail.value
    })
  },
  confirmbtn: function() {
    console.log(this.data.wechatnum)
    if (this.data.wechatnum == ""){
      wx.showModal({
        title: '提示',
        content: '请输入微信号',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var t = this
    t.setData({
      phonenumber: options.number
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