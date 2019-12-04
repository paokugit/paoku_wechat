var t = getApp(),
  e = t.requirejs("core"),
  a = t.requirejs("foxui"),
  i = t.requirejs("jquery");
//   当前登录人的openid
var f = getApp();
var useropenid = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: t.globalData.appimg,
    showIcon: true,
    orderId: '',
    timestamp: '',
    noncestr: '',
    pack: '',
    signtype: '',
    paysign: '',
    success: !1,
    realname: '',
    realmobile: '',
    province: '',
    city: '',
    area: '',
    detailaddress: '',
    jdstatus: '',
    ordersn: '',
    currentmoney: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;
    this.setData({
      show: !0,
      orderId: options.orderid,
      orderprice: options.payprice,
      ordersn: options.ordersn
    });
    this.getcredit()
  },
  // 当前余额
  getcredit: function() {
    var tt = this
    wx.request({
      url: 'https://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=app.superior.money&comefrom=wxapp',
      data: {
        openid: useropenid
      },
      complete() {
        wx.hideLoading();
      },
      success: function(res) {
        if (res.data.error == 0) {
          console.log(res)
          tt.setData({
            currentmoney: res.data.data.credit2
          })

        }
      }
    })

  },
  // 微信支付
  wxpay: function() {
    var that = this
    wx.request({
      url: 'https://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=app.superior.pay&comefrom=wxapp',
      data: {
        orderid: that.data.orderId
      },
      complete() {
        wx.hideLoading();
      },
      success: function(res) {
        if (res.data.error == 0) {
          console.log(res)
          that.setData({
            timestamp: res.data.data.wx.timeStamp,
            noncestr: res.data.data.wx.nonceStr,
            pack: res.data.data.wx.package,
            signtype: res.data.data.wx.signType,
            paysign: res.data.data.wx.paySign
          })
          wx.requestPayment({
            'timeStamp': that.data.timestamp,
            'nonceStr': that.data.noncestr,
            'package': that.data.pack,
            'signType': 'MD5',
            'paySign': that.data.paysign,
            'success': function(res) {
              console.log(res)
              console.log('成功')
              setTimeout(function() {
                that.setData({
                  success: !0,
                })
              }, 200), that.paysuccess()
            },
            'fail': function(res) {
              console.log('取消')
            },
            'complete': function(res) {}
          })

        }
      }
    })
  },
  // 支付成功之后掉该方法显示订单状态
  paysuccess: function() {
    var tt = this
    wx.request({
      url: 'https://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=app.superior.orderdetail&comefrom=wxapp',
      data: {
        orderid: tt.data.orderId
      },
      complete() {
        wx.hideLoading();
      },
      success: function(res) {
        if (res.data.error == 0) {
          console.log(res)
          tt.setData({
            jdstatus: res.data.data.jdstatus_msg,
            realname: res.data.data.address.realname,
            realmobile: res.data.data.address.mobile,
            province: res.data.data.address.province,
            city: res.data.data.address.city,
            area: res.data.data.address.area,
            detailaddress: res.data.data.address.address,
            actualprice: res.data.data.price
          })

        }
      }
    })
  },
  balancepay: function() {
    var that = this
    let currentcredit = Number(that.data.currentmoney)
    let ordermoney = Number(that.data.orderprice)
    console.log(currentcredit, ordermoney)
    if (currentcredit < ordermoney) {
      wx.showModal({
        title: '提示',
        content: '余额不足,请充值',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '确定要余额支付吗',
        success: function(res) {
          if (res.confirm) {
            wx.request({
              url: 'https://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=app.superior.balance_pay&comefrom=wxapp',
              data: {
                orderid: that.data.orderId
              },
              complete() {
                wx.hideLoading();
              },
              success: function(res) {
                if (res.data.error == 0) {
                  console.log(res)
                  that.setData({
                    success: !0
                  }), that.paysuccess()

                }
              }
            })
          } else {
            console.log('取消')
          }
        }
      })
    }

  },
  detailbtn: function() {
    wx.navigateTo({
      url: '/pages/jdproducts/order/detail?id=' + this.data.orderId,
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