// pages/store/zhuye.js
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
    merchname: '',
    logo: "",
    merchid: '',
    desc:'',

    showIcon: true,
    gloheight: i.globalData.gloheight 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var a = this
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid
    var newpos = i.getCache("mypos");
    s.get("myown/shophome/index", {
      openid: useropenid,
      merch_id: options.id,
      lat: newpos.lat,
      lng: newpos.lng
    }, function (e) {
      merchphone = e.message.mobile
      merchid = e.message.id
      var name = ''
      var headimg = ''
      var neirong = ''
      // 判断名称
      if (e.message.merchname == '') {
        name = '名称还没有哦'
      } else {
        name = e.message.merchname
      }
      //判断店铺头像
      if (e.message.logo == '') {
        headimg = 'https://www.paokucoin.com/img/backgroup/heart-n@2x.png'
      } else {
        headimg = e.message.logo
      }
      //内容
      if(e.message.desc==''){
        neirong = ''
      }else{
        neirong = e.message.desc
      }
      a.setData({
        merchname: name,
        logo: headimg,
        desc: neirong,
      })

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