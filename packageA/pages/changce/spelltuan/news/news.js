var t = getApp(),
  a = t.requirejs("core"),
  s = t.requirejs("jquery");
var f = getApp();

var useropenid = "";
var orderid = "";
var refundid = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: t.globalData.appimg,
    showIcon: true,
    gloheight: t.globalData.gloheight,

    hidden:0,
    schedule:[],
    firmName:'请选择退货物流',
    express:'',
    goodslis:'',
    mobile:'',
    expresssn:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;

    console.log(options);
    orderid = options.id
    refundid = options.refundid;
    this.datalist();
  },

  datalist:function(){
    var t = this;
    wx.request({
      url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=group.order.refund_mes&comefrom=wxapp',
      data: {
        order_id: orderid
      },
      success: function (res) {
        console.log(res);
        if (res.data.error == 0) {
          var phone = res.data.data.address.mobile;
          var str2 = phone.substr(0,3)+"****"+phone.substr(7);  
          t.setData({
            show: !0,
            goodslis: res.data.data,
            mobile:str2
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

  // 选择物流
  logistics:function(){ 
    var t = this;
    t.setData({
      show:0
    })
    wx.request({
      url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=app.orderrefund.express&comefrom=wxapp',
      data: {},
      success: function (res) {
        console.log(res);
        if (res.data.error == 0) {
          t.setData({
            show: !0,
            schedule:res.data.data,
            hidden:1
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
  wuliubtn:function(e){
    console.log(e.currentTarget.dataset);
    this.setData({
      hidden:0,
      firmName:e.currentTarget.dataset.name,
      express:e.currentTarget.dataset.express
    })
  },

  // 获取输入框内容
  bindinput:function(e){
    console.log(e.detail.value);
    this.setData({
      expresssn:e.detail.value
    })
  },
  // 提交物流信息
  submitBtn:function(){
    var that = this;
    console.log(that.data.firmName,that.data.express,that.data.expresssn)
    if(this.data.firmName==''||this.data.expresssn==''){
      wx.showToast({
        title: '请将物流信息填写完整在进行提交！！',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.request({
        url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=group.order.submit_express&comefrom=wxapp',
        data: {
          openid:useropenid,
          refund_id:refundid,
          expresscom:that.data.firmName,
          express:that.data.express,
          expresssn:that.data.expresssn
        },
        success: function (res) {
          console.log(res);
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
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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