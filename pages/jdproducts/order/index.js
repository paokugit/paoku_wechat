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
var paramprice = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: !0,
    aa: 0,
    globalimg: f.globalData.appimg,
    showIcon: true,
    gloheight: f.globalData.gloheight,
    num: 1,
    goodsprice: 0,
    goodstitle: '',
    imagePath: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var t = this
    console.log(options)
    t.setData({
      num: options.count,
      goodsprice: options.totalprice
    })
    // if (t.data.aa == 0) return void i.toast(t, "请填写正确手机号码");
    t.getdetail()
    console.log(t.data.goodsprice)
  },
  getdetail: function() {
    var that = this
    wx.request({
      url: 'http://192.168.3.102/app/ewei_shopv2_api.php?i=1&r=app.superior.detail&comefrom=wxapp',
      data: {
        id: 1
      },
      complete() {
        wx.hideLoading();
      },
      success: function(res) {
        console.log(res)
        if (res.data.error == 0) {
          paramprice = res.data.data.ptprice
          that.setData({
            show: !0,
            // goodsprice: res.data.data.ptprice,
            jdprice: res.data.data.jdprice,
            goodstitle: res.data.data.brandName,
            imagePath: res.data.data.imagePath,
            goodsweight: res.data.data.weight,
          })
        }
      }
    });

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
      minusStatus: minusStatus,
    });
    this.getTotalPrice()
  },
  /* 点击加号 */
  bindPlus: function() {
    var num = this.data.num;
    num++;
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    this.setData({
      num: num,
      minusStatus: minusStatus,
    });
    this.getTotalPrice()
  },
  getTotalPrice(e) {
    let sum = 0;
    sum += this.data.num * paramprice;
    this.setData({
      goodsprice: sum.toFixed(2),
    })
  },
  /* 输入框事件 */
  bindManual: function(e) {
    var num = e.detail.value;
    // 将数值与状态写回  
    this.setData({
      num: num,
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