var e = getApp(),
  a = e.requirejs("core"),
  p = e.requirejs("core"),
  t = e.requirejs("wxParse/wxParse"),
  i = e.requirejs("biz/diypage"),
  s = e.requirejs("jquery");
var f = getApp();
var userinfo = f.getCache('userinfo');
var util = require('../../../utils/util.js');
var formid = ''
var navigaterurl = ''
 
var bindcount = ''
// var conbind=''

var is_rvc = '';

var interval = '';
var timestampcount = '';
Page({
  data: {
    globalimg: e.globalData.appimg,
    showIcon: false,
    gloheight: e.globalData.gloheight,
    imgUrls: [],
    imgUrls: [],
    indicatorDots: false,
    autoplay: true,
    circular: true,
    userinfodis: 'none',
    notlogindis: 'block',
    interval: 3000,
    duration: 1000,
    route: "member",
    icons: e.requirejs("icons"),
    member: {},
    diypages: {},
    audios: {},
    audiosObj: {},
    modelShow: !1,
    autoplay: !0,
    interval: 5e3,
    duration: 500,
    swiperheight: 0,
    iscycelbuy: !1,
    bargain: !1,
    conbind: '',
    credit4: '',
    cometotal: 0,
    calorietotal: 0,
    fu_order: 0,
    fa_order: 0,
    shou_order: 0,
    tui_order: 0,
    textList: [{
      txt: '领1年产品'
    }, {
      txt: '享四大权益'
    }, {
      txt: '专享特权'
    }],
    autoplayA: true,
    intervalA: 3000,
    durationA: 1000,
    circularA: true,
    is_open: '',
    expire_time: '',

    isShow: false,

    dataspell:[]
  },

  swiperChange(e) {
    let current = e.detail.current;
    // console.log(current, '轮播图')
    let that = this;
    that.setData({
      swiperCurrent: current,
    })
  },
  //轮播图点击事件
  swipclick: function(e) {
    console.log(e)
    navigaterurl = e.currentTarget.dataset.url
    console.log(this.data.swiperCurrent)
    wx.switchTab({
      url: navigaterurl,
    })
  }, 
  form_submit: function(e) {
    console.log(e.detail.formId);
    formid = e.detail.formId
    a.get("message/collect", {
      openid: userinfo.openid,
      formid: formid
    }, function(event) {
      console.log(event)
    })

  },
  opengxz: function() {
    wx.navigateTo({
      url: '/packageA/pages/contribute/contribute/contribute',
    })
  },
  bindphone: function() {
    wx.navigateTo({
      url: '/pages/member/bind/index?param=' + 2,
    })
  },
  bindyet: function() {
    wx.showModal({
      title: '提示',
      content: '您已经绑定过手机号',
    })
  },
  cartbtn: function() {
    wx.getSetting({
      success: (res) => {
        console.log(res)
        if (!res.authSetting['scope.userInfo']) {
          wx.showModal({
            title: '提示',
            content: '您需要先登录,才能查看购物车哦',
          })
        } else if (res.authSetting['scope.userInfo']) {
          console.log('已经获取个人信息')
          wx.navigateTo({
            url: '/pages/member/cart/index',
          })

        }
      }
    })
  },
  onLoad: function(a) {
    this.setData({
      member: {}
    })
    p.get("member", {}, function(i) {
      console.log(i)
      bindcount = i.needbind
      console.log(bindcount)
    })
    e.getCache("userinfo")
    var t = this;
    e.url(a), wx.getSystemInfo({
      success: function(e) {
        var a = e.windowWidth / 1.7;
        t.setData({
          windowWidth: e.windowWidth,
          windowHeight: e.windowHeight,
          swiperheight: a
        });
      }
    });

    p.get("member.level.level_alert", {
      openid: userinfo.openid,
      no_id: 1
    }, function(e) {
      console.log(e);
      if (e.status == '1') {
        t.setData({
          isShow: true
        })
      }
    });

    p.get("myown.index.mycenter", {}, function(e) {
      console.log(e);
      t.setData({
        order: e.result.order,
        server: e.result.server
      })
    })
  },

  rvcBtn:function(){
    console.log(is_rvc);
    if (is_rvc == 1){
      wx.navigateTo({
        url: '/pages/member/rvc/rvc',
      })
    } else if (is_rvc == 0){
      console.log('123');
    }
  },

  paoku_card: function() {
    var t = this;
    p.get("member.level.mem_level", {
      openid: userinfo.openid
    }, function(e) {
      console.log(e);
      if(e.status == 1){
        t.setData({
          is_open: e.result.is_open,
          expire_time: e.result.expire_time + '到期'
        })
      }else if(e.status == 0){
        wx.showToast({
          title: e.result.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  getInfo: function() {
    var e = this;
    a.get("member", {}, function(a) {
      console.log(a),
        e.setData({
          member: a,
          show: !0,
          customer: a.customer,
          phone: a.phone,
          iscycelbuy: a.iscycelbuy,
          bargain: a.bargain,
          imgUrls: a.banner
        }), t.wxParse("wxParseData", "html", a.copyright, e, "5");
    });
  },
  onShow: function() {
    var e = this;
    wx.getSetting({
      success: (res) => {
        console.log(res)
        if (!res.authSetting['scope.userInfo'])
          e.setData({
            userinfodis: 'none',
            notlogindis: 'block',
            cometotal: 0.00,
            calorietotal: 0.00,
            conbind: 0,
            fu_order: 0,
            fa_order: 0,
            shou_order: 0,
            tui_order: 0,
          });
        else if (res.authSetting['scope.userInfo']) {
          console.log('已经获取个人信息')
          e.setData({
            userinfodis: 'block',
            notlogindis: 'none',
          })
          a.get("member", {}, function(a) {
            console.log(a),
              is_rvc = a.is_rvc;
              e.setData({ 
                member: a,
                cometotal: a.come_total,
                calorietotal: a.RVC_total,
                fu_order: a.statics.order_0,
                fa_order: a.statics.order_1,
                shou_order: a.statics.order_2,
                tui_order: a.statics.order_4,
              })
          });
          a.get("myown/devote/msg", {
            openid: userinfo.openid,
          }, function(eve) {
            console.log(eve)
            if (e.error == 0) {
              e.setData({
                conbind: 1,
                credit4: eve.message.credit4
              })
            }
          });

        }
      }
    })
    var b = this
    a.get("myown/devote/msg", {
      openid: userinfo.openid,
    }, function(e) {
      console.log(e)
      if (e.error == 0) {
        if (e.message.mobile != undefined && e.message.mobile != '' && e.message.mobile != 0) {
          var bing = 1;
        } else {
          var bing = 0;
        }
        b.setData({
          conbind: bing,
          credit4: e.message.credit4
        })
      }
    });
    e.getInfo();
    b.paoku_card();

    b.spelltime();
  },

  spelltime:function(){
    var ol = this;
    wx.request({
      url: 'http://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=group.order.my&comefrom=wxapp',
      data: {
        openid:userinfo.openid
      },
      success: function (res) {
        console.log(res);
        if (res.data.error == 0) {
          ol.setData({
            dataspell: res.data.data
          })
        }
      }
    });
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
              a.code ? p.post("wxapp.login", {
                code: a.code
              }, function(a) {
                console.log(a)
                wx.getUserInfo({
                  success: function(info) {
                    console.log(info);
                    console.log(a.session_key);
                    p.get("wxapp/auth", {
                      data: info.encryptedData,
                      iv: info.iv,
                      sessionKey: a.session_key
                    }, function(eve) {
                      console.log(eve)
                      that.getInfo();
                    })
                  }
                });
              }) : s.alert("获取用户登录态失败:" + a.errMsg);

            }
          })

        }
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权=====")
          that.setData({
            userinfodis: 'block',
            notlogindis: 'none',
          })
          a.get("member", {}, function(a) {
            console.log(a),
              that.setData({
                member: a,
                cometotal: a.come_total,
                calorietotal: a.RVC_total,
              })
          });
        } else {
          console.log("未授权=====")
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
  onShareAppMessage: function(res) {
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
  },
  cancelclick: function() {
    wx.switchTab({
      url: "/pages/index/index"
    });
  },
  confirmclick: function() {
    wx.openSetting({
      success: function(e) {}
    });
  },
  phone: function() {
    var e = this.data.phonenumber + "";
    wx.makePhoneCall({
      phoneNumber: e
    });
  },
  play: function(e) {
    var a = e.target.dataset.id,
      t = this.data.audiosObj[a] || !1;
    if (!t) {
      t = wx.createInnerAudioContext("audio_" + a);
      var i = this.data.audiosObj;
      i[a] = t, this.setData({
        audiosObj: i
      });
    }
    var s = this;
    t.onPlay(function() {
      var e = setInterval(function() {
        var i = t.currentTime / t.duration * 100 + "%",
          r = Math.floor(Math.ceil(t.currentTime) / 60),
          n = (Math.ceil(t.currentTime) % 60 / 100).toFixed(2).slice(-2),
          o = Math.ceil(t.currentTime);
        r < 10 && (r = "0" + r);
        var u = r + ":" + n,
          c = s.data.audios;
        c[a].audiowidth = i, c[a].Time = e, c[a].audiotime = u, c[a].seconds = o, s.setData({
          audios: c
        });
      }, 1e3);
    });
    var r = e.currentTarget.dataset.audio,
      n = e.currentTarget.dataset.time,
      o = e.currentTarget.dataset.pausestop,
      u = e.currentTarget.dataset.loopplay;
    0 == u && t.onEnded(function(e) {
      c[a].status = !1, s.setData({
        audios: c
      });
    });
    var c = s.data.audios;
    c[a] || (c[a] = {}), t.paused && 0 == n ? (t.src = r, t.play(), 1 == u && (t.loop = !0),
      c[a].status = !0, s.pauseOther(a)) : t.paused && n > 0 ? (t.play(), 0 == o ? t.seek(n) : t.seek(0),
      c[a].status = !0, s.pauseOther(a)) : (t.pause(), c[a].status = !1), s.setData({
      audios: c
    });
  },
  pauseOther: function(e) {
    var a = this;
    s.each(this.data.audiosObj, function(t, i) {
      if (t != e) {
        i.pause();
        var s = a.data.audios;
        s[t] && (s[t].status = !1, a.setData({
          audios: s
        }));
      }
    });
  },
  onHide: function() {
    this.pauseOther();
    clearInterval(interval);
  },
  onUnload: function() {
    this.pauseOther();
    clearInterval(interval);
    console.log('aa')
  },
  navigate: function(e) {
    var a = e.currentTarget.dataset.url,
      t = e.currentTarget.dataset.phone,
      i = e.currentTarget.dataset.appid,
      s = e.currentTarget.dataset.appurl;
    a && wx.navigateTo({
      url: a,
      fail: function() {
        wx.switchTab({
          url: a
        });
      }
    }), t && wx.makePhoneCall({
      phoneNumber: t
    }), i && wx.navigateToMiniProgram({
      appId: i,
      path: s
    });
  },
  close: function() {
    e.globalDataClose.flag = !0, wx.reLaunch({
      url: "/pages/index/index"
    });
  },

  start: function() {
    var m = this;
    var animation = wx.createAnimation({
      duration: 150,
      timingFunction: 'linear',
      delay: 0
    });
    animation.translate(-100, 150).width('0rpx').height('0rpx').step();
    m.setData({
      ani: animation.export(),
    });
    setTimeout(function() {
      m.setData({
        isShow: false
      })
    }, 500)
  }


});