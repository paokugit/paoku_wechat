var t = getApp(),
  a = t.requirejs("core");
var f = getApp();

var useropenid = "";

Page({
  data: {
    globalimg: t.globalData.appimg,
    showIcon: true,
    gloheight: t.globalData.gloheight,
    page: 1,
    recordList: [],
    totalPage: 0,
    isShow: 0
  },
  onLoad: function(options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;
    var b = this;
    b.setData({
      useropenid: useropenid
    });
    b.reqDatalist();
  },
  reqDatalist: function() {
    var b = this
    a.get("member.level.record", {
      openid: b.data.useropenid,
      page: b.data.page
    }, function(e) {
      console.log(e);
      if (e.status == 1) {
        let totalPage = Math.ceil(e.result.total / e.result.pageSize);
        let totalList = e.result.record
        b.setData({
          totalPage: totalPage,
          recordList: b.data.recordList.concat(totalList)
        })
      } else if (e.status == 0) {
        wx.showToast({
          title: e.result.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  onReachBottom: function() {
    let page = this.data.page;
    let totalpage = this.data.totalPage;
    if (page <= totalpage) {
      wx.showLoading({
        title: '加载中...',
      });
      this.setData({
        page: page + 1
      })
      this.reqDatalist();
    } else {
      this.setData({
        isShow: 1
      })
    }
    setTimeout(() => {
      wx.hideLoading()
    }, 1000)

  },


})