var t = getApp(),
  a = t.requirejs("core"),
  b = t.requirejs("wxParse/wxParse"),
  s = t.requirejs("jquery");
var f = getApp();

var useropenid = "";

var goods_id = 0;//商品id
var single = 0;//0拼团，1单购
var option_id = 0;//规格id
var addressid = 0;//收货地址id
var total = 1;//数量
var team_id = 0;//拼团团队id
var remark = '';//备注

var order_id = '';

var spell = 0;//1是从订单列表过来，0不是
var optionid = 0;//订单列表传值的订单id

Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: t.globalData.appimg,
    showIcon: true,
    gloheight: t.globalData.gloheight,

    datalist:{},
    hint:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;

    console.log(options);
    goods_id = options.goodid;
    single = options.single;
    option_id = options.option_id;
    addressid = options.addressid;
    total = options.total;
    team_id = options.team_id;
    remark = options.remark;

    if(options.spell != undefined){
      spell = options.spell;
      optionid = options.optionid;
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  paylist:function(){
    var t = this;
    wx.request({
      url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=group.team.order&comefrom=wxapp',
      data: {
        openid: useropenid,
        goods_id: goods_id,
        single: single,
        option_id: option_id,
        addressid: addressid,
        total: total,
        team_id: team_id,
        remark: remark
      },
      success: function (res) {
        console.log(res);
        t.setData({
          show: !0
        });
        if (res.data.error == 0) {
          order_id = res.data.data.order_id
          t.setData({
            datalist:res.data.data,
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

  pay:function(e){
    console.log(e.currentTarget.dataset.type, order_id);
    var that = this;
    var record = e.currentTarget.dataset.type;
    if (record == 'wechat'){
      wx.showLoading({
        title: '加载中...',
        mask: true
      });
      that.wxpay();

    } else if (record == 'RVC' || record == 'credit2'){

      var text = '';
      if (record == 'RVC'){
        text = 'RVC'
      } else if (record == 'credit2'){
        text = '余额'
      }

      wx.showModal({
        title: '提示',
        content: '确认要' + text +'支付吗？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');

            wx.showLoading({
              title: '加载中...',
              mask: true
            });
            that.rpay(record);
          } else {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  rpay:function(e){
    var p = this;
    wx.request({
      url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=group.team.money&comefrom=wxapp',
      data: {
        openid: useropenid,
        order_id: order_id,
        credittype: e
      },
      success: function (res) {
        console.log(res);
        wx.hideLoading();

        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000
        });
        var hindex = '';
        if (res.data.error == 0) {
          hindex = 1;
        }else{
          hindex = 0;
        }
        p.setData({
          hint:hindex
        })
      }
    });
  },

  wxpay:function(){
    var t = this;
    wx.request({
      url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=group.team.small_program&comefrom=wxapp',
      data: {
        openid: useropenid,
        order_id: order_id
      },
      success: function (res) {
        console.log(res);
        wx.hideLoading();

        if(res.data.error == 0){
          wx.requestPayment({
            timeStamp: res.data.data.pay.timeStamp,
            nonceStr: res.data.data.pay.nonceStr,
            package: res.data.data.pay.package,
            signType: res.data.data.pay.signType,
            paySign: res.data.data.pay.paySign,
            success(res) {
              console.log(res);
              t.setData({
                hint: 1
              })
            },
            fail(res) {
              console.log(res);
            }
          })
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          });
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var t = this;
    if(spell == 1){
      console.log('123');
      wx.request({
        url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=group.team.cashier&comefrom=wxapp',
        data: {
          openid: useropenid,
          order_id:optionid
        },
        success: function (res) {
          console.log(res);
          t.setData({
            show: !0
          });
          if (res.data.error == 0) {
            order_id = optionid
            t.setData({
              datalist:res.data.data,
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
      t.paylist();
    }
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})