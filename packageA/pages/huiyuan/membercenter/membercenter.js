var a, e, i = getApp(),
  s = i.requirejs("core"),
  n = i.requirejs("wxParse/wxParse"),
  r = i.requirejs("biz/diyform"),
  d = i.requirejs("biz/goodspicker"),
  c = (i.requirejs("foxui"),
    i.requirejs("jquery"));
var levelid = ''
//   当前登录人的openid
var f = getApp();
var userinfo = f.getCache('userinfo');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: i.globalData.appimg,
    showIcon: true,
    color: 'green',
    nickName: '',
    avatarUrl: '',
    loaded: !1,
    loading: !0,
    speeddone: 'none',
    speeding: 'block',
    dateDis: 'block',
    avatar: '',
    levelid: '',
    endtime: '',
    levelname: '',
    leveltime: '',
    addspead: "",
    surplus_day: "",
    give_day: "",
    accelerate_day: "",
    levelinfo: '',
    member_css: "none", //赠送加速
    precious_css: "none", //加速宝生效
    imgHoverIndex: '',

    backgroundimg: '',
    bannerimg: ''
  },
  shengji: function() {
    wx.navigateTo({
      url: '/packageA/pages/huiyuan/hygrade/hygrade?hyid=' + levelid,
    })
  },

  //xph:跳转加速宝也面
  speed_up: function() {
    wx.navigateTo({
      url: '/packageA/pages/huiyuan/expedite/expedite'
    })
  },
  zlBtn: function() {
    wx.showToast({
      title: '暂未开放',
      duration: 2000
    })
  },
  sportBtn: function(e) {
    console.log(e)
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  shopBtn: function() {
    wx.switchTab({
      url: '/pages/index/huodong',
    })
  },
  carBtn: function() {
    wx.switchTab({
      url: '/pages/rebate/discount/discount',
    })
  },
  userBtn: function() {
    wx.switchTab({
      url: '/pages/member/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var i = this
    s.get("member/index/discount", {
      openid: userinfo.openid
    }, function(e) {
      console.log(e)
      levelid = e.levelid
      i.setData({
        nickname: e.nickname,
        avatar: e.avatar,
        levelid: e.levelid,
        endtime: e.endtime,
        levelname: e.levelname,
        leveltime: e.leveltime,
        levelinfo: e.levelinfo
      })
    })
    // let myUserInfo = wx.getStorageSync('myUserInfo');
    // this.setData({
    //   nickName: myUserInfo.nickName,
    //   avatarUrl: myUserInfo.avatarUrl
    // })

    s.get("myown.index.opt", {
      id: 2
    }, function(e) {
      console.log(e);
      i.setData({
        backgroundimg: e.result.backgroup,
        bannerimg: e.result.banner
      })
    })
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
    var ttt = this
    s.get("myown/index/accelerate", {
      openid: userinfo.openid
    }, function(eve) {
      console.log(eve)
      if (eve.message.surplus_day == 0) {
        ttt.setData({
          speeding: 'none',
          speeddone: 'block'
        })
      } else {
        ttt.setData({
          speeding: 'block',
          speeddone: 'none'
        })
      }
      if (eve.message.type == 0) {
        ttt.setData({
          member_css: "block",
          precious_css: "none"
        })
      } else if (eve.message.type == 1) {
        ttt.setData({
          member_css: "none",
          precious_css: "block"
        })
      }
      ttt.setData({
        credit: eve.message.credit1,
        surplus_day: eve.message.surplus_day,
        give_day: eve.message.give_day,
        accelerate_day: eve.message.accelerate_day,
        addspead: (eve.message.accelerate_day) / (eve.message.accelerate_day + eve.message.surplus_day) * 100
      })
    })
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
    wx.showToast({
      icon: 'loading',
      title: '加载中'
    })
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    // return s.onShareAppMessage();
    var that = this;
    return {
      title: '原来微信步数可以当钱用，快来和我一起薅羊毛',
      path: '/pages/index/index?id=' + that.data.scratchId,
      success: function(res) {
        // 转发成功

        that.shareClick();
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }
})