var t = getApp(),
  a = t.requirejs("core"),
  s = t.requirejs("jquery");
var f = getApp();

var useropenid = "";
var refund_id = '';//售后id
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: t.globalData.appimg,
    showIcon: true,
    gloheight: t.globalData.gloheight,

    schedule:'',
    orderid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;

    console.log(options);
    refund_id = options.id;
    this.setData({  
      orderid:options.orderid
    })

    this.datalist();
  },


  datalist:function(){
    var t = this;
    wx.request({
      url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=group.order.sale_progress&comefrom=wxapp',
      data: {
        refund_id: refund_id,
        openid:useropenid
      },
      success: function (res) {
        console.log(res);
        t.setData({
          show: !0
        });
        if (res.data.error == 0) {
          t.setData({
            schedule:res.data.data
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    });
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