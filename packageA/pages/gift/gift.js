// pages/contribute/record/record.js
var a, e, i = getApp(),
  s = i.requirejs("core");
var t = getApp(),
  a = t.requirejs("wxParse/wxParse");
//   当前登录人的openid
var f = getApp();
// var userinfo = f.getCache('userinfo');
var useropenid = ''
var errormessgae = ""
var formid = ""
var invitedid = ''
var agentid = ""
// 被助力人的openid
var bopenid = ""
var giftImg = ""
var giftTitle = ""
var newopenid = ""
var reurl = ""
var mids = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: i.globalData.appimg,
    page: 1,
    list: [],
    type: 1,
    helpDis: 'none',
    explainDis: "none",
    activityDis: 'none',
    maskDis: 'none',
    goal: '',
    help_count: '',
    remain: '',
    gradelevel: '',
    gradegift: '',
    helplist: [],
    starttime: '',
    endtime: '',
    primarylist: [],
    middlelist: [],
    highlist: [],
    noticelist: [],
    autoplay: true,
    interval: 3000,
    duration: 500,
    circular: true,
    friendavatar: '',
    agent_level: '',
    is_get: '',
    getall: '',
    gets: '',
    weekstart: '',
    weekend: '',
    isDialogShow: false,
    isScroll: true,
    
    showIcon: true,
    gloheight: i.globalData.gloheight
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
  createHbao() {
    wx.navigateTo({
      url: '/packageA/pages/gift/gifthaibao',
    })
  },
  getbtn: function() {
    this.setData({
      explainDis: 'block'
    })
  },
  explainbtn: function() {
    this.setData({
      explainDis: 'none'
    })
  },
  participantbtn: function() {
    var aa = this
    var userinfo = f.getCache('userinfo');
    bopenid = userinfo.openid
    newopenid = ""
    mids = 0
    aa.setData({
      helpDis: 'none'
    })
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权=====")
          aa.getList()
        } else {
          console.log("未授权====")
          reurl = '/packageA/pages/gift/gift?mid=' + mids
          wx.redirectTo({
            url: "/pages/message/auth/index?refrom=gift&mid=" + mids + "&reurl=" + reurl
          })
        }

      }
    });

  },
  form_submit: function(e) {
    console.log(e.detail.formId);
    formid = e.detail.formId
    s.get("message/collect", {
      openid: useropenid,
      formid: formid
    }, function(event) {
      console.log(event)
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(a) {
    console.log('海报', a)
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid
    var b = decodeURIComponent(a.scene);
    var i = s.str2Obj(b);
    a.id = i.id;
    if (i.mid == undefined) {
      mids = a.mid
      console.log('mids', '安卓', mids)
    } else {
      mids = i.mid
      console.log('mids', 'iphone', mids)
    }
    console.log(mids)
    if (mids != undefined && mids != 0) {
      console.log('小程序码进入')
      bopenid = ""
      newopenid = useropenid
      mids=mids
      console.log(bopenid, newopenid)
      if (bopenid == newopenid) {
        wx.showModal({
          title: '提示',
          content: '自己不能给自己助力哦',
        })
      } else {
        this.setData({
          helpDis: 'block',
        })
      }

    } else {
      console.log('非小程序码进入')
      var tt = this
      if (a.invitedid != undefined && a.invitedid != "") {
        console.log('通过分享链接进入')
        bopenid = a.invitedid
        newopenid = userinfo.openid
        mids = 0
        if (bopenid == userinfo.openid) {
          wx.showModal({
            title: '提示',
            content: '自己不能给自己助力哦',
          })
        } else {
          tt.setData({
            helpDis: 'block',
          })
        }

      } else {
        console.log('非小程序码，非链接', mids)
        bopenid = useropenid
        newopenid = ""
        mids = 0
        tt.setData({
          helpDis: 'none'
        })
        wx.getSetting({
          success: function (res) {
            if (res.authSetting['scope.userInfo']) {
              console.log("已授权=====")
              tt.getList()
            } else {
              console.log("未授权====")
              reurl = '/packageA/pages/gift/gift?mid=' + mids
              wx.redirectTo({
                url: "/pages/message/auth/index?refrom=gift&mid=" + mids + "&reurl=" + reurl
              })
            }

          }
        });
      }
    }

    s.get("game/share", {}, function(eve) {
      console.log(eve)
      giftImg = eve.result.share.thumb
      giftTitle = eve.result.share.title
    })
  },
  getgiftbtn: function(event) {
    console.log(event)
    console.log(event.currentTarget.dataset.id)
    s.get("game/index/getgift", {
      openid: useropenid,
      goodsid: event.currentTarget.dataset.id
    }, function(e) {
      console.log(e)
      if (e.status == 0) {
        errormessgae = e.result.message
        wx.showModal({
          title: '提示',
          content: errormessgae,
        })
      } else if (e.status == 1) {
        wx.navigateTo({
          url: '/pages/goods/detail/index?id=' + event.currentTarget.dataset.id,
        })
      }
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
    var t = this
    t.getList()
    console.log(bopenid, newopenid, mids)
  },
  getList: function() {
    console.log('bopenid', 'newopenid','mids')
    console.log(bopenid, newopenid,mids)
    var t = this
    s.get("game/index/free", {
      help_openid: bopenid,
      new_openid: newopenid,
      helpid:mids
    }, function(e) {
      console.log(e)
      a.wxParse("wxParseData", "html", e.result.desc, t, "5")
      agentid = e.result.agent_level
      if (e.status == 1) {
        t.setData({
          friendavatar: e.result.avatar,
          agent_level: e.result.agent_level,
          is_get: e.result.is_get,
          goal: e.result.all,
          help_count: e.result.help_count,
          remain: e.result.remain,
          gradelevel: e.result.agentlevel,
          gradegift: e.result.gift,
          helplist: e.result.new_member,
          starttime: e.result.start,
          endtime: e.result.end,
          getall: e.result.get_all,
          gets: e.result.gets,
          weekstart: e.result.week_start,
          weekend: e.result.week_end,
          primarylist: e.result.goods[0].thumbs,
          middlelist: e.result.goods[1].thumbs,
          highlist: e.result.goods[2].thumbs
        });
      } else {
        errormessgae = e.result.message
        wx.showModal({
          title: '提示',
          content: errormessgae,
        })
      }
      if (agentid == 5) {
        t.setData({
          type: 3
        })
      } else if (agentid == 2) {
        t.setData({
          type: 2
        })
      } else if (agentid == 1 || agentid == 0) {
        t.setData({
          type: 1
        })
      }

    });
    s.get("game/notice", {}, function(e) {
      console.log(e)
      if (e.status == 1) {
        t.setData({
          noticelist: e.result.list
        })
      }
    });
  },
  receivebtn: function() {
    wx.navigateTo({
      url: '/packageA/pages/gift/getrecord',
    })
  },
  helpbtn: function() {
    wx.navigateTo({
      url: '/packageA/pages/gift/helprecord',
    })
  },
  rulebtn: function() {
    this.setData({
      activityDis: 'block'
    })
  },
  closebtn: function() {
    this.setData({
      activityDis: 'none'
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    var that = this;
    return {
      title: giftTitle,
      path: '/packageA/pages/gift/gift?invitedid=' + useropenid,
      imageUrl: giftImg,
      success: function(res) {
        // 转发成功

        that.shareClick();
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  myTab: function(t) {
    console.log(t)
    console.log(s.pdata(t))
    var e = this,
      i = s.pdata(t).type;
    e.setData({
      type: i,
      page: 1,
      list: [],
      loading: !0
    });
  }
})