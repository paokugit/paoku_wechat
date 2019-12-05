var e, a, o = getApp(),
  s = o.requirejs("core"),
  i = (o.requirejs("icons"), o.requirejs("foxui")),
  n = o.requirejs("biz/diypage"),
  r = o.requirejs("biz/diyform"),
  c = o.requirejs("biz/goodspicker"),
  d = o.requirejs("jquery"),
  l = o.requirejs("wxParse/wxParse"),
  u = 0,
  g = o.requirejs("biz/selectdate");
var f = getApp()
var totalprice = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: f.globalData.appimg,
    showIcon: true,
    gloheight: f.globalData.gloheight,
    goodsprice: '',
    goodstitle: '',
    jdprice: '',
    imagePath: '',
    goodsweight: '',
    standardcontent: '',
    appintroduce: '',
    imgUrls: [],
    autoplay: true,
    interval: 5000,
    duration: 1000,
    swiperCurrent: 0,
    info: "active",
    num: 1,
    minusStatus: 'disabled',
    maskshow: false,
    subtext: '立即购买',
    buyshow: false,
    confirmshow: false,
    goodstotal: 0,
    isSelected: false,
    goodssku: '',
    goodsid: '',
    onsale: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var t = this
    t.setData({
      goodsid: options.id
    })
    t.getdetail()
  },
  getdetail: function() {
    var that = this
    s.get("app.superior.detail", {
      id: that.data.goodsid
    }, function(e) {
      console.log(e)
      if (e.error == 0) {
        that.setData({
          show: !0,
          imgUrls: e.data.img,
          goodsprice: e.data.ptprice,
          jdprice: e.data.jdprice,
          goodstitle: e.data.name,
          imagePath: e.data.imagePath,
          goodsweight: e.data.weight,
          goodssku: e.data.sku,
          onsale: e.data.onsale
        }), l.wxParse('standardcontent', 'html', e.data.param, that, 5), l.wxParse('appintroduce', 'html', e.data.appintroduce, that, "0")
        wx.getSystemInfo({
          success: function(t) {
            that.setData({
              advWidth: t.windowWidth
            });
          }
        })
      }else{
        wx.showModal({
          title: '提示',
          content: e.message,
        })
      }
    })

  },
  swiperChange: function(e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  selectstandard: function() {
    var t = this
    t.setData({
      maskshow: true,
      confirmshow: true,
    })
  },
  maskconfirm: function() {
    var aa = this
    aa.setData({
      maskshow: false,
      isSelected: true,
      confirmshow: false,
      goodstotal: aa.data.num
    })
    // console.log(aa.data.num)
  },
  selectBuy: function() {
    var bb = this
    // console.log(bb.data.num)
    bb.setData({
      maskshow: true,
      buyshow: true,
    })
  },
  maskBuy: function() {
    var cc = this
    totalprice = Number((cc.data.num * cc.data.goodsprice).toFixed(2))
    console.log(totalprice)
    wx.navigateTo({
      url: '/pages/jdproducts/order/index?id=' + cc.data.goodsid + '&count=' + cc.data.num + '&totalprice=' + totalprice + '&goodssku=' + cc.data.goodssku,
    })

  },
  /* 点击减号 */
  bindMinus: function() {
    var num = this.data.num;
    if (num > 1) {
      num--;
    }
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function() {
    var num = this.data.num;
    num++;
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function(e) {
    var num = e.detail.value;
    // 将数值与状态写回  
    this.setData({
      num: num
    });
  },
  guanbiBtn: function() {
    this.setData({
      maskshow: false,
      goodstotal: this.data.num,
      confirmshow: false
    })
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
    var t = this;
    o.getCache("isIpx") ? t.setData({
      isIpx: !0,
      iphonexnavbar: "fui-iphonex-navbar"
    }) : t.setData({
      isIpx: !1,
      iphonexnavbar: ""
    })
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