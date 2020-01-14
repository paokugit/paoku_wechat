var t = getApp(),
  a = t.requirejs("core"),
  e = t.requirejs("jquery");

var useropenid = "";

var ticketId = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: t.globalData.appimg,
    showIcon: true,
    gloheight: t.globalData.gloheight,
    message:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = t.getCache('userinfo');
    useropenid = userinfo.openid;

    ticketId = options.id;
  },

  dataList:function(){
    var t = this;
    wx.request({
      url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=myown.shophome.coupon_detail&comefrom=wxapp',
      data: {
        id: ticketId,
        openid: useropenid
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data);
        if (res.data.error == 0) {
          t.setData({
            show: !0,
            message: res.data.data
          })
        } else if (res.data.error == 1) {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  getBtn:function(e){
    var r = this;
    console.log(e.target.dataset.quanid);
    wx.request({
      url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=myown.shophome.coupon_receive&comefrom=wxapp',
      data: {
        id: e.target.dataset.quanid,
        openid: useropenid
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data);
        if (res.data.error == 0) {
          r.onShow();
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        } else if (res.data.error == 1) {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
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
    this.dataList();
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