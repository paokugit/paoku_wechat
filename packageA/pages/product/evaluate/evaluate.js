var a, e, i = getApp(),
  s = i.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: i.globalData.appimg,
    showIcon: true,
    loading: !0,
    type: 0,
    page: 1,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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

  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
  myTab: function(t) {
    console.log(t)
    var e = this,
      i = s.pdata(t).type;
    e.setData({
      type: i,
      page: 1,
      list: [],
      loading: !0
    });
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