// pages/store/store.js
var t = getApp(), a = t.requirejs("core");
var app = getApp()

var cateid = 0;
var updown = 0;
var screen = 3;
var pricemark = 0;
var salesmark = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: app.globalData.appimg,
    showIcon: true,

    topImg:'',
    imgUrls: [],
    cateuse: 1,
    cate:[],
    middle:[],
    notice:[],
    goodslist:[],


    autoplay: true,
    interval: 5000,
    duration: 1000,
    swiperCurrent: 0,
    dots:true,
    type: 0,
    select:0,
    page: 1,
    pageall:1,
    totalpage:1,
    loaded: !1,
    loading: !0,
    hiddcss:0,
    goodsTui:[],

    allPrice: 'sort01',
    allSales: 'sort01'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },
  swiperChange: function(e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },

  getList: function () {
    var t = this;
    wx.request({
      url: 'http://192.168.3.104:8081/app/ewei_shopv2_api.php?i=1&r=app.shop',
      success(res) {
        console.log(res)
        t.setData({
          show: !0,
        })

        let totalPage = Math.ceil(res.data.data.adv.cate.length / 10);

        if (res.data.error == 0){
          t.setData({
            topImg: res.data.data.adv.top[0].image,
            imgUrls: res.data.data.adv.banner,
            cateuse: totalPage,
            cate: res.data.data.adv.cate,
            middle: res.data.data.adv.middle,
            notice: res.data.data.adv.notice,
            goodsTui: res.data.data.cate
          })
        } else if (res.data.error == 1){
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  commodity:function(e){
    var m = this;
    m.setData({
      loading: !0,
    })
    wx.request({
      url: 'http://192.168.3.104:8081/app/ewei_shopv2_api.php?i=1&r=app.shop.shop_goods',
      data:{
        type: screen,
        sort:updown,
        page:m.data.page,
        cate: cateid
      },
      success(res) {
        console.log(res.data);
        if(res.data.error == 0){
          m.setData({
            loading:!1,
            goodslist: m.data.goodslist.concat(res.data.data.data),
            page: m.data.page + 1,
            pageall: res.data.data.pagetotal
          })
        } else if (res.data.error == 1){
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  activityBtn:function(e){
    var type = e.currentTarget.dataset.type;
    var text = e.currentTarget.dataset.text;
    console.log(type, text);
    var path;
    if(type == 5 || type == 6){
      path = '/packageA/pages/banner/zero/zero?type=' + type + '&text=' + text 
    } else if (type == 7 || type == 8 || type == 9 || type == 11 || type == 12){
      path = '/packageA/pages/banner/fruits/fruits?type=' + type + '&text=' + text
    } else if (type == 10){
      path = '/packageA/pages/banner/spell/spell?type=' + type + '&text=' + text
    } else if (type == 13){
      path = '/packageA/pages/banner/local/local?type=' + type + '&text=' + text
    } else if (type == 14){
      path = '/packageA/pages/shop/caregory/index?type=' + type + '&text=' + text
    }
    wx.navigateTo({
      url: path,
    })
  },


  myTab: function (t) {
    console.log(t)
    var e = this, i = a.pdata(t).type;
    cateid = t.currentTarget.dataset.id;
    screen = 3;
    updown = 0;
    pricemark = 0;
    salesmark = 0;
    e.setData({
      select:0,
      type: i,
      page:1,
      pageall: 1,
      goodslist: [],
      allPrice: 'sort01',
      allSales: 'sort01',
    });
  },
  myselect: function (t) {
    console.log(t)
    var ee = this, i = a.pdata(t).select;
    let priceImg;
    let salesImg;
    if(i == 0){
      screen = 3;
      updown = 0;
      priceImg = 'sc_tj_icon_jg_nor@2x';
      salesImg = 'sc_tj_icon_jg_nor@2x';
      pricemark = 0;
      salesmark = 0;
    }else if(i == 1){
      if (pricemark == 0) {
        priceImg = 'sc_tj_icon_jg_xs@2x';
        pricemark = 1;
        updown = 'asc';
      } else if (pricemark == 1) {
        priceImg = 'sc_tj_icon_jg_xx@2x';
        pricemark = 0;
        updown = 'desc';
      }
      salesmark = 0;
      salesImg = 'sort01';
      screen = 2;
    }else if(i == 2){
      if (salesmark == 0) {
        salesImg = 'sc_tj_icon_jg_xs@2x';
        salesmark = 1;
        updown = 'desc';
      } else if (salesmark == 1) {
        salesImg = 'sc_tj_icon_jg_xx@2x';
        salesmark = 0;
        updown = 'asc';
      }
      pricemark = 0;
      priceImg = 'sort01';
      screen = 1;
    }
    ee.setData({
      select: i,
      page: 1,
      pageall:1,
      goodslist:[],
      loading: !0,
      allPrice: priceImg,
      allSales: salesImg,
    });
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
    this.getList();
    this.commodity();
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
    var t = this;
    console.log(t.data.page, t.data.pageall);
    if (t.data.page <= t.data.pageall){
      t.commodity();
    }else{
      t.setData({
        loading: 0,
        hiddcss: 1
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})