var a, e, i = getApp(),
  s = i.requirejs("core");
var f = getApp();
var useropenid = ''
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mask:1,
    globalimg: i.globalData.appimg,
    color: '#01d7a1',
    underline: 0,
    color1: '#333333',
    informtitle:'',
    informlist:[],
    displayzhuang:'',
    displayzhuang1:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var a = this
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid
    s.get("shop.notice.get_list",{
      page : 1,
      openid : useropenid
    },function(e){
      console.log(e)
      var d = e.notice
      if(e.list.length>0){
       a.setData({
          mask:0,
          informlist:e.list,
        })
      }

    })
  },
  assistant:function(){
    var _that = this
    _that.setData({
      color:'#333333',
      color1:'#01d7a1',
      underline:1
    })
  },
  zan_tap:function(){
    s.get("shop.notice.zan",{
      openid:useropenid,
      status:1
    },function(e){
      a.setData({
        praise:1
      })
    })
  },
  inform:function(){
    var _that = this
    _that.setData({
      color: '#01d7a1',
      color1: '#333333', 
      underline: 0
    })
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

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})