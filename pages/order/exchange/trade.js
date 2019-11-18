var o = getApp(),
  e = o.requirejs("core"),
  c = o.requirejs("biz/goodspicker"),
  a = o.requirejs("biz/order");
const app = getApp()

Page({
  data: {
    hideModal: true,
    showIcon: true,
    gloheight: o.globalData.gloheight,
    globalimg: o.globalData.appimg,
    maskDis: 'none',
    total: 1,
    index: 0,
    statearray: ['已收到货', '未收到货'],
    defaults: '请选择',
    reasonarr: ["7天无理由换货", "卖家缺货", "拍错了/订单信息错误", "其它"],
    reason: '请先选择换货原因',
    num: 1,
    minusStatus: 'disabled',
    guige: [{
        id: 1,
        name: '芒果味'
      },
      {
        id: 2,
        name: '草莓味'
      },
      {
        id: 3,
        name: '苹果味'
      },
      {
        id: 4,
        name: '西瓜味'
      },
      {
        id: 5,
        name: '菠萝味'
      },
      {
        id: 6,
        name: '蜜桃味'
      },
      {
        id: 7,
        name: '橙子味'
      },
    ],
    color: [{
        id: 8,
        name: '500g'
      },
      {
        id: 9,
        name: '250g'
      },
      {
        id: 10,
        name: '1000g'
      }
    ]

  },
  inputChange: function (event) {
    console.log(event.detail.value)
  },
  // 显示遮罩层 
  showModal: function() {
    var that = this;
    that.setData({
      hideModal: false
    })
    var animation = wx.createAnimation({
      duration: 600, //动画的持续时间 默认400ms 数值越大，动画越慢 数值越小，动画越快 
      timingFunction: 'ease', //动画的效果 默认值是linear 
    })
    this.animation = animation
    setTimeout(function() {
      that.fadeIn(); //调用显示动画 
    }, 200)
  },
  // 隐藏遮罩层 
  hideModal: function() {
    this.setData({
      hideModal: true
    })

  },

  //动画集 
  fadeIn: function() {
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export() //动画实例的export方法导出动画数据传递给组件的animation属性 
    })
  },

  guige: function(e) {
    // console.log(e._relatedInfo.anchorTargetText)
    this.setData({
      gid: e.currentTarget.dataset.index,
      gindex: e.currentTarget.dataset.current,
    })
  },
  color: function(e) {
    // console.log(e._relatedInfo.anchorTargetText)
    this.setData({
      cid: e.currentTarget.dataset.index,
      cindex: e.currentTarget.dataset.current,
    })
  },

  onLoad: function(e) {
    this.setData({
      show: !0,
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
    console.log(this.data.num)
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
    console.log(this.data.num)
  },
  /* 输入框事件 */
  bindManual: function(e) {
    var num = e.detail.value;
    this.setData({
      num: num
    });
  },
  confirm: function() {
    this.setData({
      hideModal: true
    })
    console.log(this.data.num)
    console.log(this.data.num, this.data.gid, this.data.cid)
  },
  bindPickerChange: function(e) {
    let index = e.detail.value
    let statearray = this.data.statearray
    this.setData({
      index: e.detail.value,
      defaults: statearray[index]
    })

  },

  bindReasonChange: function(e) {
    let index = e.detail.value
    let reasonarr = this.data.reasonarr
    this.setData({
      index: e.detail.value,
      reason: reasonarr[index]
    })

  },
  closebtn: function() {
    this.setData({
      maskDis: 'none'
    })
  },
  tradebtn: function() {
    this.setData({
      maskDis: 'block'
    })
  },
  submit: function() {
    console.log(this.data.num, this.data.gid, this.data.cid)
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