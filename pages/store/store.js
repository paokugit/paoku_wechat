// pages/store/store.js
var t = getApp(), a = t.requirejs("core");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: app.globalData.appimg,
    showIcon: true,
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
    ],
    carouselList: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
    ],
    autoplay: true,
    interval: 5000,
    duration: 1000,
    swiperCurrent: 0,
    dots:true,
    type: 0,
    select:0,
    page: 1,
    loaded: !1,
    loading: !0,
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      show: !0,
    })
    this.getList()
  },
  swiperChange: function(e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  getList: function () {
    var t = this;
    console.log(t.data.type)
    console.log(t.data.select)
    t.setData({
      loading: !0
    }), a.get("member/log/get_list2", {
      type: t.data.type,
      page: t.data.page
    }, function (a) {
      var e = {
        loading: !1,
        total: a.total,
        show: !0
      };
      if (1 == t.data.page) {
        e.isopen = a.isopen;
        var i = "卡路里明细";
        wx.setNavigationBarTitle({
          title: i
        });
      }
      a.list || (a.list = []), a.list.length > 0 && (e.page = t.data.page + 1, e.list = t.data.list.concat(a.list),
        a.list.length < a.pagesize && (e.loaded = !0)), t.setData(e);
    });
  },
  myTab: function (t) {
    console.log(t)
    var e = this, i = a.pdata(t).type;
    e.setData({
      type: i,
      page: 1,
      list: [],
      loading: !0
    }), e.getList();
  },
  myselect: function (t) {
    console.log(t)
    var ee = this, i = a.pdata(t).select;
    ee.setData({
      select: i,
      page: 1,
      
      loading: !0
    }), ee.getList();
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