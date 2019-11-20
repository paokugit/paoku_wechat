// pages/member/rvc/recharge.js
var t = getApp(),
  a = t.requirejs("core");
var f = getApp();

var useropenid = "";
var str = 0;

var uuid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: t.globalData.appimg,
    showIcon: true,
    gloheight: t.globalData.gloheight,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;

    this.setData({
      show: !0,
      record:-1
    })
  },

  formName: function (e) {
    var m = this;
    str = e.detail.value;
    var num = str.indexOf('.');
   
    if(num != -1){
      var long = str.length;
      var errand = long-num-1;
      if (errand >=6){
        m.setData({
          record: long
        })
      }
    }
  },

  paybtn:function(e){
    if (str.length == undefined || str == 0 || str < 0.001){
      wx.showToast({
        title: '请输入充值数量！',
        icon: 'none',
        duration: 2000
      })
    }else{
      a.get("game.rvc_pay", {
        openid: useropenid,
        amount: str
      }, function (e) {
        console.log(e);
        if(e.error == 0){
          uuid = e.data.uuid;
          wx.showModal({
            title: '请点击确定按钮复制链接，在浏览器中打开完成支付',
            content: e.data.payUrl,
            success: function (res) {
              if (res.confirm) {
                
                wx.setClipboardData({
                  data: e.data.payUrl,
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

              } else {
                console.log('用户点击取消')
              }

            }

          })
          // wx.navigateTo({
          //   url: '/pages/member/webview/webview?str='+e.data.payUrl,
          // })
        }else if(e.error == 1){
          wx.showToast({
            title: e.message,
            icon: 'none',
            duration: 2000
          })
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
    console.log(uuid);
    if (uuid != undefined){
      a.get("game.check_rvc",{
        uuid: uuid
      },function(e){
        console.log(e);
        
        wx.showModal({
          title: '提示',
          content: e.message,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.navigateBack({
                delta: 1
              })
            } else {
              console.log('用户点击取消')
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
        
      })
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