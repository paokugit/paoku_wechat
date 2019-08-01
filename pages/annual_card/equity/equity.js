// pages/annual_card/equity/equity.js
var t = getApp(),
  a = t.requirejs("core");
var f = getApp(); 

var useropenid = "";//用户openid

Page({
  data: {
    globalimg: t.globalData.appimg,
    nvabarData: {
      showCapsule: 1,
      title: '跑库年卡',
      height: t.globalData.height * 2 + 20,
    },
  },

  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;
  },
  
  dredgeBtn:function(e){
    var t = this;
    a.get("member.level.order",{
      openid: useropenid, 
      money: 0.01,
      level_id: 5,
    },function(e){
      if(e.status == 1){
        wx.requestPayment({
          timeStamp: e.result.timeStamp,
          nonceStr: e.result.nonceStr,
          package: e.result.package,
          signType: e.result.signType,
          paySign: e.result.paySign,
          success(res){ 
            wx.navigateTo({
              url: '../member_card/index?useropenid='+useropenid,
            })
          }
        })
      }else{
        wx.showToast({
          title: e.result.message+'，请在到期前十天续费',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

})