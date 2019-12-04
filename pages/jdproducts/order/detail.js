// pages/jdproducts/order/detail.js
var t = getApp(),
  e = t.requirejs("core"),
  a = t.requirejs("foxui"),
  i = t.requirejs("jquery");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIcon: true,
    gloheight: t.globalData.gloheight,
    globalimg: t.globalData.appimg,
    show: !0,
    cancel: [
      '不想要了',
      '啦啦啦',
      '呀呀呀'
    ],
    orderstatus: '',
    orderprice: '',
    realname: '',
    realmobile: '',
    realprovince: '',
    realcity: '',
    realarea: '',
    realaddress: '',
    thumb: '',
    goodsprice: '',
    goodscount: '',
    totalprice: '',
    ordersn: '',
    createtime: '',
    paytime: '',
    paramid: '',
    statusdesc: '',
    dispatchprice: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var t = this
    t.setData({
      paramid: options.id
    })
    t.getdetail()
  },
  getdetail: function() {
    var that = this
    wx.request({
      url: 'http://192.168.3.102/app/ewei_shopv2_api.php?i=1&r=app.superior.orderdetail&comefrom=wxapp',
      data: {
        orderid: that.data.paramid
      },
      complete() {
        wx.hideLoading();
      },
      success: function(res) {
        console.log(res)
        if (res.data.error == 0) {
          that.setData({
            statusdesc: res.data.data.jdstatus_msg,
            orderprice: res.data.data.price,
            realname: res.data.data.address.realname,
            realmobile: res.data.data.address.mobile,
            realprovince: res.data.data.address.province,
            realcity: res.data.data.address.city,
            realarea: res.data.data.address.area,
            realaddress: res.data.data.address.address,
            thumb: res.data.data.goods.imagePath,
            goodsname: res.data.data.goods.name,
            goodsprice: res.data.data.goods.price,
            goodscount: res.data.data.goods.total,
            totalprice: Number((res.data.data.goods.total * res.data.data.goods.price).toFixed(2)),
            ordersn: res.data.data.ordersn,
            createtime: res.data.data.createtime,
            paytime: res.data.data.paytime,
            orderstatus: res.data.data.status,
            dispatchprice: res.data.data.dispatchprice,
            paramid: res.data.data.id

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
  cancel: function(e) {
    var a = this
    console.log(a.data.orderstatus)
    wx.showModal({
      title: '提示',
      content: '确定要取消该订单吗',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: 'http://192.168.3.102/app/ewei_shopv2_api.php?i=1&r=app.superior.cancel_order&comefrom=wxapp',
            data: {
              orderid: a.data.paramid
            },
            complete() {
              wx.hideLoading();
            },
            success: function(res) {
              console.log(res)
              if (res.data.error == 0) {
                console.log(res)
                // 取消订单成功后刷新详情接口
                a.getdetail()

              } else {
                wx.showModal({
                  title: '提示',
                  content: res.data.message,
                })
              }
            }
          });
        } else {
          // console.log('取消')
        }
      }
    })
  },
  // 删除订单
  deletebtn: function() {
    var b = this
    wx.showModal({
      title: '提示',
      content: '确定要删除该订单吗',
      success: function(res) {
        if (res.confirm) {
          e.post("order/op/delete", {
            id: b.data.paramid,
            userdeleted: 1
          }, function(e) {
            console.log(e)
            if (e.error == 0) {
              // 删除成功后跳转到我的订单列表
              wx.navigateTo({
                url: '/pages/order/index',
              })

            } else {
              wx.showModal({
                title: '提示',
                content: e.message,
              })
            }
          });
        } else {
          // console.log('取消')
        }
      }
    })
  },
  shouhoubtn: function() {
    wx.showModal({
      title: '提示',
      content: '京东商品暂不支持在线售后,详情请联系客服',
    })
  },
  wuliubtn: function () {
    wx.navigateTo({
      url: '/pages/jdproducts/logistics/logistics?id=' + this.data.paramid,
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