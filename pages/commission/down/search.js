var t = getApp().requirejs("core");
var ii = getApp();

var useropenid = "";

var goodname = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: ii.globalData.appimg,
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1,
      title: '搜索',
      height: ii.globalData.height * 2 + 40,
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = ii.getCache('userinfo');
    useropenid = userinfo.openid;
  },

  bindInput: function (t) {
    goodname = t.detail.value;
  },

  seekBtn:function(e){
    if (goodname == ''){
      wx.showModal({
        title: '提示',
        content: '请输入您想搜索的商品',
      })
    }else{
      t.get("commission.down.search",{
        openid:useropenid,
        keywords: goodname,
        page:1
      },function(e){
        console.log(e);
      })
    }
  },  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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
    console.log('123');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})