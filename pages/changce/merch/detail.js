var t = getApp(),
  a = t.requirejs("core"),
  e = t.requirejs("jquery");;
Page({
  data: {
    merchid: 0,
    merch: [],
    cateid: 0,
    page: 1,
    isnew:0,
    isrecommand:0,
    loading: false,
    loaded: false,
    list: [],
    approot: t.globalData.approot,
    globalimg: t.globalData.appimg,
      // 组件所需的参数
      nvabarData: {
          showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
          title: '店铺详情', //导航栏 中间的标题
          // 此页面 页面内容距最顶部的距离
          height: t.globalData.height * 2 + 20,
      },
  },
  onLoad: function (t) {
      var b = decodeURIComponent(t.scene);
      if (!t.id && b) {
          var i = a.str2Obj(b);
          t.id = i.id;
        //绑定会员来源
        a.get("help/index/bang_agent", { merchid: t.id }, function (c) {
          console.log(c)
        })
      }
    this.setData({
      merchid: t.id
    }),
      this.getMerch(),
      this.getList()
  },
  getMerch: function () {
    var t = this;
    a.get("changce/merch/get_detail", { id: t.data.merchid}, function (a) {
      t.setData({
        merch: a.merch
      })
    })
  },
  getList: function () {
    var t = this;
    console.log(this.data.merchid);
      wx.setStorageSync("merchid", this.data.merchid)
    a.loading(),
      this.setData({
        loading: true
      }),
      a.get("changce/merch/goods_list", {
        page: this.data.page,
        cateid: this.data.cateid,
        id: t.data.merchid,
        isnew: this.data.isnew,
        isrecommand: this.data.isrecommand,
      }, function (e) {
        var i = {
          loading: false,
          total: e.total,
          pagesize: e.pagesize
        };
        e.list.length > 0 && (i.page = t.data.page + 1, i.list = t.data.list.concat(e.list), e.list.length < e.pagesize && (i.loaded = true), t.setSpeed(e.list)),
          t.setData(i),
          a.hideLoading()
      })
  },
  clickrec: function () {
    this.setData({
      isrecommand: 1,
      isnew: 0,
      page:1,
      loading: false,
      loaded: false,
      list: []
    })
    this.getList()
  },
  clicknew: function () {
    this.setData({
      isrecommand: 0,
      isnew: 1,
      page: 1,
      loading: false,
      loaded: false,
      list: []
    })
    this.getList()
  },
  clickall: function () {
    this.setData({
      isrecommand: 0,
      isnew: 0,
      page: 1,
      loading: false,
      loaded: false,
      list: []
    })
    this.getList()
  },
  setSpeed: function (t) {
    if (t && !(t.length < 1))
      for (var a in t) {
        var e = t[a];
        if (!isNaN(e.lastratio)) {
          var i = e.lastratio / 100 * 2.5,
            s = wx.createContext();
          s.beginPath(),
            s.arc(34, 35, 30, .5 * Math.PI, 2.5 * Math.PI),
            s.setFillStyle("rgba(0,0,0,0)"),
            s.setStrokeStyle("rgba(0,0,0,0.2)"),
            s.setLineWidth(4),
            s.stroke(),
            s.beginPath(),
            s.arc(34, 35, 30, .5 * Math.PI, i * Math.PI),
            s.setFillStyle("rgba(0,0,0,0)"),
            s.setStrokeStyle("#ffffff"),
            s.setLineWidth(4),
            s.setLineCap("round"),
            s.stroke();
          var o = "coupon-" + e.id;
          wx.drawCanvas({
            canvasId: o,
            actions: s.getActions()
          })
        }
      }
  },
    scancodebtn:function(){
        wx.showModal({
            title: '提示',
            content: '暂未开放',
        })
    },
  bindTab: function (t) {
    var e = a.pdata(t).cateid;
    this.setData({
      cateid: e,
      page: 1,
      list: []
    }),
      this.getList()
  },
  onReachBottom: function () {
    this.data.loaded || this.data.list.length == this.data.total || this.getList()
  },
  jump: function (t) {
    var e = a.pdata(t).id;
    e > 0 && wx.navigateTo({
      url: "/pages/sale/coupon/detail/index?id=" + e
    })
  }
})