var t = getApp(),
  a = t.requirejs("core"),
  e = t.requirejs("jquery");

// 新加
var pricemark = 0;
var salesmark = 0;
var useropenid = "";
var pagetotal = 0;

var cost = 0;
var selling = 0;
var signInd = 0;
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
    currentData: 1,
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
    allList:[],
    conceal:0,

    attention:0,
    scrollTop:0,
    goodstime:[],
    people:0
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
    });

    var mn = this;
    mn.storeList();
    mn.discount();
    mn.kinetic();
  },

  checkCurrent: function (e) {
    const mx = this;
    signInd = e.currentTarget.dataset.current;
    mx.setData({
      currentData: signInd,
      tuiList: [],
      page: 0,
      pagetotal: 0,
      nowSign:0,
      allPrice: 'sc_tj_icon_jg_nor@2x',
      allSales: 'sc_tj_icon_jg_nor@2x',
    });
    if (signInd == 0){
      mx.goodsTui();
    } else if (signInd == 1){
      mx.kinetic();
    } else if (signInd == 2){
      mx.update();
    } else if (signInd == 3){
      mx.allgoods();
    }
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

  // 全部价格筛选
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
      cost = 0;
      selling = 0;
    }else if (mowtxt == 1){
      
      if (pricemark == 0){
        priceImg = 'sc_tj_icon_jg_xs@2x';
        pricemark = 1;
        cost = 2;
        selling = 0;
      } else if (pricemark == 1){
        priceImg = 'sc_tj_icon_jg_xx@2x';
        pricemark = 0;
        cost = 1;
        selling = 0;
      }
      salesImg = 'sc_tj_icon_jg_nor@2x';
      salesmark = 0;

    } else if (mowtxt == 2){
      if (salesmark == 0){
        salesImg = 'sc_tj_icon_jg_xs@2x';
        salesmark = 1;
        cost = 0;
        selling = 1;
      } else if (salesmark == 1){
        salesImg = 'sc_tj_icon_jg_xx@2x';
        salesmark = 0;
        cost = 0;
        selling = 2;
      }
      priceImg = 'sc_tj_icon_jg_nor@2x';
      pricemark = 0;
      
    }
    that.setData({
      nowSign: mowtxt,
      allPrice: priceImg,
      allSales: salesImg,
      allList: [],
      page: 0,
      pagetotal: 0,
    });
    that.allgoods();
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
        console.log(res);
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
    var longitude = 0;
    var latitude = 0;
    if (s != undefined){ 
      longitude=s.longitude;
      latitude=s.latitude;
    }
    var t = this;
    wx.request({
      url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=myown.shophome.index&comefrom=wxapp',
      data: {
        openid: useropenid,
        merch_id: t.data.merchid,
        lng: longitude,
        lat: latitude
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data);
        if (res.data.error == 0){
          t.setData({
            attention: res.data.message.follow,
            message: res.data.message,
            people:res.data.message.followcount
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
      url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=myown.shophome.shopcoupon&comefrom=wxapp',
      data: {
        merch_id: o.data.merchid
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
        } else{
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
      url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=myown.shophome.recommend&comefrom=wxapp',
      data: {
        page: p.data.page,
        merch_id: p.data.merchid,
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

  // 活动
  kinetic:function(){
    var kl = this;
    wx.request({
      url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=myown.shophome.activity&comefrom=wxapp',
      data: {
        // merch_id: kl.data.merchid
        merch_id:3
      },
      success(res) {
        console.log(res.data);
        if (res.data.error == 0) {
            kl.setData({
              show: !0,
              loading: !1,
              goodstime:res.data.data.time,
              tuiList: res.data.data.group
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

  // 上新
  update:function(){
    var k = this;
    k.setData({
      loading: !0
    })
    wx.request({
      url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=myown.shophome.upgood&comefrom=wxapp',
      data: {
        merch_id: k.data.merchid,
        openid: useropenid
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data);
        if (res.data.error == 0) {
            k.setData({
              show: !0,
              loading: !1,
              tuiList: res.data.data.list
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

  // 全部商品
  allgoods:function(){
    var pa = this;
    pa.setData({
      loading: !0
    })
    wx.request({
      url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=myown.shophome.recommend&comefrom=wxapp',
      data: {
        page: pa.data.page,
        merch_id: pa.data.merchid,
        price:cost,
        sale: selling
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data);
        if (res.data.error == 0) {
            pagetotal = res.data.data.pagetotal,
            pa.setData({
              loading: !1,
              page: pa.data.page + 1,
              allList: pa.data.allList.concat(res.data.data.list)
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

  // 关注
  clickBtn:function(e){
    var w = this;
    console.log(w.data.attention);
    var index = 0;
    var peoplenum = parseInt(w.data.people);
    if (w.data.attention == 0){
      index = 1;
      peoplenum = peoplenum+1;
    } else if (w.data.attention == 1){
      index = 0;
      peoplenum = peoplenum-1;
    }
    wx.request({
      url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=myown.shophome.follow&comefrom=wxapp',
      data: {
        openid: useropenid,
        merch_id: w.data.merchid,
        follow: index
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data);
        if (res.data.error == 0) {
          w.setData({
            attention:index,
            people:peoplenum
          })
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
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
      if (signInd == 0){
        th.goodsTui();
      } else if (signInd == 1){
        th.kinetic();
      } else if (signInd == 2){
        th.update();
      } else if (signInd == 3){
        th.allgoods();
      }
      
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
  },
  onPageScroll: function (e) {
    this.setData({
      scrollTop: e.scrollTop
    })
  }
})