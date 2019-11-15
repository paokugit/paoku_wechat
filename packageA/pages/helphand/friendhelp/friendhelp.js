var a, e, i = getApp(),
  s = i.requirejs("core");
var t = getApp(),
  a = t.requirejs("core");
var n = getApp();
var userinfo = ''
var steptoday = ''
var creditsum = ''
var creditprice = ''
var addstep = ''
var formid = ''
Page({
  data: {
    globalimg: i.globalData.appimg,
    showIcon: true,
    gloheight: i.globalData.gloheight,
    notadaDis: 'none',
    listDis: 'block',
    maskDis: 'none',
    goalDis: 'block',
    finishDis: 'none',
    invitebtnDis: 'none',
    notloginDis: 'block',
    isopen: !1,
    page: 1,
    loaded: !1,
    loading: !0,
    bannerUrl: '',
    steptoday: '',
    creditsum: '',
    creditprice: '',
    addstep: '',
    helpList: [],
  },
  maskshow: function() {
    this.setData({
      maskDis: 'block'
    })
  },
  hidemask: function() {
    this.setData({
      maskDis: 'none'
    })
  },
  refresh: function(e) {
    console.log(e)
  },
  myList: function() {
    wx.navigateTo({
      url: '/packageA/pages/helphand/mypowerlist/mypowerlist?openid=' + userinfo.openid + '&mid=' + userinfo.id,
    })
  },
  form_submit: function(e) {
    console.log(e.detail.formId);
    formid = e.detail.formId
    s.get("message/collect", {
      openid: userinfo.openid,
      formid: formid
    }, function(event) {
      console.log(event)
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    userinfo = n.getCache('userinfo');
    console.log(userinfo)
    a.type > 0 && this.setData({
      type: 1
    }), t.url(a), this.getList();
  },
  getList: function() {
    var t = this;
    t.setData({
        loading: !0
      }),
      a.get("help/index/helplist", {
        mids: userinfo.id,
        openid: userinfo.openid
      }, function(a) {
        console.log(a)
        if (a.message == '暂无助力信息') {
          t.setData({
            notadaDis: 'block',
            listDis: 'none'
          })
        } else {
          var e = {
            loading: !1,
            show: !0,
            helpList: a.helpList.slice(0, 5)
          };
          t.setData(e)
        }
      }),
      // 刷新步数
      a.get("refresh_step", {
        openid: userinfo.openid
      }, function(f) {
        console.log(f)
        if (f.result.step == 0) {
          t.setData({
            goalDis: 'none',
            finishDis: 'block'
          })
        } else {
          t.setData({
            loading: !1,
            show: !0,
            result: f.result
          })
        }

      })
    // 今日目标已完成加xx步
    a.get("help/index/helpstep_today", {
      openid: userinfo.openid
    }, function(a) {
      console.log(a)
      addstep = a.result.step
      t.setData({
        addstep: addstep
      })
    })
    // 累计邀请人数
    a.get("help/index/help_count", {
      openid: userinfo.openid
    }, function(eve) {
      console.log(eve)
      steptoday = eve.message.step_today
      creditsum = eve.message.credit_sumdiscount
      creditprice = eve.message.credit_pricediscount
      t.setData({
        steptoday: steptoday,
        creditsum: creditsum,
        creditprice: creditprice
      })
    })

  },

  createHbao() {
    wx.navigateTo({
      url: '/packageA/pages/helphand/haibao/haibao',
    })
  },
  onShareAppMessage: function(res) {
    return this.setData({
      maskDis: 'none',
    }), s.onShareAppMessage();
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
    var t = this
    wx.getSetting({
      success: (res) => {
        console.log(res)
        if (!res.authSetting['scope.userInfo']) {
          console.log('未获取个人信息')
          t.setData({
            invitebtnDis: 'none',
            notloginDis: 'block',
          })
        } else if (res.authSetting['scope.userInfo']) {
          console.log('已经获取个人信息')
          t.setData({
            invitebtnDis: 'block',
            notloginDis: 'none',
          })

        }
      }
    });
    a.get("index/share_help", {}, function (e) {
      console.log(e)
      n.setCache("shareparam", e.result)
      t.setData({
        bannerUrl: e.result.thumb
      })
    })
  },
  getUserInfo: function (e) {
    let that = this;
    wx.getSetting({
      success(res) {
        console.log(res)
        var userinfo = n.getCache('userinfo');
        console.log(userinfo)
        if (userinfo.nickname == '' || userinfo.avatarUrl == '') {
          wx.login({
            success: function (a) {
              a.code ? s.post("wxapp.login", {
                code: a.code
              }, function (a) {
                console.log(a)
                wx.getUserInfo({
                  success: function (info) {
                    console.log(info);
                    console.log(a.session_key);
                    s.get("wxapp/auth", {
                      data: info.encryptedData,
                      iv: info.iv,
                      sessionKey: a.session_key
                    }, function (eve) {
                      console.log(eve)
                      
                    }
                    )
                  }
                });
              }) : s.alert("获取用户登录态失败:" + a.errMsg);

            }
          })

        }
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权=====")
          that.setData({
            invitebtnDis: 'block',
            notloginDis: 'none',
          })
          
        } else {
          console.log("未授权=====")
          that.showSettingToast("获取您的昵称和头像才能邀请好友助力哦")
        }
      }
    })
  },
  // 打开权限设置页提示框
  showSettingToast: function (e) {
    wx.showModal({
      title: '提示',
      cancelText: "取消",
      cancelColor: "#000",
      confirmText: "去设置",
      confirmColor: "#01d7a1",
      content: e,
      success: function (res) {
        if (res.confirm) {
          wx.openSetting({
            success: (res) => {
              if (res.authSetting["scope.userInfo"]) { ////如果用户重新同意了授权登录
                wx.getUserInfo({
                  success: function (res) {
                    var userInfo = res.userInfo;
                  }
                })
              }
            },
            fail: function (res) {

            }
          })
        } else {
          // 取消
        }
      }
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },


})