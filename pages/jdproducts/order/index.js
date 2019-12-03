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
var useropenid = "";
const util=require('../../../utils/util.js')
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
    payprice: 0,
    goodstitle: '',
    imagePath: '',
    provinceid: '',
    cityid: '',
    countyid: '',
    addressid: '',
    goodssku: '',
    weightprice: 0,
    payprice: 0,
    canpay: false,
    goodsid: '',
    provicename: '',
    cityname: '',
    areaname: '',
    name: '',
    mobile: '',
    detailaddress: '',
    goodsid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var t = this
    console.log(options)
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;
    if (!options.addressid && !options.areaid && !options.cityid && !options.proviceid) {
      console.log('详情')
      t.setData({
        canpay: false
      })
    } else {
      console.log('添加地址')
      t.setData({
        canpay: true,
        addressid: options.addressid,
        provinceid: options.proviceid,
        cityid: options.cityid,
        countyid: options.areaid,
        goodssku: options.goodssku,
        num: options.count,
        provicename: options.provicename,
        cityname: options.cityname,
        areaname: options.areaname,
        name: options.name,
        mobile: options.mobile,
        detailaddress: options.detailaddress
      })
      t.getcarriage()
    }
    t.setData({
      num: options.count,
      goodsid: options.id,
      goodsprice: options.totalprice,
      payprice: options.totalprice,
      goodssku: options.goodssku
    })
    console.log(t.data.num)
    t.getdetail()
  },
  getdetail: function() {
    var that = this
    wx.request({
      url: 'http://192.168.3.102/app/ewei_shopv2_api.php?i=1&r=app.superior.detail&comefrom=wxapp',
      data: {
        id: that.data.goodsid
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
            goodssku: res.data.data.sku
          })
        }
      }
    });

  },
  // 获取运费carriage
  getcarriage: function() {
    console.log(this.data.num)
    var tt = this
    wx.request({
      url: 'http://192.168.3.102/app/ewei_shopv2_api.php?i=1&r=app.superior.freight&comefrom=wxapp',
      data: {
        province: tt.data.provinceid,
        city: tt.data.cityid,
        county: tt.data.countyid,
        sku: tt.data.goodssku,
        num: tt.data.num
      },
      complete() {
        wx.hideLoading();
      },
      success: function(res) {
        console.log(res)
        if (res.data.error == 0) {
          console.log(res)
          tt.setData({
            weightprice: res.data.data.freight,
            payprice: Number(tt.data.goodsprice) + Number(res.data.data.freight)
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
  addadress: function() {
    console.log(this.data.goodsprice, this.data.num)
    wx.navigateTo({
      url: '/pages/jdproducts/address/add?id=' + this.data.goodsid + '&count=' + this.data.num + '&totalprice=' + this.data.goodsprice + '&goodssku=' + this.data.goodssku,
    })
  },
  submit:util.throttle(function(){
    console.log('点击')
    var that = this
    if (that.data.canpay == true) {
      wx.showLoading({
        title: '加载中',
      })
      console.log('接口')
      wx.request({
        url: 'http://192.168.3.102/app/ewei_shopv2_api.php?i=1&r=app.superior.order&comefrom=wxapp',
        data: {
          openid: useropenid,
          address_id: that.data.addressid,
          goods_id: that.data.goodsid,
          total: that.data.num
        },
        complete() {
          wx.hideLoading();
        },
        success: function (res) {
          if (res.data.error == 0) {
            console.log(res)
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/jdproducts/cash/cash?orderid=' + res.data.data.orderid + '&payprice=' + that.data.payprice,
              })
            }, 1e3);

          } else {
            wx.showModal({
              title: '提示',
              content: res.data.message,
            })
          }
        }
      });
    } else {
      return void i.toast(that, "请添加收货地址")
    }
  }),
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