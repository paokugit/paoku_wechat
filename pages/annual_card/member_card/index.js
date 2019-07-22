// pages/annual_card/member_card/index.js
var t = getApp(),
  a = t.requirejs("core");
var f = getApp();  

Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: t.globalData.appimg,
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1,
      title: '',
      height: t.globalData.height * 2 + 20,
    },

    nowPage: "firstPage",
    nowIndex: 0,
    tabBar: [
      {
        "text": "年卡中心",
        "tapFunction": "toFirst",
        "active": "active"
      },
      {
        "text": "权益介绍",
        "tapFunction": "toSecond",
        "active": ""
      },
      {
        "text": "我的会员",
        "tapFunction": "toThird",
        "active": ""
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  toFirst() {
    this.setData({
      nowPage: "firstPage",
      nowIndex: 0
    })
  },
  toSecond() {
    this.setData({
      nowPage: "secondPage",
      nowIndex: 1
    })
  },
  toThird(){
    this.setData({
      nowPage: "trailerPage",
      nowIndex: 2
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