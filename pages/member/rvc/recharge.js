// pages/member/rvc/recharge.js
var t = getApp(),
  a = t.requirejs("core");
var f = getApp();

var useropenid = "";
var str = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: t.globalData.appimg,
    showIcon: true,
    gloheight: t.globalData.gloheight,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;

    this.setData({
      show: !0,
      record:-1
    })
  },

  formName: function (e) {
    var m = this;
    str = e.detail.value;
    var num = str.indexOf('.');
   
    if(num != -1){
      var long = str.length;
      var errand = long-num-1;
      if (errand >=6){
        m.setData({
          record: long
        })
      }
    }
  },

  paybtn:function(e){
    if (str.length == undefined || str == 0 || str < 0.001){
      wx.showToast({
        title: '请输入充值数量！',
        icon: 'none',
        duration: 2000
      })
    }else{
      a.get("game.rvc_pay", {
        openid: useropenid,
        amount: str
      }, function (e) {
        console.log(e);
        if(e.error == 0){
          wx.navigateTo({
            url: '/pages/member/webview/webview?str='+e.data.payUrl,
          })
        }else if(e.error == 1){
          wx.showToast({
            title: e.message,
            icon: 'none',
            duration: 2000
          })
        }
      });
      
    }
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