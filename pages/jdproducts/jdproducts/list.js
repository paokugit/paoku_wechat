// pages/jdproducts/jdproducts/list.js
//   当前登录人的openid
var f = getApp();
var t = getApp(),
  a = t.requirejs("core");
var useropenid = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: f.globalData.appimg,
    showIcon: true,
    gloheight: f.globalData.gloheight,
    type: 1,
    page: 1,
    loaded: !1,
    loading: !0,
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(a) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid
    a.type > 0 && this.setData({
      type: 1
    }), t.url(a), this.getList();
  },
  
  getList: function() {
    var t = this;
    t.setData({
      loading: !0
    }), a.get("payment/index/rebateRecord", {
      openid: useropenid,
      page: t.data.page,
      type: t.data.type
    }, function(a) {
      console.log(a)
      var e = {
        loading: !1,
        total: a.result.total,
        show: !0,
        credit: a.result.credit3,
        list: a.result.list
      };
      a.result.list || (a.result.list = []), a.result.list.length > 0 && (e.page = t.data.page + 1, e.list = t.data.list.concat(a.result.list),
        a.result.list.length < a.pagesize && (e.loaded = !0)), t.setData(e);
    });
  },
  myTab: function(t) {
    console.log(t)
    console.log(a.pdata(t))
    var e = this,
      i = a.pdata(t).type;
    e.setData({
      type: i,
      page: 1,
      list: [],
      loading: !0
    }), e.getList();
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
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  onReachBottom: function () {
    this.data.loaded || this.data.list.length == this.data.total || this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})