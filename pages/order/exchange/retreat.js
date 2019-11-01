var t = getApp(),
  e = t.requirejs("core"),
  a = t.requirejs("biz/order");

Page({
  data: {
    showIcon: true,
    gloheight: t.globalData.gloheight,
    globalimg: t.globalData.appimg,
    statearray: ['已收到货', '未收到货'],
    index: 0,
    defaults: '请选择货物状态',
    reasonarr: ["不想要了", "卖家缺货", "拍错了/订单信息错误", "其它"],
    reason:'请先选择退款原因'
  },
  onLoad: function(e) {
    this.setData({
      show: !0,
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let index = e.detail.value
    let statearray = this.data.statearray
    this.setData({
      index: e.detail.value,
      defaults: statearray[index]
    })

  },

  bindReasonChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let index = e.detail.value
    let reasonarr = this.data.reasonarr
    this.setData({
      index: e.detail.value,
      reason: reasonarr[index]
    })

  },
  submit: function() {
    wx.showModal({
      title: '提示',
      content: '提交',
    })
    // var t = {
    //   id: this.data.options.id,
    //   rtype: this.data.rtypeIndex,
    //   reason: this.data.reasonArr[this.data.reasonIndex],
    //   content: this.data.content,
    //   price: this.data.price,
    //   images: this.data.images
    // };
    // e.post("order/refund/submit", t, function(t) {
    //   0 == t.error ? wx.navigateBack() : e.toast(t.message, "loading");
    // }, !0);
  },

  refundcancel: function(t) {
    wx.showModal({
      title: '提示',
      content: '取消',
    })
    // a.refundcancel(this.data.options.id, function() {
    //   wx.navigateBack();
    // });
  }
});