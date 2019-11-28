var t = getApp(),
  a = t.requirejs("core");
var f = getApp();

var useropenid = "";

var target = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: t.globalData.appimg,
    showIcon: true,
    gloheight: t.globalData.gloheight,
    swiperCurrent: 0,
    background: ['red', 'orange', 'yellow'],

    cutype: 1,
    cutlit:11,
    nearness:'icon_xx8@2x',
    shopind:0,
    
    zerotit:'',
    toggle:0
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

  cutBtn:function(e){
    var t = this;
    t.setData({
      cutype: e.currentTarget.dataset.type
    })
  },

  smallBtn:function(e){
    var t = this;
    t.setData({
      cutlit: e.currentTarget.dataset.litt
    })
  },

  nearnessBtn:function(e){
    var p = this;
    let img;
    let shopind;
    if (target == 0){
      img = 'icon_xs8@2x';
      target = 1;
      shopind = 1;
    } else if (target == 1){
      img = 'icon_xx8@2x';
      target = 0;
      shopind = 0;
    }
    p.setData({
      nearness:img,
      shopind: shopind
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})