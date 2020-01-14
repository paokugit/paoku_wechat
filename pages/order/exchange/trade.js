var o = getApp(),
  e = o.requirejs("core"),
  c = o.requirejs("biz/goodspicker"),
  a = o.requirejs("biz/order");
const app = getApp()
var useropenid = '';
var orderid = 0;

var choice = '';
var morespec = 1;
Page({
  data: {
    hideModal: true,
    showIcon: true,
    gloheight: o.globalData.gloheight,
    globalimg: o.globalData.appimg,
    maskDis: 'none',
    total: 1,
    index: 0,
    defaults: '请选择',
    reasonarr: ["7天无理由换货", "退运费", "颜色/图案/款式与商品不符", "材质与商品描述不符",'尺寸/容量/参数与商品描述不符','做工粗糙/有瑕疵','质量问题','少件/漏发','包装/商品破损/污渍/裂痕/变形','未按约定时间发货','卖家发错货'],
    reason: '请先选择换货原因',
    num: 1,
    minusStatus: 'disabled',

    standard:[],
    boxarr:[],
    specsTitle:'',
    specs: [],
    goodslis:'',
    optionid: '',//规格id
    specsTitle: "",
  },
  inputChange: function (event) {
    console.log(event.detail.value)
    choice = event.detail.value;
  },
  // 显示遮罩层 
  showModal: function(e) {
    var that = this;
    morespec=e.currentTarget.dataset.morespec;

    if(morespec==1){
      console.log('123');
      wx.request({
        url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=group.index.option&comefrom=wxapp',
        data: {
          goods_id: e.currentTarget.dataset.goodsid,
          single:e.currentTarget.dataset.single
        },
        success: function (res) {
          console.log(res);
          if (res.data.error == 0) {
            that.setData({
              standard:res.data.data,
              boxarr: res.data.data.options,
              hideModal: false
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
    }else{
      that.setData({
        hideModal: false
      })
    }
    
    var animation = wx.createAnimation({
      duration: 600, //动画的持续时间 默认400ms 数值越大，动画越慢 数值越小，动画越快 
      timingFunction: 'ease', //动画的效果 默认值是linear 
    })
    this.animation = animation
    setTimeout(function() {
      that.fadeIn(); //调用显示动画 
    }, 200);
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
  selectGuige:function(e){
    let that = this,
      
      idx = e.currentTarget.dataset.idx,// 获取第一个循环的index
      
      selectId = e.currentTarget.dataset.id,// 获取当前点击的id
      
      selectName = e.currentTarget.dataset.title;// 获取当前点击的规格名称

    var l = that.data.boxarr;//获取规格数据

    var outer = that.data.specs;//选择规格的数组

    var selectnum = [];//记录规格id

    var arrid=[];
    var s = "", d = "", i = [];
    
    outer[idx] = {
      id: selectId,
      title: selectName
    };

    outer.forEach(function (t) {
      s += t.title + ";", i.push(t.id);
    });

    for(var i = 0; i < outer.length; i++){
      arrid.push(outer[i].id)
    }
    d = arrid.join("_");

    "" != e.currentTarget.dataset.thumb && that.setData({
      "standard.goods.thumb": e.currentTarget.dataset.thumb
    });
    l.forEach(function (t) {
      t.specs == d && (that.setData({
        optionid: t.id
      }));
    })

    console.log(outer);
    console.log(s);
    that.setData({
      chooseList:outer,
      specsTitle:s
    });
  },

  onLoad: function(e) {
    var userinfo = o.getCache('userinfo');
    useropenid = userinfo.openid;

    orderid = e.orderid;
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
  // 选择规格点击确定
  confirm: function() {
    var kl = this;
    kl.setData({
      hideModal: true
    })
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
  submit: function(e) {
    var tm = this;
    console.log(tm.data.num, tm.data.optionid, tm.data.reason,e.currentTarget.dataset.orderid,choice);
    if(morespec==1){
      if(tm.data.optionid == ''||tm.data.reason=='请先选择换货原因'){
        wx.showToast({
          title: '请将换货原因与换货商品填写完整！！',
          icon: 'none',
          duration: 2000
        })
      }else{
        tm.tijiao(e.currentTarget.dataset.orderid);
      }
    }else{
      if(tm.data.reason=='请先选择换货原因'){
        wx.showToast({
          title: '请将换货原因与换货商品填写完整！！',
          icon: 'none',
          duration: 2000
        })
      }else{
        tm.tijiao(e.currentTarget.dataset.orderid);
      } 
    }
  },
  tijiao:function(ind){
    var sub = this;
    wx.showModal({
      title: '提示',
      content: '是否要提交申请？',
      success: function (res) {
        if (res.confirm) { 
          wx.request({
            url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=group.order.exchange_submit&comefrom=wxapp',
            data: {
              openid: useropenid,
              order_id:ind,
              reason:sub.data.reason,
              total:sub.data.num,
              optionid:sub.data.optionid,
              content:choice
            },
            success: function (res) {
              console.log(res);
              sub.setData({
                show: !0
              });
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
              })
              if (res.data.error == 0) {
                wx.navigateBack({
                  delta: 2
                })
              } 
            }
          });
        }
      }
    })
  },

  refundcancel: function(t) {
    wx.navigateBack({
      delta: 2
    })
  }
});