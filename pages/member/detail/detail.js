var t = getApp(),
  a = t.requirejs("core");
//   当前登录人的openid
var f = getApp();
var userinfo = f.getCache('userinfo');
console.log(userinfo)
Page({
  data: {
    globalimg: f.globalData.appimg,
    icons: t.requirejs("icons"),
    type: 1,
    isopen: !1,
    page: 1,

    list: [],
    totalPage: 0,
    isShow: 0,
    downdis: 'block',
    topdis: 'none',
    reasondis: 'none',
    showIcon: true,
    gloheight: f.globalData.gloheight
  },
  // 上拉加载
  onLoad: function (a) {
    this.setData({
      show: !0,
    })
    this.getList();
  },
  downbtn: function (e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      downdis: 'none',
      topdis: 'block',
      reasondis: 'block'
    })
  },
  topbtn: function (e) {
    //    console.log(e.currentTarget.dataset.id)
    this.setData({
      topdis: 'none',
      downdis: 'block',
      reasondis: 'none'
    })
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  onReachBottom: function () {
    let page = this.data.page;
    let totalpage = this.data.totalPage;
    if (page <= totalpage) {
      wx.showLoading({
        title: '加载中...',
      });
      this.setData({
        page: page + 1
      })
      this.getList();
    } else {
      this.setData({
        isShow: 1
      })
    }
    setTimeout(() => {
      wx.hideLoading()
    }, 200)

  },
  getList: function () {
    var t = this;
    a.get("member/log/money_log", {
      openid: userinfo.openid,
      page: t.data.page,
      type: t.data.type
    }, function (a) {
      console.log(a)
      if (a.error == 0) {
        let totalPage = Math.ceil(a.total / a.pagesize)
        let totalList = a.list
        t.setData({
          total: a.total,
          totalPage: totalPage,
          list: t.data.list.concat(totalList)
        })
      }

    });
  },
  myTab: function (t) {
    console.log(t)
    var e = this,
      i = a.pdata(t).type;
    e.setData({
      type: i,
      page: 1,
      list: [],
      loading: !0
    }), e.getList();
  }
});