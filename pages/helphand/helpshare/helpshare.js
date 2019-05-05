// pages/helphand/helpshare/helpshare.js
var a, e, i = getApp(),
  s = i.requirejs("core"),
  n = i.requirejs("wxParse/wxParse"),
  o = i.requirejs("biz/diypage"),
  r = i.requirejs("biz/diyform"),
  d = i.requirejs("biz/goodspicker"),
  c = (i.requirejs("foxui"),
    i.requirejs("jquery"));
var w = i.requirejs("wxParse/wxParse")

var f = getApp();
var userinfo = f.getCache('userinfo');
var cs="";
var hlpid=""
var bnickname=""
var shareopenid = "";
var sharemid = "";
var message='';
var reurl = '';
var message = ''
var error = ''
var openid = ''
var steptoday = ''
Page({

  data: {
    globalimg: i.globalData.appimg,
    dis: 'none',
    disp: 'none',
    explainDis:'none',
    failDis:'none',
    mid: '',
    step: '',
    messgae: '',
    nickname: '',
    avatarl: '',
    passive_openid: '',
    myid: '',
      count:'',
      steptoday:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (t) {
    var a = decodeURIComponent(t.scene);
    console.log(a)
    if (!t.mid && a) {
      var i = s.str2Obj(a);
      console.log(i)
      cs = hlpid = i.mid;
    } else {
      //   被助力人的openid
      hlpid = t.hlpid
      cs = t.mid;
    }
    console.log(hlpid)
    userinfo = f.getCache('userinfo');
    console.log(userinfo);
    reurl = '/pages/helphand/helpshare/helpshare?hlpid=' + hlpid + '&mid=' + hlpid;
    f.setCache("reurl", reurl, 72000)

      if (userinfo.openid ==t.hlpid && userinfo.openid) {
          wx.redirectTo({
              url: '../friendhelp/friendhelp',
          })
      } 
    console.log(t)
    // 被助力人的昵称
    bnickname=t.nickname
    // 被助力人的mid
    
    //   被助力人的openid
      

      var ttt = this;
      s.get("member/info/getMemberInfo", {
          passive_openid: hlpid
    }, function (m){
        shareopenid = m.openid;
        sharemid = m.id;
        bnickname = m.nickname;
      ttt.setData({
          id:m.id,
          nickname: m.nickname,
          avatar: m.avatar
      })
    })
    if (userinfo.openid && userinfo.openid == shareopenid) {
      wx.redirectTo({
        url: '../friendhelp/friendhelp',
      })
    }
      s.get("refresh_step", {
        openid:userinfo.openid
      }, function (eve) {
          console.log(eve)
          steptoday =  eve.result.step_today
          ttt.setData({
              count:eve.result.step_count,
              steptoday: eve.result.step_today
          })
      })
    
  },
  showbtn: function () {
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.werun" 这个 scope
    var tt = this
    wx.getSetting({
      success(res) {
        console.log(res)
        console.log("getSetting: success");
        tt.setData({
          dis: "block"
        })
        if (!res.authSetting['scope.werun']) {
          console.log("1-没有授权获取运动步数权限");

          // 接口调用询问  
          wx.authorize({
            scope: 'scope.werun',
            success() {
              // 用户已经同意小程序获取运动步数，后续调用 wx.getWeRunData 接口不会弹窗询问
              wx.getWeRunData({
                success(res) {
                  s.post('wxapp/urundata', { res }, function (e) {

                  })
                }
              })
            },
            fail() {
              // 用户拒绝了授权  
              console.log("2-授权获取运动步数权限失败");
              // 打开设置页面  
              wx.openSetting({
                success: function (data) {
                  console.log("openSetting: success");
                },
                fail: function (data) {
                  console.log("openSetting: fail");
                }
              });
            }
          })
        } else {
          console.log("1-已经授权获取运动步数权限");
        }
      },
      fail(res) {
        console.log("getSetting: fail");
        console.log(res);
      }

    })
  },
  applybtn: function () {
    this.setData({
      disp: "none",
      dis: "block"
    })
  },
  cancelbtn: function () {
    this.setData({
      disp: "none",
    })
  },
  // 步数说明
  stepExplain: function () {
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
    stepClose:function(){
        this.setData({
            explainDis: "none"
        })
    },
    failClose:function(){
        this.setData({
            failDis: "none"
        })
    },
  jump: function () {
    this.setData({
      url: '../pages/index/index'
    })
  },
  
  // 获取用户输入的用户名
  stepInput: function (e) {
    this.setData({
      step: e.detail.value
    })
  },
  msgInput: function (e) {
    this.setData({
      messgae: e.detail.value
    })
  },
  tap: function () {
    if (this.data.step == '') {
      wx.showToast({
        title: '步数不能为空',
        icon: 'success',
        duration: 2000
      })

    } 
    var aaa = this
    s.get("help/index/addhelp", {
      remark: this.data.message,
      step: this.data.step,
      openid: userinfo.openid,
      mids: cs
    }, function (ee) {
      console.log(ee)
      error = ee.error
      message = ee.message
      // console.log(error)
      if (error != 0) {
        wx.showModal({
          title: '提示',
          content: message,
          success(res) {
            if (res.confirm) {
            } else if (res.cancel) {
            }
          }
        })
      }
      // if (aaa.data.step > steptoday) {
      //   wx.showModal({
      //     title: '提示',
      //     content: '步数不足哦',
      //     success(res) {
      //       if (res.confirm) {
      //       } else if (res.cancel) {
      //       }
      //     }
      //   })
      // }
      if (1<aaa.data.step<2000 && error< 1) {
        wx.navigateTo({
          // url: '../powerlist/powerlist?openid=' + hlpid + '&mid=' + cs + '&nickname=' + bnickname,
          url: '../powerlist/powerlist?openid=' + shareopenid + '&mid=' + sharemid + '&nickname=' + bnickname,
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getInfo: function () {
    var e = this;
    s.get("member", {}, function (a) {
      console.log(a), 1 == a.isblack && wx.showModal({
        title: "无法访问",
        content: "您在商城的黑名单中，无权访问！",
        success: function (a) {
          a.confirm && e.close(), a.cancel && e.close();
        }
      }), 0 != a.error ? wx.redirectTo({
        url: "/pages/message/auth/index?refrom=helpshare&hlpid=" + hlpid + "&mid=" + hlpid + "&reurl=" + reurl
     }) : e.setData({
        member: a,
        show: !0,
        customer: a.customer,
        customercolor: a.customercolor,
        phone: a.phone,
        phonecolor: a.phonecolor,
        phonenumber: a.phonenumber,
        iscycelbuy: a.iscycelbuy,
        bargain: a.bargain
      }), w.wxParse("wxParseData", "html", a.copyright, e, "5");
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getInfo();
    var e = this;
    wx.getSetting({
      success: function (a) {
        console.log(a)
        var t = a.authSetting["scope.userInfo"];
        console.log(t)
        e.setData({
          limits: t
        }), t || wx.redirectTo({
          url: "/pages/message/auth/index?refrom=helpshare&hlpid=" + hlpid + "&mid=" + hlpid+"&reurl=" + reurl
        });
      }
    });
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