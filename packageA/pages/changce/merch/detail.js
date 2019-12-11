var t = getApp(),
  a = t.requirejs("core"),
  e = t.requirejs("jquery");

// 新加
var pricemark = 0;
var salesmark = 0;
var useropenid = "";
var pagetotal = 0;
Page({
  data: {
    merchid: 0,
    merch: [],
    page: 1,
    approot: t.globalData.approot,
    globalimg: t.globalData.appimg,
    showIcon: true,
    gloheight: t.globalData.gloheight,


    // -----修改添加
    currentData: 0,
    marqueePace: 1,//滚动速度
    marqueeDistance: 0,//初始滚动距离
    size: 30,
    interval: 20, // 时间间隔
    informTxt: "",
    loading: !0,
    allPrice: 'sc_tj_icon_jg_nor@2x',
    allSales:'sc_tj_icon_jg_nor@2x',
    nowSign:0,
    sortWay:0,
    message:{},
    couponList:[],
    tuiList:[],
    conceal:0,

    byvalue:''
  },
  onLoad: function (optin) {
    var userinfo = t.getCache('userinfo');
    useropenid = userinfo.openid;

    var b = decodeURIComponent(optin.scene);
    if (!optin.id && b) {
      var i = a.str2Obj(b);
      optin.id = i.id;
      //绑定会员来源
      a.get("help/index/bang_agent", { merchid: optin.id }, function (c) {
        console.log(c)
      })
    }
    this.setData({
      merchid: optin.id
    })
  },

  checkCurrent: function (e) {
    const that = this;
    that.setData({
      currentData: e.currentTarget.dataset.current
    })
  },

  sortBtn:function(){
    var m = this;
    let recordway = m.data.sortWay;
    let imgrecord;
    if (recordway == 0){
      recordway = 1;
    } else if (recordway == 1){
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
    if (mowtxt == 0){
      priceImg = 'sc_tj_icon_jg_nor@2x';
      salesImg = 'sc_tj_icon_jg_nor@2x';
      pricemark = 0;
      salesmark = 0;
    }else if (mowtxt == 1){
      
      if (pricemark == 0){
        priceImg = 'sc_tj_icon_jg_xs@2x';
        pricemark = 1;
      } else if (pricemark == 1){
        priceImg = 'sc_tj_icon_jg_xx@2x';
        pricemark = 0;
      }
      salesImg = 'sc_tj_icon_jg_nor@2x';
      salesmark = 0;

    } else if (mowtxt == 2){
      if (salesmark == 0){
        salesImg = 'sc_tj_icon_jg_xs@2x';
        salesmark = 1;
      } else if (salesmark == 1){
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

  onShow:function(){
    var that = this;
    var length = that.data.informTxt.length * that.data.size;//文字长度
    var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
    that.setData({
      length: length,
      windowWidth: windowWidth
    });
    that.scrollFn();
    
    that.storeList();
    that.discount();
    that.goodsTui();
  },

  scrollFn: function () {
    var that = this;
    var length = that.data.length;
    var windowWidth = that.data.windowWidth;
    if (length > windowWidth) {
      var interval = setInterval(function () {
        var crentleft = that.data.marqueeDistance;
        if (crentleft < length-400) {
          that.setData({
            marqueeDistance: crentleft + that.data.marqueePace
          })
        }else {
          that.setData({
            marqueeDistance: 0 
          });
          clearInterval(interval);
          that.scrollFn();
        }
      }, that.data.interval);
    }
  },

  dynamicBtn:function(){
    wx.showModal({
      title: '提示',
      content: '暂未开放',
    })
    // wx.navigateTo({
    //   url: '/packageA/pages/changce/merch/dynamic'
    // })
  },

  // 店铺信息
  storeList:function(){
    var m = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        m.datalist(res);
      },
      fail: function (res) {
        console.log(res);
        m.datalist();
      }
    });
  },
  datalist:function(s){
    console.log(s);
    var t = this;
    wx.request({
      url: 'http://192.168.3.104:8081/app/ewei_shopv2_api.php?i=1&r=myown.shophome.index&comefrom=wxapp',
      data: {
        openid: useropenid,
        merch_id: 3,
        lng: s.longitude,
        lat: s.latitude
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data);
        if (res.data.error == 0){
          t.setData({
            // byvalue:
            message: res.data.message
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

  // 公告与优惠券
  discount:function(){
    var o = this;
    wx.request({
      url: 'http://192.168.3.104:8081/app/ewei_shopv2_api.php?i=1&r=myown.shophome.shopcoupon&comefrom=wxapp',
      data: {
        merch_id: 3
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data);
        if (res.data.error == 0) {
          o.setData({
            informTxt: res.data.data.notice,
            couponList: res.data.data.coupon
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
  
  // 推荐
  goodsTui:function(){
    var p = this;
    p.setData({
      loading: !0
    })
    wx.request({
      url: 'http://192.168.3.104:8081/app/ewei_shopv2_api.php?i=1&r=myown.shophome.recommend&comefrom=wxapp',
      data: {
        page: p.data.page,
        merch_id: 3,
        recommend: 1
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data);
        if (res.data.error == 0) {
          pagetotal = res.data.data.pagetotal,
          p.setData({
            show: !0,
            loading: !1,
            page:p.data.page+1,
            tuiList: p.data.tuiList.concat(res.data.data.list)
          });
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

  scancodebtn:function(){
    wx.showModal({
        title: '提示',
        content: '暂未开放',
    })
  },

 
  onReachBottom: function () {
    var th = this;
    console.log(th.data.page,pagetotal);
    if (th.data.page <= pagetotal){
      th.goodsTui();
    }else{
      th.setData({
        conceal:1
      })
    }
    
  },
  jump: function (t) {
    var e = a.pdata(t).id;
    e > 0 && wx.navigateTo({
      url: "/pages/sale/coupon/detail/index?id=" + e
    })
  }
})