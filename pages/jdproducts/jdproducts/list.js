// pages/jdproducts/jdproducts/list.js
//   当前登录人的openid
var f = getApp();
var t = getApp(),
  a = t.requirejs("core");
var useropenid = ''
// 新加
var pricemark = 0;
var salesmark = 0;
var sortorder = "";
var sortby = ""
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
    list: [],
    allPrice: 'sc_tj_icon_jg_nor@2x',
    allSales: 'sc_tj_icon_jg_nor@2x',
    imgA: 'icon_sp@2x',
    imgB: 'icon_hp@2x',
    nowSign: 0,
    imgUrls: [],
    autoplay: true,
    interval: 5000,
    duration: 1000,
    swiperCurrent: 0,
    dots: true,
    catelist: [],
    status: '',
    pricesort: "",
    salesort: "",
    totalPage: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(a) {
    var that = this
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid
    console.log(that.data.status)
    that.getbanner(),
      that.getList()
  },
  getbanner: function() {
    var that = this
    wx.request({
      url: 'https://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=app.superior.banner&comefrom=wxapp',
      data: {},
      complete() {
        wx.hideLoading();
      },
      success: function(res) {
        console.log(res)
        if (res.data.error == 0) {
          that.setData({
            show: !0,
            imgUrls: res.data.data.banner,
            catelist: res.data.data.cate,
            // status: res.data.data.cate[0].id
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.message,
          })
        }
      }
    });
  },
  getList: function() {
    var tt = this
    wx.request({
      url: 'https://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=app.superior.goodlist&comefrom=wxapp',
      data: {
        cate_id: tt.data.status,
        price: tt.data.pricesort,
        sale: tt.data.salesort,
        page: tt.data.page
      },
      complete() {
        wx.hideLoading();
      },
      success: function(res) {
        console.log(res)
        if (res.data.error == 0) {
          let totalPage = Math.ceil(res.data.data.total / res.data.data.pagesize);
          let totalList = res.data.data.list
          tt.setData({
            show: !0,
            totalPage: totalPage,
            // list: res.data.data.list
            list: tt.data.list.concat(totalList)
          })
        }
      }
    });
  },

  // getList: function() {

  // },
  swiperChange: function(e) {
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
      // 综合
      priceImg = 'sc_tj_icon_jg_nor@2x';
      salesImg = 'sc_tj_icon_jg_nor@2x';
      pricemark = 0;
      salesmark = 0;
    } else if (mowtxt == 1) {
      sortorder = "minprice"
      if (pricemark == 0) {
        priceImg = 'sc_tj_icon_jg_xs@2x';
        pricemark = 1;
        // 价格升序，由低到高
        that.setData({
          pricesort: "asc",
          salesort: ""
        })
      } else if (pricemark == 1) {
        priceImg = 'sc_tj_icon_jg_xx@2x';
        pricemark = 0;
        // 价格降序，由高到低
        that.setData({
          pricesort: "desc",
          salesort: ""
        })
      }
      salesImg = 'sc_tj_icon_jg_nor@2x';
      salesmark = 0;

    } else if (mowtxt == 2) {
      if (salesmark == 0) {
        salesImg = 'sc_tj_icon_jg_xs@2x';
        salesmark = 1;
        // 销量升序，由低到高
        that.setData({
          pricesort: "",
          salesort: "asc"
        })
      } else if (salesmark == 1) {
        salesImg = 'sc_tj_icon_jg_xx@2x';
        salesmark = 0;
        // 销量降序，由高到低
        that.setData({
          pricesort: "",
          salesort: "desc"
        })
      }
      priceImg = 'sc_tj_icon_jg_nor@2x';
      pricemark = 0;

    }
    that.setData({
      nowSign: mowtxt,
      allPrice: priceImg,
      allSales: salesImg,
      page: 1,
      list: []
    }), that.getList()
  },
  selected: function(t) {
    var e = a.data(t).type;
    console.log(e)
    this.setData({
      list: [],
      page: 1,
      status: e,
      empty: !1,
      pricesort: "",
      salesort: "",
      nowSign: 0,
      show:!1,
      allPrice: 'sc_tj_icon_jg_nor@2x',
      allSales: 'sc_tj_icon_jg_nor@2x',
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
  // onReachBottom: function() {

  // },
  onReachBottom: function() {
    let page = this.data.page;
    let totalpage = this.data.totalPage;
    if (page <= totalpage) {
      wx.showLoading({
        title: '加载中...',
      });
      this.setData({
        page: page + 1
      })
      this.getList();
    } else {
      this.setData({
        show: !0
      })
    }
    setTimeout(() => {
      wx.hideLoading()
    }, 200)

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})