var t = getApp(),
  a = t.requirejs("core");

var useropenid = "";
var goods_id = '';
Page({
  data: {
    globalimg: t.globalData.appimg,
    approot: t.globalData.approot,
    showIcon: true,

    colorA:'yhj_img_bg2@2x',
    colorB:'yhj_img_bg_hs1@2x',
    colorC: 'yhj_img_bg_ls1@2x',
    ticketlist:[],
  },
  onLoad: function (options) {
    var userinfo = t.getCache('userinfo');
    useropenid = userinfo.openid;

    goods_id = t.goodsid;
  },
  
  titList:function(){
    var t = this;
    wx.request({
      url: 'http://192.168.3.104:8081/app/ewei_shopv2_api.php?i=1&r=app.personcenter.coupon&comefrom=wxapp',
      data: {
        merchid: goods_id
      },
      success(res) {
        t.setData({
          loading: !0,
          show: !0
        });
        console.log(res);

        if (res.data.error == 0) {
          t.setData({
            ticketlist:res.data.data
          })
        } else if (res.data.error == 1) {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    }) 
  },

  drawBtn:function(e){
    var goodsid = e.currentTarget.dataset.id;
    console.log(goodsid);
    wx.showLoading({
      title: '正在领取...',
      mask: true
    })
    var m = this;
    wx.request({
      url: 'http://192.168.3.104:8081/app/ewei_shopv2_api.php?i=1&r=myown.shophome.coupon_receive&comefrom=wxapp',
      data: {
        openid: useropenid,
        id: goodsid
      },
      success(res) {
        console.log(res);
        wx.hideLoading();
        if (res.data.error == 0) {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          });
        } else if (res.data.error == 1) {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    }) 
  },

  onShow: function(){
    this.titList();
  },

  onReachBottom: function() {
    
  },
  
});