var t = getApp(),
  a = t.requirejs("core");
var f = getApp(); 

var useropenid = "";

Page({
  data: {
    globalimg: t.globalData.appimg,
    nvabarData: {
      showCapsule: 1,
      title: '跑库年卡',
      height: t.globalData.height * 2 + 20,
    },

    goodGift:''
  },

  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;
    var m = this;
    a.get("member.level.detail",{},function(e){
      m.setData({
        goodGift: e.result.goods_id
      })
    })
  },
  
  dredgeBtn:function(e){
    var t = this;
    var order = '';

    a.get("member.level.order",{
      openid: useropenid,
      money: 0.01,
      level_id: 5,
    },function(e){
      console.log(e);
      order = e.result.order_id;

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
          },
          fail(res) {
            a.get("member.level.cancel", {
              openid: useropenid,
              order_id: order
            }, function (e) {
              console.log(e);
            })
          }
        })
      } else {
        wx.showToast({
          title: e.result.message + '，请在到期前十天续费',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

})