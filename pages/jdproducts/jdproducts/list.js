// pages/jdproducts/jdproducts/list.js
//   当前登录人的openid
var f = getApp();
var t = getApp(),
  a = t.requirejs("core");
var useropenid = ''
// 新加
var pricemark = 0;
var salesmark = 0;
var sortorder = "";
var sortby = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: f.globalData.appimg,
    showIcon: true,
    gloheight: f.globalData.gloheight,
    type: 0,
    page: 1,
    list: [],
    allPrice: 'sc_tj_icon_jg_nor@2x',
    allSales: 'sc_tj_icon_jg_nor@2x',
    imgA: 'icon_sp@2x',
    imgB: 'icon_hp@2x',
    nowSign: 0,
    imgUrls: [],
    autoplay: true,
    interval: 5000,
    duration: 1000,
    swiperCurrent: 0,
    dots: true,
    catelist: [],
    status: '',
    pricesort: "",
    salesort: "",
    totalPage: 0,
    searchcontent: "",
    topdisp: 'none',
    scrollTop: 0,
    scrollLeft: 0,
    loading:!0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(a) {
    var that = this
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid
    that.getbanner(),
      that.getList()
  },
  _handleScroll(selectedId) {
    var _this = this;
    var query = wx.createSelectorQuery(); //创建节点查询器
    query.select('#item-' + selectedId).boundingClientRect(); //选择id='#item-' + selectedId的节点，获取节点位置信息的查询请求
    query.select('#scroll-view').boundingClientRect(); //获取滑块的位置信息
    //获取滚动位置
    query.select('#scroll-view').scrollOffset(); //获取页面滑动位置的查询请求
    query.exec(function(res) {
      _this.setData({
        scrollLeft: res[2].scrollLeft + res[0].left + res[0].width / 2 - res[1].width / 2
      });
    });
  },

  onCouponItemClick: function(e) {
    console.log(e)
    var id = e.currentTarget.dataset.type;
    var curIndex = 0;
    for (var i = 0; i < this.data.catelist.length; i++) {
      if (id == "") {
        console.log('全部')
        this.setData({
          status: '',
        })
      }
      if (id == this.data.catelist[i].id) {
        this.setData({
          status: id,

        })
        curIndex = i;
        this._handleScroll(id);
      } else {}
    }

    this.setData({
      catelist: this.data.catelist,
      list: [],
      page: 1,
      empty: !1,
      pricesort: "",
      salesort: "",
      nowSign: 0,
      // show: !1,
      allPrice: 'sc_tj_icon_jg_nor@2x',
      allSales: 'sc_tj_icon_jg_nor@2x',
    }), this.getList();
    console.log(this.data.status)
  },
  // selected: function (t) {
  //   var e = a.data(t).type;
  //   console.log(e)
  //   this.setData({
  //     list: [],
  //     page: 1,
  //     status: e,
  //     empty: !1,
  //     pricesort: "",
  //     salesort: "",
  //     nowSign: 0,
  //     show: !1,
  //     allPrice: 'sc_tj_icon_jg_nor@2x',
  //     allSales: 'sc_tj_icon_jg_nor@2x',
  //   }), this.getList();
  // },
  getbanner: function() {
    var that = this
    a.get("app.superior.banner", {}, function(e) {
      console.log(e)
      if (e.error == 0) {
        that.setData({
          show: !0,
          imgUrls: e.data.banner,
          catelist: e.data.cate,
          // status: res.data.data.cate[0].id
        })
      } else {
        wx.showModal({
          title: '提示',
          content: e.message,
        })
      }
    })

  },
  getList: function() {
    var tt = this
    tt.setData({
      loading:!0
    }),
    a.get("app.superior.goodlist", {
      cate_id: tt.data.status,
      price: tt.data.pricesort,
      sale: tt.data.salesort,
      page: tt.data.page,
      keyword: tt.data.searchcontent
    }, function(e) {
      console.log(e)
      if (e.error == 0) {
        let totalPage = Math.ceil(e.data.total / e.data.pagesize);
        let totalList = e.data.list
        tt.setData({
          show: !0,
          loading:!1,
          totalPage: totalPage,
          // list: res.data.data.list
          list: tt.data.list.concat(totalList)
        })
      } else {
        wx.showModal({
          title: '提示',
          content: e.message,
        })
      }
    })
  },
  searchbtn: function(e) {
    console.log(this.data.searchcontent)
    this.setData({
      loading: !0,
      status: '',
      pricesort: "",
      salesort: "",
      list: []
    }), this.getList()
  },
  searchcon: function(e) {
    console.log(e)
    this.setData({
      searchcontent: e.detail.value
    })
  },
  // 获取滚动条当前位置
  onPageScroll: function(e) {
    this.setData({
      scrollTop: e.scrollTop
    })
    if (e.scrollTop > 2000) {
      this.setData({
        topdisp: 'block'
      });
    } else {
      this.setData({
        topdisp: 'none'
      });
    }
  },
  //回到顶部
  goTop: function(e) { // 一键回到顶部
    var a = this
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
      a.setData({
        topdisp: 'none'
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  swiperChange: function(e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  checkAllt: function(e) {
    const that = this;
    let mowtxt = e.currentTarget.dataset.now;
    let priceImg;
    let salesImg;
    if (mowtxt == 0) {
      that.setData({
        loading: !0,
        pricesort: "",
        salesort: ""
      })
      // 综合
      priceImg = 'sc_tj_icon_jg_nor@2x';
      salesImg = 'sc_tj_icon_jg_nor@2x';
      pricemark = 0;
      salesmark = 0;
    } else if (mowtxt == 1) {
      sortorder = "minprice"
      if (pricemark == 0) {
        priceImg = 'sc_tj_icon_jg_xs@2x';
        pricemark = 1;
        // 价格升序，由低到高
        that.setData({
          loading: !0,
          pricesort: "asc",
          salesort: ""
        })
      } else if (pricemark == 1) {
        priceImg = 'sc_tj_icon_jg_xx@2x';
        pricemark = 0;
        // 价格降序，由高到低
        that.setData({
          loading: !0,
          pricesort: "desc",
          salesort: ""
        })
      }
      salesImg = 'sc_tj_icon_jg_nor@2x';
      salesmark = 0;

    } else if (mowtxt == 2) {
      if (salesmark == 0) {
        salesImg = 'sc_tj_icon_jg_xs@2x';
        salesmark = 1;
        // 销量升序，由低到高
        that.setData({
          loading: !0,
          pricesort: "",
          salesort: "asc"
        })
      } else if (salesmark == 1) {
        salesImg = 'sc_tj_icon_jg_xx@2x';
        salesmark = 0;
        // 销量降序，由高到低
        that.setData({
          loading: !0,
          pricesort: "",
          salesort: "desc"
        })
      }
      priceImg = 'sc_tj_icon_jg_nor@2x';
      pricemark = 0;

    }
    that.setData({
      nowSign: mowtxt,
      allPrice: priceImg,
      allSales: salesImg,
      page: 1,
      list: []
    }), that.getList()
  },
  // selected: function(t) {
  //   var e = a.data(t).type;
  //   console.log(e)
  //   this.setData({
  //     list: [],
  //     page: 1,
  //     status: e,
  //     empty: !1,
  //     pricesort: "",
  //     salesort: "",
  //     nowSign: 0,
  //     show: !1,
  //     allPrice: 'sc_tj_icon_jg_nor@2x',
  //     allSales: 'sc_tj_icon_jg_nor@2x',
  //   }), this.getList();
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
  },
  // onReachBottom: function() {

  // },
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
      this.getList();
    } else {
      this.setData({
        show: !0
      })
    }
    setTimeout(() => {
      wx.hideLoading()
    }, 200)

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})