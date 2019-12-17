var t = getApp(),
  a = t.requirejs("core");
var f = getApp();

var useropenid = "";
var pricemark = 0;
var salesmark = 0;
var tabCut = 3;
var rank = 0;
var sharemid = 0;
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    globalimg: t.globalData.appimg,
    showIcon: true,
    gloheight: t.globalData.gloheight,

    zerotit:'',
    swiperCurrent:0,
    loading:!1,
    toggle: 5,
    allPrice: 'sc_tj_icon_jg_nor@2x',
    allSales: 'sc_tj_icon_jg_nor@2x',
    nowSign: 0,
    scrollTop:0,


    banner:[],
    list:[],
    goodslist:[],
    page:1,
    totalpage:1,
    hiddcss:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;
    sharemid = userinfo.id;
    var m = this;
 
    m.setData({
      zerotit:options.text,
      toggle: options.type
    });
    
  },
  bannerList:function(e){
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
  // 0元兑
  zeroList: function () {
    var t = this;
    wx.request({
      url: 'http://192.168.3.104:8081/app/ewei_shopv2_api.php?i=1&r=app.shop.shop_cate_list',
      data:{
        id: t.data.toggle
      },
      success(res) {
        console.log(res);
        t.setData({
          show: !0,
          loading:0
        })
        if (res.data.error == 0) {
          t.setData({
            list: t.data.list.concat(res.data.data.list),
            page:res.data.data.page+1,
            totalpage: res.data.data.pagetotal
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

  // 分享赚
  shareList: function () {
    var t = this;
    wx.request({
      url: 'http://192.168.3.104:8081/app/ewei_shopv2_api.php?i=1&r=app.shop.shop_cate_list',
      data: {
        id: t.data.toggle,
        type:tabCut,
        sort: rank
      },
      success(res) {
        console.log(res);
        t.setData({
          show: !0,
          loading: 0
        })
        if (res.data.error == 0) {
          t.setData({
            goodslist: t.data.goodslist.concat(res.data.data.list),
            page: res.data.data.page + 1,
            totalpage: res.data.data.pagetotal
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
      tabCut = 3;
      rank = 0;
    } else if (mowtxt == 1) {
      
      if (pricemark == 0) {
        priceImg = 'sc_tj_icon_jg_xs@2x';
        pricemark = 1;
        rank = 'asc' ;
      } else if (pricemark == 1) {
        priceImg = 'sc_tj_icon_jg_xx@2x';
        pricemark = 0;
        rank = 'desc';
      }
      salesImg = 'sc_tj_icon_jg_nor@2x';
      salesmark = 0;
      tabCut = 2

    } else if (mowtxt == 2) {
      if (salesmark == 0) {
        salesImg = 'sc_tj_icon_jg_xs@2x';
        salesmark = 1;
        rank = 'desc';
      } else if (salesmark == 1) {
        salesImg = 'sc_tj_icon_jg_xx@2x';
        salesmark = 0;
        rank = 'asc'; 
      }
      priceImg = 'sc_tj_icon_jg_nor@2x';
      pricemark = 0;
      tabCut = 1
    }
    that.setData({
      nowSign: mowtxt,
      allPrice: priceImg,
      allSales: salesImg,
      page:1,
      totalpage:1,
      goodslist:[],
      loading: !0
    });
    that.shareList();
  },

  onPageScroll: function (e) {
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
    this.bannerList();
    if (this.data.toggle == 5) {
      this.zeroList();
    } else if (this.data.toggle == 6) {
      this.shareList();
    }
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

    if(t.data.page <= t.data.totalpage){
      if (t.data.toggle == 5){
        t.zeroList();
      } else if (t.data.toggle == 6){
        t.shareList();
      }
      
    }else{
      t.setData({
        loading: 0,
        hiddcss:1
      })
    }
    
  },

  shareweixin: function () {
    console.log('用户点击微信分享')
    s.get("myown/goodshare/share", {
      goodid: productid,
      openid: openid
    }, function (a) {
      console.log(a)
      console.log('weixin分享')
      console.log("eeeeeeee")
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    return {
      title: e.target.dataset.title,
      path: "/pages/goods/detail/index?id=" + e.target.dataset.id + "&mid=" + sharemid,
      imageUrl: e.target.dataset.img,
      success: function (res) {
        // 转发成功
        console.log(res);
      },
      fail: function (res) {
        // 转发失败
        console.log(res);
      }
    }
  }
})