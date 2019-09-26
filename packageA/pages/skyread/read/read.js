var t = getApp(),
  a = t.requirejs("core");
var f = getApp();

var useropenid = "";

Page({   

  data: {
    globalimg: t.globalData.appimg,
    showIcon: true,
    gloheight: t.globalData.gloheight,
    
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
      wx.hideLoading()
      if(e.error == 0){
        let totalPage = Math.ceil(e.message.count / 10);
        let totalList = e.message.list
        m.setData({
          totalPage: totalPage,
          list: m.data.list.concat(totalList)
        })
      } else if (e.error == 1){
        wx.showModal({
          title: '提示',
          content: e.message,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else {
              console.log('用户点击取消')
            }
          }
        })
      }
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
      m.setData({
        page: page + 1
      })
      m.list();
    } else {
      m.setData({
        isShow: 1
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})