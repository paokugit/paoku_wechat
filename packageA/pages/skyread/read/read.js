var t = getApp(),
  a = t.requirejs("core");
var f = getApp();

var useropenid = "";

Page({  

  data: {
    globalimg: t.globalData.appimg,
    nvabarData: {
      showCapsule: 1,
      title: '每日必读',
      height: t.globalData.height * 2 + 20,
    },
    isShow:0,
    page:1,
    list:[],
    totalPage:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;

    var a = this;

    a.list();
  },

  list:function(e){
    var m = this;
    wx.showLoading({
      title: '加载中...',
    });
    a.get("myown.reading.index",{
      page: m.data.page
    },function(e){
      console.log(e);
      let totalPage = Math.ceil(e.message.count / 10);
      let totalList = e.message.list
      m.setData({
        totalPage: totalPage,
        list: m.data.list.concat(totalList)
      })
      wx.hideLoading()
    })
  },

  readbtn:function(e){
    wx.navigateTo({
      url: '/packageA/pages/skyread/details/details?id=' + e.currentTarget.dataset.id
    })
  },
  
 
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
    var m = this;
    let page = m.data.page;
    let totalpage = m.data.totalPage;

    if (page < totalpage) {
      wx.showLoading({
        title: '加载中...',
      });
      m.setData({
        page: page + 1
      })
      m.list();
    } else {
      m.setData({
        isShow: 1
      })
    }
    setTimeout(() => {
      wx.hideLoading()
    }, 1000)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})