var t = getApp(),
  a = t.requirejs("core"),
  e = t.requirejs("biz/order");
var useropenid = ''
Page({
  data: {
    icons: t.requirejs("icons"),
    status: "",
    list: [],
    page: 1,
    code: !1,
    cancel: e.cancelArray,
    cancelindex: 0,
    showIcon: true,
    gloheight: t.globalData.gloheight
  },
  onLoad: function(a) {
    console.log(t.globalData)
    var userinfo = t.getCache('userinfo');
    useropenid = userinfo.openid;
    this.setData({
      options: a,
      status: a.status || ""
    }), t.url(a), this.get_list();
  },

  // get_list: function() {
  //   var t = this;
  //   t.setData({
  //     loading: !0
  //   }), a.get("order/get_list", {
  //     page: t.data.page,
  //     status: t.data.status,
  //     merchid: 0
  //   }, function(e) {
  //     console.log(e)
  //     0 == e.error ? (t.setData({
  //       loading: !1,
  //       show: !0,
  //       total: e.total,
  //       empty: !0
  //     }), e.list.length > 0 && t.setData({
  //       page: t.data.page + 1,
  //       list: t.data.list.concat(e.list)
  //     }), e.list.length < e.pagesize && t.setData({
  //       loaded: !0
  //     })) : a.toast(e.message, "loading");
  //   }, this.data.show);
  // },
  get_list: function() {
    var t = this;
    t.setData({
      loading: !0
    }), wx.request({
      url: 'http://192.168.3.102/app/ewei_shopv2_api.php?i=1&r=order.get_list&comefrom=wxapp',
      data: {
        page: t.data.page,
        status: t.data.status,
        merchid: 0,
        openid: useropenid
      },
      complete() {
        wx.hideLoading();
      },
      success: function(e) {
        console.log(e)
        console.log(e)
        0 == e.data.error ? (t.setData({
          loading: !1,
          show: !0,
          total: e.total,
          empty: !0
        }), e.data.list.length > 0 && t.setData({
          page: t.data.page + 1,
          list: t.data.list.concat(e.data.list)
        }), e.data.list.length < e.data.pagesize && t.setData({
          loaded: !0
        })) : a.toast(e.data.message, "loading");
      }
    }, this.data.show);
  },
  // 京东
  shouhoubtn: function() {
    wx.showModal({
      title: '提示',
      content: '京东商品暂不支持在线售后,详情请联系客服',
    })
  },
  jdcancel: function(t) {
    console.log(t)
    var aa = this
    wx.showModal({
      title: '提示',
      content: '确定要取消该订单吗',
      success: function(res) {
        if (res.confirm) {
          console.log('确定')
          wx.request({
            url: 'http://192.168.3.102/app/ewei_shopv2_api.php?i=1&r=app.superior.cancel_order&comefrom=wxapp',
            data: {
              orderid: t.currentTarget.dataset.orderid
            },
            complete() {
              wx.hideLoading();
            },
            success: function(res) {
              console.log(res)
              if (res.data.error == 0) {
                console.log(res)
                // 取消订单成功后刷新列表接口
                aa.get_list()

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
  finishgoods: function(tt) {
    var cc=this
    console.log(tt)
    wx.showModal({
      title: '提示',
      content: '确认已收到货了吗?',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: 'http://192.168.3.102/app/ewei_shopv2_api.php?i=1&r=app.superior.finish&comefrom=wxapp',
            data: {
              orderid: tt.currentTarget.dataset.orderid
            },
            complete() {
              wx.hideLoading();
            },
            success: function(res) {
              console.log(res)
              if (res.data.error == 0) {
                console.log(res)
                // 取消订单成功后刷新列表接口
                cc.get_list()

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
  selected: function(t) {
    var e = a.data(t).type;
    this.setData({
      list: [],
      page: 1,
      status: e,
      empty: !1
    }), this.get_list();
  },
  onReachBottom: function() {
    this.data.loaded || this.data.list.length == this.data.total || this.get_list();
  },
  code: function(t) {
    var e = this,
      s = a.data(t).orderid;
    a.post("verify/qrcode", {
      id: s
    }, function(t) {
      0 == t.error ? e.setData({
        code: !0,
        qrcode: t.url
      }) : a.alert(t.message);
    }, !0);
  },
  close: function() {
    this.setData({
      code: !1
    });
  },
  cancel: function(t) {
    var s = a.data(t).orderid;
    e.cancel(s, t.detail.value, "/pages/order/index?status=" + this.data.status);
  },
  delete: function(t) {
    var s = a.data(t).type,
      i = a.data(t).orderid;
    e.delete(i, s, "/pages/order/index", this);
  },
  finish: function(t) {
    a.data(t).type;
    var s = a.data(t).orderid;
    e.finish(s, "/pages/order/index");
  },
  onPullDownRefresh: function() {
    wx.showToast({
      icon: 'loading',
      title: '加载中'
    })
    wx.stopPullDownRefresh();
  },
  onShareAppMessage: function() {
    return a.onShareAppMessage();
  }
});