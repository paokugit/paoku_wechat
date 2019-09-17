var t = getApp(),
  a = t.requirejs("core");
var f = getApp();

var useropenid = "";
 
Page({
  data: {
    globalimg: t.globalData.appimg,
    nvabarData: {
      showCapsule: 1,
      title: '商品推荐',
      height: t.globalData.height * 2 + 20,
    },
    message:[],
    page:1,
    totalPage: 0,
    isShow:0,
    btnId:0
  },

  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;

    var m = this; 
    m.setData({
      btnId: options.btnId
    })
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    m.list();
  },

  list:function(e){
    var m = this;
    a.get("drcircle.my.sel_good", {
      openid: useropenid,
      page: m.data.page,
    }, function (e) {
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
      let totalList = e.message.list;
      let totalPage = Math.ceil(e.message.total / 10);
      m.setData({
        message: m.data.message.concat(totalList),
        totalPage: totalPage
      })
    })
  },

  btnA:function(e){
    var m = this;
    let btnId = e.currentTarget.dataset.id;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      mydata: {
        b: btnId
      }
    }) 
    wx.navigateBack({
      delta: 1,
    })
    m.setData({
      btnId: btnId
    })
  },
 

  onShow: function () {
  
  },

  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let page = this.data.page;
    let totalpage = this.data.totalPage;
    if (page < totalpage) {
      wx.showLoading({
        title: '加载中...',
      });
      this.setData({
        page: page + 1
      })
      this.list();
    }else{
      this.setData({
        isShow: 1
      })
    }
    setTimeout(() => {
      wx.hideLoading()
    }, 1000)
  }
})