// pages/helphand/helpshare/helpshare.js
var a, e, i = getApp(),
  s = i.requirejs("core");
var f = getApp();
var userinfo = f.getCache('userinfo');
var cs = "";
var hlpid = ""
var bnickname = ""
var shareopenid = "";
var sharemid = "";
var message = '';
var reurl = '';
var message = ''
var error = ''
var openid = ''
var steptoday = ''
var mids = ""
Page({

  data: {
    globalimg: i.globalData.appimg,
    dis: 'none',
    explainDis: 'none',
    failDis: 'none',
    getinfoDis: 'none',
    lijiDis: 'none',
    mid: '',
    step: '',
    messgae: '',
    nickname: '',
    avatarl: '',
    passive_openid: '',
    myid: '',
    count: '',
    steptoday: '',
    showIcon: true,
    gloheight: i.globalData.gloheight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(t) {
    console.log('yingyingying')
    console.log(t)
    if (t.scene == undefined) {
      console.log('链接进入')
      //   被助力人的openid
      hlpid = t.hlpid
      cs = t.mid;
      // bnickname = t.nickname
      console.log(hlpid,cs, '链接')
    } else {
      console.log('小程序码进入')
      var b = decodeURIComponent(t.scene);
      var i = s.str2Obj(b);
      if (i.mid == undefined) {
        mids = t.mid
        console.log('mids', '安卓', mids)
      } else {
        mids = i.mid
        console.log('mids', 'iphone', mids)
      }
      console.log(mids)
      cs = mids
      hlpid = mids
      console.log(hlpid, cs,'小程序码')
    }
    userinfo = f.getCache('userinfo');
    console.log(userinfo);
    if (userinfo.openid == t.hlpid && userinfo.openid) {
      wx.redirectTo({
        url: '/packageA/pages/helphand/friendhelp/friendhelp',
      })
    }
    var ttt = this;
    s.get("member/info/getMemberInfo", {
      passive_openid: hlpid
    }, function(m) {
      console.log(m)
      shareopenid = m.openid;
      sharemid = m.id;
      bnickname = m.nickname;
      ttt.setData({
        id: m.id,
        nickname: m.nickname,
        avatar: m.avatar
      })
    })
    if (userinfo.openid && userinfo.openid == shareopenid) {
      wx.redirectTo({
        url: '/packageA/pages/helphand/friendhelp/friendhelp',
      })
    }

  },
  getUserInfo: function(e) {
    let that = this;
    wx.getSetting({
      success(res) {
        console.log(res)
        var userinfo = f.getCache('userinfo');
        console.log(userinfo)
        if (userinfo.nickname == '' || userinfo.avatarUrl == '') {
          wx.login({
            success: function(a) {
              a.code ? s.post("wxapp.login", {
                code: a.code
              }, function(a) {
                console.log(a)
                wx.getUserInfo({
                  success: function(info) {
                    console.log(info);
                    console.log(a.session_key);
                    s.get("wxapp/auth", {
                      data: info.encryptedData,
                      iv: info.iv,
                      sessionKey: a.session_key
                    }, function(eve) {
                      console.log(eve)
                    })
                  }
                });
              }) : s.alert("获取用户登录态失败:" + a.errMsg);

            }
          })

        }
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权个人昵称头像=====")
          that.setData({
            getinfoDis: 'none',
            lijiDis: 'block',
          })
        } else {
          console.log("未授权个人昵称头像=====")
          that.showSettingToast("请授权")
        }
      }
    })
  },
  // 打开权限设置页提示框
  showSettingToast: function(e) {
    wx.showModal({
      title: '提示',
      cancelText: "取消",
      cancelColor: "#000",
      confirmText: "去设置",
      confirmColor: "#01d7a1",
      content: e,
      success: function(res) {
        if (res.confirm) {
          wx.openSetting({
            success: (res) => {
              if (res.authSetting["scope.userInfo"]) { ////如果用户重新同意了授权登录
                wx.getUserInfo({
                  success: function(res) {
                    var userInfo = res.userInfo;
                  }
                })
              }
            },
            fail: function(res) {

            }
          })
        } else {
          // 取消
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var t = this
    wx.getSetting({
      success: (res) => {
        console.log(res)
        if (!res.authSetting['scope.userInfo']) {
          console.log('未获取个人信息')
          t.setData({
            getinfoDis: 'block',
            lijiDis: 'none',
          })
        } else if (res.authSetting['scope.userInfo']) {
          console.log('已经获取个人信息')
          t.setData({
            getinfoDis: 'none',
            lijiDis: 'block',
          })

        }
      }
    });
  },
  showbtn: function() {
    var aaa = this
    s.get("help/index/addhelp", {
      step: '2000',
      openid: userinfo.openid,
      mids: cs
    }, function(ee) {
      console.log(ee)
      message = ee.message
      if (ee.error == 0) {
        wx.navigateTo({
          url: '/packageA/pages/helphand/powerlist/powerlist?openid=' + shareopenid + '&mid=' + sharemid + '&nickname=' + bnickname,
        })
      } else {
        wx.showModal({
          title: '提示',
          content: ee.message,
        })
      }
    })
  },
  // 步数说明
  stepExplain: function() {
    wx.showModal({
      title: '提示',
      content: '1500步=1至5卡路里不等（根据会员等级兑换比例不同）1卡路里=1元；每人最高可捐赠2000步',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 关闭步数说明按钮
  stepClose: function() {
    this.setData({
      explainDis: "none"
    })
  },
  failClose: function() {
    this.setData({
      failDis: "none"
    })
  },
  jump: function() {
    this.setData({
      url: '/pages/index/index'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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