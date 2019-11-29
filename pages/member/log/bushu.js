var t = getApp(),
  a = t.requirejs("core");
var f = getApp();
var userinfo = f.getCache('userinfo');
var app = getApp()
Page({
  data: {
    icons: t.requirejs("icons"),
    showIcon: true,
    gloheight: app.globalData.gloheight,
    type: 1,
    loading: !0,
    list: [],
    page: 1,
    
    typeIndex:1,
  },

  onLoad: function(a) {
 
    this.getList();
  },
  

  getList: function() {
    var t = this;
    t.setData({
      loading: !0
    }), a.get("member/log/RVC_log", {
      openid: userinfo.openid,
      type: t.data.type,
      page: t.data.page
    }, function(a) {
      console.log(a);
      if (a.error == 0 ){
        let sum = a.total;
        if(sum >= a.page){
          sum = 0;
        }
        var e = {
          loading: !1,
          total: sum,
          show: !0
        };
        if (1 == t.data.page) {
          var i = "RVC明细";
          wx.setNavigationBarTitle({
            title: i
          });
        }
        t.setData({ typeIndex: a.type})
        a.list || (a.list = []), a.list.length > 0 && (e.page = t.data.page + 1, e.list = t.data.list.concat(a.list),
          a.list.length < a.pagesize && (e.loaded = !0)), t.setData(e);
      }

    });
  },

  myTab: function(t) {
    var e = this,
      i = a.pdata(t).type;
    e.setData({
      type: i,
      page: 1,
      list: [],
      loading: !0
    }), e.getList();
  },

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },

  onReachBottom: function () {
    this.getList();
  }
});