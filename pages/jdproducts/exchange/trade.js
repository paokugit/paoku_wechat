// pages/playmethod/playmethod/playmethod.js
var t = getApp(),
  a = t.requirejs("core");
// console.log(t.globalData.appimg)
var useropenid = ""
var problem = "",
  faulttime = "",
  thumbs = "",
  phonenum = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedSrc: "icox icox-xing selected",
    key: -1,
    content: "",
    images: [],
    imgs: [],
    globalimg: t.globalData.appimg,
    showIcon: true,
    index: 0,
    date: '',
    dateDis: 'block',
    inputtext: '',
    statearray: ['商品降价', '商品与页面描述不符', '缺少件', '质量问题', '发错货'],
    index: 0,
    defaults: '请选择申请原因',
    refundtype: false
  },

  onLoad: function(a) {
    var userinfo = t.getCache('userinfo');
    console.log(userinfo)
    useropenid = userinfo.openid
    this.setData({
      options: a
    }), t.url(a);
  },
  upload: function(t) {
    var e = this,
      s = a.data(t),
      i = s.type,
      o = e.data.images,
      n = e.data.imgs,
      r = s.index;
    "image" == i ? a.upload(function(t) {
      o.push(t.filename), n.push(t.url), e.setData({
        images: o,
        imgs: n
      });
    }) : "image-remove" == i ? (o.splice(r, 1), n.splice(r, 1), e.setData({
      images: o,
      imgs: n
    })) : "image-preview" == i && wx.previewImage({
      current: n[r],
      urls: n
    });
    console.log(n)
    thumbs = n
    console.log(thumbs)
  },
  // 文本域
  inputchange: function(event) {
    var that = this
    console.log(event)
    that.setData({
      inputtext: event.detail.value
    })
    problem = event.detail.value
    // console.log(event.detail.value)
  },
  bindPickerChange: function(e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let index = e.detail.value
    let statearray = this.data.statearray
    this.setData({
      index: e.detail.value,
      defaults: statearray[index]
    })

  },
  typedbtn: function() {
    this.setData({
      refundtype:true
    })
  },
  closebtn: function() {
    this.setData({
      refundtype: false
    })
  },
  submitbtn: function() {
    console.log(this.data.inputtext, this.data.date)
    console.log(problem, faulttime, thumbs, phonenum)
    if (this.data.inputtext != "" && this.data.date != "") {
      a.get("myown/novice/question", {
        openid: useropenid,
        content: problem,
        mobile: phonenum,
        time: faulttime,
        img: thumbs
      }, function(e) {
        console.log(e)
      });
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // this.videoContext = wx.createVideoContext('myvideo', this);
    // this.videoContext.requestFullScreen({ direction: 90 });
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})