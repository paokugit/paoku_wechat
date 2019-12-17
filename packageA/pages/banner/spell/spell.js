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

    background: ['red', 'orange', 'yellow'],

    allPrice: 'sc_tj_icon_jg_nor@2x',
    allSales: 'sc_tj_icon_jg_nor@2x',
    nowSign: 0,
    sortWay: 0,
    scrollTop: 0,

    swiperCurrent: 0,


    zerotit: '',
    toggle: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;

    var m = this;

    m.setData({
      zerotit: options.text,
      toggle: options.type
    });
  },

  bannerList: function (e) {
    var m = this;
    wx.request({
      url: 'http://192.168.3.104:8081/app/ewei_shopv2_api.php?i=1&r=app.shop.shop_cate_banner',
      data: {
        id: m.data.toggle
      },
      success(res) {

        console.log(res);

        if (res.data.error == 0) {
          m.setData({
            banner: res.data.data.banner
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
  getList: function () {
    var t = this;
    wx.request({
      url: 'http://192.168.3.104:8081/app/ewei_shopv2_api.php?i=1&r=app.shop.shop_cate_list',
      data: {
        id: t.data.toggle
      },
      success(res) {
        console.log(res);
        t.setData({
          show: !0,
          loading: 0
        })
        // if (res.data.error == 0) {
        //   t.setData({
        //     list: t.data.list.concat(res.data.data.list),
        //     page: res.data.data.page + 1,
        //     totalpage: res.data.data.pagetotal
        //   })
        // } else if (res.data.error == 1) {
        //   wx.showToast({
        //     title: res.data.message,
        //     icon: 'none',
        //     duration: 2000
        //   })
        // }
      }
    })
  },



  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },

  sortBtn: function () {
    var m = this;
    let recordway = m.data.sortWay;
    let imgrecord;
    if (recordway == 0) {
      recordway = 1;
    } else if (recordway == 1) {
      recordway = 0;
    }
    m.setData({
      sortWay: recordway
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.bannerList();
    this.getList();
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
    var t = this;
    t.setData({
      loading: !0,
    })

    if (t.data.page <= t.data.totalpage) {
      t.getList();
    } else {
      t.setData({
        loading: 0
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})