var t = getApp(),
  a = t.requirejs("core");
var f = getApp(); 

var useropenid = "";

Page({
  data: {
    globalimg: t.globalData.appimg,
    showIcon: true,
    gloheight: t.globalData.gloheight,

    goods_list:[],

    autoplayA: true,
    intervalA: 2000,
    durationA: 1000,
    circularA: true
  },

  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;
    var m = this;
    
    a.get("member.level.goods_list", {
      openid: m.data.useropenid,
      level_id: 5
    }, function (e) {
      console.log(e);
      if (e.status == 1){
        m.setData({
          goods_list: e.result.goods
        })
      }else if(e.status == 0){
        wx.showToast({
          title: e.result.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
    
  },
  
  dredgeBtn:function(e){
    var t = this;
    var order = '';

    a.get("member.level.order",{
      openid: useropenid,
      money: 396,
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