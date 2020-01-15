var t = getApp(),
  e = t.requirejs("core"),
  a = t.requirejs("biz/order");

var useropenid = "";
var orderid = 0;//订单id

Page({
  data: {
    showIcon: true,
    gloheight: t.globalData.gloheight,
    globalimg: t.globalData.appimg,
    statearray: ['已收到货', '未收到货'],
    index: 0,
    defaults: '请选择货物状态',
    reasonarr: ["发货时间问题", "不想要了", "订单信息拍错(规格/尺码/颜色等）", "地址/电话信息填写错误", "没用/少用优惠", "其它"],
    reason: '请先选择退款原因',

    status: '',//0退款，1退货退款
    goodslis:''
  },
  onLoad: function (e) {
    var userinfo = t.getCache('userinfo');
    useropenid = userinfo.openid;

    console.log(e);
    orderid = e.orderid
    this.setData({
      status:e.rtype
    })
    this.datalist();
  },

  datalist: function (e) {
    var t = this;
    wx.request({
      url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=group.order.refund_mes&comefrom=wxapp',
      data: {
        order_id: orderid
      },
      success: function (res) {
        console.log(res);
        t.setData({
          show: !0
        });
        if (res.data.error == 0) {
          t.setData({
            goodslis: res.data.data
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    });
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let index = e.detail.value
    let statearray = this.data.statearray
    this.setData({
      index: e.detail.value,
      defaults: statearray[index]
    })
  },

  bindReasonChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let index = e.detail.value
    let reasonarr = this.data.reasonarr
    this.setData({
      index: e.detail.value,
      reason: reasonarr[index]
    })

  },
  submit: function (e) {
    var m = this;
    console.log(m.data.reason,m.data.defaults);
    if(m.data.reason=='请先选择退款原因'&&m.data.defaults=='请选择货物状态'){
      wx.showToast({
        title: '请将货物状态与退款原因填写完整！！',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '是否要提交申请？',
        success: function (res) {
          if (res.confirm) { 
            wx.request({
              url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=group.order.refund_submit&comefrom=wxapp',
              data: {
                openid: useropenid,
                order_id:e.currentTarget.dataset.orderid,
                rtype:m.data.status,
                reason:m.data.reason,
                content:m.data.defaults
              },
              success: function (res) {
                console.log(res);
                m.setData({
                  show: !0
                });
                wx.showToast({
                  title: res.data.message,
                  icon: 'none',
                  duration: 2000
                })
                if (res.data.error == 0) {
                  setTimeout(function(){
                    wx.switchTab({
                      url: '/pages/member/index/index'
                    })
                  }, 1000);
                } 
              }
            });
          }
        }
      })
    }
  }
});