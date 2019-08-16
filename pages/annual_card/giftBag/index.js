var t = getApp(),
  a = t.requirejs("core");
var f = getApp();

var useropenid = "";
Page({
  data: {
    globalimg: t.globalData.appimg,
    nvabarData: {
      showCapsule: 1,
      title: '每月礼包',
      height: t.globalData.height * 2 + 22,
    },

    goods_list:[]
  },

  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;
    var m = this;
    m.list();
  },

  list:function(){
    var b = this;
    a.get("member.level.goods_list", {
      openid: b.data.useropenid,
      level_id: 5
    }, function (e) {
      console.log(e);
      b.setData({
        goods_list: e.result.goods
      })
    })
  },
  
  onShow: function () {

  },
})