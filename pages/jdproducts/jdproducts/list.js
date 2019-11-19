// pages/jdproducts/jdproducts/list.js
//   当前登录人的openid
var f = getApp();
var t = getApp(),
  a = t.requirejs("core");
var useropenid = ''
// 新加
var pricemark = 0;
var salesmark = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: f.globalData.appimg,
    showIcon: true,
    gloheight: f.globalData.gloheight,
    type: 0,
    page: 1,
    loaded: !1,
    loading: !0,
    list: [],
    allPrice: 'sc_tj_icon_jg_nor@2x',
    allSales: 'sc_tj_icon_jg_nor@2x',
    imgA: 'icon_sp@2x',
    imgB: 'icon_hp@2x',
    nowSign: 0,
    imgUrls: [
      'https://www.paokucoin.com/img/backgroup/b-one.jpg',
      'https://www.paokucoin.com/img/backgroup/b-two.jpg',
      'https://www.paokucoin.com/img/backgroup/b-three.jpg',
      'https://www.paokucoin.com/img/backgroup/b-four.jpg',
    ],
    autoplay: true,
    interval: 5000,
    duration: 1000,
    swiperCurrent: 0,
    dots: true,

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
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  checkAllt: function(e) {
    const that = this;
    let mowtxt = e.currentTarget.dataset.now;
    let priceImg;
    let salesImg;
    if (mowtxt == 0) {
      priceImg = 'sc_tj_icon_jg_nor@2x';
      salesImg = 'sc_tj_icon_jg_nor@2x';
      pricemark = 0;
      salesmark = 0;
    } else if (mowtxt == 1) {

      if (pricemark == 0) {
        priceImg = 'sc_tj_icon_jg_xs@2x';
        pricemark = 1;
      } else if (pricemark == 1) {
        priceImg = 'sc_tj_icon_jg_xx@2x';
        pricemark = 0;
      }
      salesImg = 'sc_tj_icon_jg_nor@2x';
      salesmark = 0;

    } else if (mowtxt == 2) {
      if (salesmark == 0) {
        salesImg = 'sc_tj_icon_jg_xs@2x';
        salesmark = 1;
      } else if (salesmark == 1) {
        salesImg = 'sc_tj_icon_jg_xx@2x';
        salesmark = 0;
      }
      priceImg = 'sc_tj_icon_jg_nor@2x';
      pricemark = 0;

    }
    that.setData({
      nowSign: mowtxt,
      allPrice: priceImg,
      allSales: salesImg
    })
    console.log(that.data.nowSign, pricemark, salesmark, )
  },
  selected: function(t) {
    var e = a.data(t).type;
    this.setData({
      list: [],
      page: 1,
      status: e,
      empty: !1
    }), this.getList();
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
    wx.stopPullDownRefresh();
  },
  onReachBottom: function() {
    this.data.loaded || this.data.list.length == this.data.total || this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})