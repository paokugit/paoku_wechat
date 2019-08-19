var a, e, i = getApp(),
  s = i.requirejs("core");
var f = getApp();
var useropenid = ''
var t = getApp(), j = t.requirejs("core"), p = t.requirejs("wxParse/wxParse");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mask: 1,
    globalimg: i.globalData.appimg,
      // 组件所需的参数
      nvabarData: {
          showCapsule: 1, 
          title: '消息中心', 
          height: i.globalData.height * 2 + 20,
      },
    color: '#01d7a1',
    underline: 0,
    color1: '#333333',
    informtitle: '',
    informlist: [],
    weidux: 0,
    sixilist: [],
    sixinw: 0,
    siback: 'none',
    xiback: 'none',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid
    console.log(userinfo);
  },
  assistant: function () {
    var _that = this
    _that.setData({
      color: '#333333',
      color1: '#01d7a1',
      underline: 1,
      mask: 2
    })
  },
  zan_tap: function (e) {
    var d = e.currentTarget.dataset.id
    var _that = this
    s.get("shop.notice.zan", {
      id: d,
      openid: useropenid,
      status: 1
    }, function (e) {

    })
    this.onShow()
  },
  zan_tap1: function (e) {
    var d = e.currentTarget.dataset.id
    var _that = this
    s.get("shop.notice.zan", {
      id: d,
      openid: useropenid,
      status: 0
    }, function (e) {

    })
    this.onShow()
  },

  inform: function () {
    var _that = this
    _that.setData({
      color: '#01d7a1',
      color1: '#333333',
      underline: 0,
      mask: 0
    })
  },
  tiaozhuan: function (e) {
    var ss = e.currentTarget.dataset.id
    wx.navigateTo({
        url: '/packageA/pages/shop/notice/notification/detail?id=' + ss,
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
    var a = this
    var hh = []
    // 私信
    s.get("shop.notice.email", {
      openid: useropenid
    }, function (e) {
      if (e.result.email > 0) {
        a.setData({
          sixilist: e.result.list,
          sixinw: e.result.email,
          siback: 'block',
        })
      } else {
        a.setData({
          sixilist: e.result.list,
          sixinw: e.result.email,
          siback: 'none'
        })
      }
    })
    //系统通知
    s.get("shop.notice.get_list", {
      page: 1,
      openid: useropenid
    }, function (e) {
      hh = e.list
      if (e.notice > 0) {
        a.setData({
          mask: 0,
          informlist: e.list,
          weidux: e.notice,
          xiback: 'block',
        })
      }else{
        a.setData({
          mask: 0,
          informlist: e.list,
          weidux: e.notice,
          xiback: 'none',
        })
      }
    })
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