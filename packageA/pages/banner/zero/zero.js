var t = getApp(),
  a = t.requirejs("core");
var f = getApp();

var useropenid = "";
var pricemark = 0;
var salesmark = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: t.globalData.appimg,
    showIcon: true,
    gloheight: t.globalData.gloheight,

    zerotit:'0元兑',
    background: ['red', 'orange','yellow'],
    swiperCurrent:0,
    loading:!1,
    toggle:1,
    allPrice: 'sc_tj_icon_jg_nor@2x',
    allSales: 'sc_tj_icon_jg_nor@2x',
    nowSign: 0,
    scrollTop:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;

    var m = this;
    var text;
    if (m.data.toggle == 0){
      text = "0元兑"
    }else if(m.data.toggle == 1){
      text = "分享赚"
    }
    m.setData({
      show: !0,
      zerotit:text
    })
  },

  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },

  checkAllt: function (e) {
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
  },

  onPageScroll: function (e) {
    console.log(e.scrollTop);
    this.setData({
      scrollTop: e.scrollTop
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
    this.setData({
      loading: !0,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})