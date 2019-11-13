// pages/order/detail/progress.js
var a, e, i = getApp(),
  s = i.requirejs("core");
var f = getApp();
var useropenid = ''
var t = getApp(), j = t.requirejs("core"), p = t.requirejs("wxParse/wxParse");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIcon: true,
    gloheight: i.globalData.gloheight,
    globalimg: i.globalData.appimg,
    listCritic:[],
    criticPage:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      show: !0,
    })
    this.critic()
  },
  // 评论
  critic: function () {
    var m = this;
    s.get("drcircle.my.mycomment", {
      openid: useropenid,
      page: m.data.criticPage
    }, function (e) {
      console.log(e);
      let totalList = e.message.list;
      let totalPage = Math.ceil(e.message.total / 8);
      m.setData({
        mask: 3,
        listCritic: m.data.listCritic.concat(totalList),
        totalPage: totalPage
      })
    })
  },
  // 回复按钮
  replyBtn: function (e) {
    var itemid = e.currentTarget.dataset.itemid;
    this.setData({
      itemid: itemid,
      focus: true,
      perch: '回复：' + e.currentTarget.dataset.name
    })
  },
  // 回复内容
  formName: function (e) {

    this.setData({
      discuss: e.detail.value
    })
  },
  //输入聚焦
  foucus: function (e) {
    var that = this;
    that.setData({
      inputBottom: e.detail.height
    })
  },

  //失去聚焦
  blur: function (e) {
    var that = this;
    that.setData({
      inputBottom: 0
    })
  },
  // 留言
  sendBtn: function () {
    var m = this;

    var message = m.data.listCritic;
    let sutid = m.data.itemid;
    console.log(message);
    console.log(m.data.itemid);

    wx.showLoading({
      title: '评论中...',
      mask: true
    })
    s.get("drcircle.my.comment", {
      openid: useropenid,
      content: m.data.discuss,
      type: 2,
      parent_id: m.data.itemid
    }, function (e) {
      console.log(e);
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
      if (e.error == 0) {
        wx.showToast({
          title: '回复成功',
          icon: 'none',
          duration: 2000
        })

        for (var i = 0; i < message.length; i++) {
          if (message[i].id == sutid) {
            message[i].reply = parseInt(message[i].reply) + 1
          }
        }

        m.setData({
          discuss: '',
          focus: false,
          listCritic: message
        })

      } else {
        wx.showToast({
          title: e.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  // 跳转详情
  dynamicBtn: function (e) {
    var isdel = e.currentTarget.dataset.isdel;
    var circleid = e.currentTarget.dataset.circleid;
    if (isdel == 0) {
      wx.navigateTo({
        url: '/pages/expert/discuss/discuss?listId=' + circleid,
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '此动态已被删除...',
        duration: 2000
      })
    }
  },
  // 上拉加载
  lower: function (e) {
    let page = this.data.criticPage;
    let totalpage = this.data.totalPage;
    if (page < totalpage) {
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
      this.setData({
        criticPage: page + 1
      })
      this.critic();
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
    } else {
      this.setData({
        abcShow: true
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})