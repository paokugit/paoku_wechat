// pages/shop/notice/notification/detail.js
var t = getApp(), e = t.requirejs("core"), a = t.requirejs("wxParse/wxParse");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    createtime:'',
      // 组件所需的参数
      nvabarData: {
          showCapsule: 1,
          title: '消息详情',
          height: t.globalData.height * 2 + 25,
      },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var r = this
    console.log(options)
    var cc = options.id
    e.get("shop.notice.detail",{
      id:cc
    },function(e){
      console.log(e)
      a.wxParse("wxParseData", "html", e.notice.detail, r, "5"), r.setData({
        title:e.notice.title,
        createtime: e.notice.createtime
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