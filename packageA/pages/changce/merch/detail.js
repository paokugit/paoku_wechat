var t = getApp(),
  a = t.requirejs("core"),
  e = t.requirejs("jquery");
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

    showIcon: true,
    gloheight: t.globalData.gloheight,


    // -----修改添加
    currentData: 2,
    marqueePace: 1,//滚动速度
    marqueeDistance: 0,//初始滚动距离
    size: 30,
    interval: 20, // 时间间隔
    informTxt: "服务器升级通知，将于今晚23:00至24:00进行停机更新。"
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



  // -----修改添加
  //获取当前滑块的index
  checkCurrent: function (e) {
    const that = this;
    that.setData({
      currentData: e.currentTarget.dataset.current
    })
  },

  onShow:function(){
    var that = this;
    var length = that.data.informTxt.length * that.data.size;//文字长度
    var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
    that.setData({
      length: length,
      windowWidth: windowWidth
    });
    that.scrollFn();
  },
  scrollFn: function () {
    var that = this;
    var length = that.data.length;
    var windowWidth = that.data.windowWidth;
    if (length > windowWidth) {
      var interval = setInterval(function () {
        var crentleft = that.data.marqueeDistance;
        if (crentleft < length-400) {
          that.setData({
            marqueeDistance: crentleft + that.data.marqueePace
          })
        }else {
          that.setData({
            marqueeDistance: 0 
          });
          clearInterval(interval);
          that.scrollFn();
        }
      }, that.data.interval);
    }
  },
  //----------


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