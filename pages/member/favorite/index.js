var t = getApp(),
  e = t.requirejs("core");

t.requirejs("foxui");

var useropenid = "";
Page({
  data: {
    icons: t.requirejs("icons"),
    page: 1,
    totalPage:1,
    pageA:1,
    totalPageA: 1,
    totalA:0,
    loading: !1,
    loaded: false,
    isedit: !1,
    isCheckAll: !1,
    checkObj: {},
    checkNum: 0,
    list: [],
    shoplist:[],
    type: 1,
    loading: !0,
    showIcon: true,
    gloheight: t.globalData.gloheight,
    globalimg: t.globalData.appimg,
  },
  onLoad: function(e) {
    var userinfo = t.getCache('userinfo');
    useropenid = userinfo.openid;
    
    t.url(e);
    this.getList();
  },
  onReachBottom: function() {
    
  },
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
  },
  getList: function() {
    var t = this;
    t.setData({
      loading: !0
    });
    wx.request({
      url: 'http://192.168.3.104:8081/app/ewei_shopv2_api.php?i=1&r=member.favorite.get_list&comefrom=wxapp',
      data: {
        openid: useropenid,
        page: t.data.page
      },
      success(res) {
        console.log(res);

        if (res.data.error == 0) {
          let totalPage = Math.ceil(res.data.total / res.data.pagesize);
          var a = {
            loading: !1,
            total: res.data.total,
            totalPage: totalPage,
            show: !0
          };
          res.data.list.length > 0 && (a.page = t.data.page + 1, a.list = t.data.list.concat(res.data.list),
            res.data.list.length < res.data.pagesize), t.setData(a);
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

  shList:function(){
    var m = this;
    m.setData({
      loading: !0
    });
    wx.request({
      url: 'http://192.168.3.104:8081/app/ewei_shopv2_api.php?i=1&r=member.favorite.get_merchlist&comefrom=wxapp',
      data: {
        openid: useropenid,
        page: m.data.pageA
      },
      success(res) {
        console.log(res);

        if (res.data.error == 0) {
          let totalPage = Math.ceil(res.data.total / res.data.pagesize);
          m.setData({
            loading: !1,
            show: !0,
            totalA: res.data.total,
            totalPageA: totalPage,
            pageA:m.data.pageA+1,
            shoplist: m.data.shoplist.concat(res.data.list)
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

  itemClick: function(t) {
    var a = this,
      i = e.pdata(t).id,
      s = e.pdata(t).goodsid;
    if (a.data.isedit) {
      var c = a.data.checkObj,
        l = a.data.checkNum;
      c[i] ? (c[i] = !1, l--) : (c[i] = !0, l++);
      var o = !0;
      for (var n in c)
        if (!c[n]) {
          o = !1;
          break;
        }
      a.setData({
        checkObj: c,
        isCheckAll: o,
        checkNum: l
      });
    } else wx.navigateTo({
      url: "/pages/goods/detail/index?id=" + s
    });
  },
  btnClick: function(t) {
    var a = this,
      i = t.currentTarget.dataset.action;
    if ("edit" == i) {
      c = {};

      if(a.data.type == 1){
        for (var s in a.data.list) c[a.data.list[s].id] = !1;
      }else if(a.data.type == 2){
        for (var s in a.data.shoplist) c[a.data.shoplist[s].id] = !1;
      }

      a.setData({
        isedit: !0,
        checkObj: c,
        isCheckAll: !1
      });
    } else if ("delete" == i) {
      var c = a.data.checkObj,
        l = [];
      for (var s in c) c[s] && l.push(s);
      if (l.length < 1) return;
      e.confirm("取消关注后不可恢复，确定要取消关注吗？", function() {
        if(a.data.type == 1){
          var array = JSON.stringify(l);
          console.log(l);
          var array = JSON.stringify(l);

          e.post("member/favorite/remove", {
            ids: l
          }, function (t) {
            console.log(t);
            a.setData({
              isedit: !1,
              checkNum: 0,
              page: 0,
              list: []
            }), a.getList();
          });

        }else if(a.data.type == 2){
          console.log('123');
          e.post("member.favorite.remove_shop", {
            ids: l
          }, function (t) {
            console.log(t);
            a.setData({
              isedit: !1,
              checkNum: 0,
              pageA: 0,
              shoplist: []
            }), a.shList();
          });
        }
        

      });
    } else "finish" == i && a.setData({
      isedit: !1,
      checkNum: 0
    });
  },
  checkAllClick: function() {
    var t = !this.data.isCheckAll,
      e = this.data.checkObj,
      a = {
        isCheckAll: t,
        checkObj: e
      };
    for (var i in e) a.checkObj[i] = !!t;
    a.checkNum = t ? this.data.list.length : 0, this.setData(a);
  },
  myTab: function(t) {
    var ee = this,
      i = e.pdata(t).type;
      
    ee.setData({
      type: i,
      page:1,
      pageA:1,
      isedit: !1,
      checkNum: 0,
      list:[],
      shoplist:[],
      loaded:false
    });
    if (i == 1) {
      ee.getList();
    } else if (i == 2) {
      ee.shList();
    }
  },

  goodsScroll:function(){
    if (this.data.page <= this.data.totalPage) {
      this.getList();
    } else {
      this.setData({
        loaded: true
      })
    }
  },

  storeScroll:function(){
    if (this.data.pageA <= this.data.totalPageA) {
      this.shList();
    } else {
      this.setData({
        loaded: true
      })
    }
  }
});