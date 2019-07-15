var a, e, i = getApp(),
  s = i.requirejs("core");
var f = getApp();
var useropenid = ''
var merchphone = ''
var merchid = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: i.globalData.appimg,
    shopimg: [],
      // 组件所需的参数
      nvabarData: {
          showCapsule: 1, 
          title: '店铺图片', 
          height: i.globalData.height * 2 + 20,
      },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var a = this
    var img = ''
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid
    var newpos = i.getCache("mypos");
    s.get("myown/shophome/index", {
      openid: useropenid,
      merch_id: options.id,
      lat: newpos.lat,
      lng: newpos.lng
    }, function (e) {
      console.log(e.message.shopimg)
      merchphone = e.message.mobile
      merchid = e.message.id
      a.setData({
        shopimg: e.message.shopimg,
      })
    })
  },
  returnstore: function () {
    wx.navigateTo({
      url: '/pages/changce/merch/detail?id=' + merchid,
    })
  },
  previewImage: function (res) {
    console.log(res)
    var imgsrc = res.target.dataset.src;
    var imglist = res.target.dataset.imglist
    console.log(imglist)
    wx.previewImage({
      current: imgsrc,
      urls: imglist,
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

  },

})