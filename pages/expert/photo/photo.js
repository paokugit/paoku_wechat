var t = getApp(),
  a = t.requirejs("core");
var f = getApp();

Page({
  data: {
    globalimg: t.globalData.appimg,
    nvabarData: {
      showCapsule: 1,
      title: '相册',
      height: t.globalData.height * 2 + 20,
    },
    showBall: false,
    img_url:[]
  },

  onLoad: function (options) {

  },

  imgBall: function (options) {
    this.setData({
      showBall: true
    })
  },

  showBall: function (e) {
    this.setData({
      showBall: false
    })
  },

  chooseimage: function (options) {
    let m = this;
    let select = options.currentTarget.dataset.select;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: [select],
      success: function (res) {
        let img_list = m.data.img_url;
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          img_list.push(res.tempFilePaths[i])
        };
        wx.navigateTo({
          url: '/pages/expert/issue/issue?imgList=' + img_list,
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    }),
    m.setData({
      showBall: false
    })
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