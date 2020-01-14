var t = getApp(),
  a = t.requirejs("core"),
  s = t.requirejs("jquery");
var f = getApp();

var useropenid = "";
var orderid = '';
var num = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: t.globalData.appimg,
    showIcon: true,
    gloheight: t.globalData.gloheight,

    orderlis: '',
    express:0,//判断是否有快递信息。0无，1有
    trade:0,//是否申请退换货。0未申请，1申请 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;

    console.log(options);
    if (options.id != undefined) {
      orderid = options.id;
    }
    if (options.num != undefined) {
      num = options.num;
    }
    if(options.trade!=undefined){
      this.setData({
        trade: options.trade
      })
    }

    this.datalist();
  },
 
  copyText: function (e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },

  datalist: function () {
    var t = this;
    wx.request({
      url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=group.order.detail&comefrom=wxapp',
      data: {
        order_id: orderid
      },
      success: function (res) {
        console.log(res);
        t.setData({
          show: !0
        });
        if (res.data.error == 0) {
          var indtxt = 0;
          if(Object.keys(res.data.data.logistics).length==0){
            indtxt = 0;
          }else{
            indtxt = 1;
          }
          t.setData({
            orderlis: res.data.data,
            express:indtxt
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

  cancelbtn: function (e) {
    var ly = this;
    var txt = '';
    if (e.currentTarget.dataset.cancel == 1) {
      txt = '取消';
    } else {
      txt = '删除'
    }
    wx.showModal({
      title: '提示',
      content: '确当要' + txt + '吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showLoading({
            mask: true
          })
          wx.request({
            url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=group.order.cancel&comefrom=wxapp',
            data: {
              openid: useropenid,
              order_id: e.currentTarget.dataset.orderid,
              cancel: e.currentTarget.dataset.cancel
            },
            success: function (res) {
              console.log(res);
              wx.hideLoading();

              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
              })
              if (res.data.error == 0) {
                wx.setStorageSync('evaluate', '1');
                wx.navigateBack();
              }
            }
          });
        }
      }
    })
  },

  remindbtn:function(){
    wx.showToast({
      title: '已提醒卖家发货！',
      icon: 'none',
      duration: 2000
    })
  },

  affirm:function(e){
    var om = this;
    wx.showModal({
      title: '提示',
      content: '确认已收到货了吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showLoading({
            mask: true
          })
          wx.request({
            url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=group.order.finish&comefrom=wxapp',
            data:{
              openid:useropenid,
              order_id:e.currentTarget.dataset.id
            },
            success:function(res){
              console.log(res);
              wx.hideLoading();
              if(res.data.error == 0){
                wx.setStorageSync('evaluate', '1');
                wx.navigateBack();
              }
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
              })
            }
          })
        }
      }
    })
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
  onShareAppMessage: function (ops) {
    console.log(ops);
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      return {
        title: '仅剩'+num+'名额',
        path: '/packageA/pages/changce/spelltuan/state/state?teamid=' + ops.target.dataset.teamid +'&type=1',
        imageUrl: ops.target.dataset.img
      }
    }
  }
})