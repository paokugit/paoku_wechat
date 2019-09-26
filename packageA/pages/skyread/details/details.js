var t = getApp(),
  a = t.requirejs("core"),
  s = t.requirejs("wxParse/wxParse");
var f = getApp();

var useropenid = "";
var readid = "";
var artTit = ""; 
var readmusic = "";
var music_title = "";
var isPlayingMusic = true;

var back = wx.getBackgroundAudioManager();

Page({
  data: {
    globalimg: t.globalData.appimg,
    nvabarData: {
      showCapsule: 1,
      title: artTit,
      height: t.globalData.height * 2 + 20, 
    },
    publish:false,
    focus:false,
    releaseText:'',
    background:'background: #99efd9;',

    articleTit:"",
    articleImg:'',
    articleTime:'',
    music_title:""
  },


  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;
    readid = options.id;

    var b = this;
    b.details();
  },

  details:function(e){
    var m = this;
    console.log(readid);
    wx.showToast({ 
      title: '加载中', 
      icon: 'loading', 
      duration: 1000 
    });
    a.get("myown.reading.detail",{
      readid: readid
    },function(e){
      console.log(e);
      wx.hideLoading()
      if(e.error == 0){
        artTit = e.message.title;
        readmusic = e.message.music;
        music_title = e.message.music_title;

        back.src = readmusic;
        back.title = music_title;
        back.play();
        isPlayingMusic = false

        s.wxParse("wxParseData", "html", e.message.content, m, "25"), 
        m.setData({
          articleTit:e.message.title,
          articleImg: e.message.detail_img,
          articleTime: e.message.create_time,
          music_title: e.message.music_title
        })
      }
    })
  },

  bindback: function () {
    var that = this;
    
    if (isPlayingMusic == true) {
      console.log('123');
      back.src = readmusic;
      back.title = music_title;
      back.play();
      isPlayingMusic = false
    }else{
      console.log('456');
      back.pause();
      isPlayingMusic = true
    }
  },


  // 输入框
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
    back.stop();
    console.log('asdsa');
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