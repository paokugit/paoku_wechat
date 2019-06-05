var t = getApp().requirejs("core");
var ii = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: ii.globalData.appimg,
    nickname: '',
    levelname: '',
    createtime: '',
    agentcount: 0,
    mobile: '暂未获取',
    avatar:'',
    background:'#01d7a1',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options.openid)
    t.get("member/member_info", {
      fansopenid: options.openid
    }, function (e) {
      var tel=''
      var headimg=''
      var color=''
      if(e.mobile==''){
        tel = "暂未获取"
        color = '#d7d7d7'
      }else{
        tel=e.mobile
        color = '#01d7a1'
      }
      console.log(e)
      that.setData({
        nickname: e.nickname,
        levelname: e.levelname,
        createtime: e.createtime,
        agentcount: e.agentcount,
        mobile: tel,
        avatar: e.avatar,
        background:color,
      })
    })
  },
  tel: function (t) {
    var merchphone=''
    console.log(t)
    merchphone = t.currentTarget.dataset.mobile
    console.log(merchphone)
    wx.makePhoneCall({
      phoneNumber: merchphone,
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