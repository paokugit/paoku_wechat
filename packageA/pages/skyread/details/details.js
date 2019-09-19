var t = getApp(),
  a = t.requirejs("core");
var f = getApp();

var useropenid = "";

Page({
  data: {
    globalimg: t.globalData.appimg,
    nvabarData: {
      showCapsule: 1,
      title: '中秋佳节倍思亲中秋佳节倍思亲,你回家看亲人了吗?',
      height: t.globalData.height * 2 + 20,
    },
    publish:false,
    focus:false,
    releaseText:'',
    background:'background: #99efd9;',
    readid:''
  },


  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;

    var a = this;
    a.setdata({
      readid: options.id
    })
  },

  

  gaysText:function(e) {
    var m = this;
    let background = m.data.background;
    if (e.detail.value.length > 0){
      background = 'background: #01d7a1;';
    }else{
      background = 'background: #99efd9;';
    }
    this.setData({
      releaseText: e.detail.value,
      background: background
    })
  },

  //输入聚焦
  foucus: function (e) {
    var that = this;
    that.setData({
      inputBottom: e.detail.height-60
    })
  },

  //失去聚焦
  blur: function (e) {
    var that = this;
    that.setData({
      inputBottom: 0
    })
  },

  writebtn:function(e){
    this.setData({
      publish: true
    })
  },
  publishbtn: function (e) {
    this.setData({
      publish: false,
      focus:false
    })
  },
  focusbtn: function (e) {
    this.setData({
      focus: true
    })
  },

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