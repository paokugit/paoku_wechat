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
    list: [],
    isFold: true,
    isOpen: false,
    isFold: false, // 是否显示'展开' 默认不显示显示
    img_len:3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      show: !0,
    })
    let _that = this; // 一定要先存this，避免在回调中设置data时报错

    setTimeout(function () {
      let query = wx.createSelectorQuery();
      query.select('.content').boundingClientRect();
      query.exec(function (rect) {
        if (rect[0] === null) {
          return
        } else if (rect[0].height > 100) { // 自定义一个边界高度
          _that.setData({
            isFold: true
          })
        }
      })
    }, 100)
  },
  open() {
    this.setData({
      isOpen: this.data.isOpen ? false : true
    })
  },
  change: function () {
    var hid = this.data.hidden;
    if (hid == true) {
      hid = false;
    }
    else {
      hid = true;
    }
    this.setData({
      hidden: hid // 改变状态
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