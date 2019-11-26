function t(t, a, e) {
  return a in t ? Object.defineProperty(t, a, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[a] = e, t;
}
var a, e, i = getApp(),
  s = i.requirejs("core");
//   当前登录人的openid
var f = getApp();
var userinfo = f.getCache('userinfo');
var formid = ''
var scene = ''
var login = ''
var openid = ''
var version = 1
var currency_step = ''
var merchphone = ""
var secend_time = ""
var timestampcount = ""
var longitude = ""
var latitude = ""
const app = getApp()
var interval = new Object();
var util = require('../../utils/util.js');

var swiperError = 0;
// 新加
var pricemark = 0;
var salesmark = 0;
var sortorder = "";
var sortby = ""
var cate = 171
Page((e = {
  onPullDownRefresh: function() {
    wx.showToast({
      icon: 'loading',
      title: '加载中'
    })
    var t = this;
    s.get("userinfo", {}, function(e) {
      console.log(e)
      if (e.status == 1) {
        t.setData({
          credit3: e.result.credit3,
          todaystep: e.result.todaystep,
          jindu: e.result.jindu,
          cateList: e.result.cate
        });
      }
    });
    wx.stopPullDownRefresh();
    console.log(secend_time - timestampcount)
    t.startTimer(secend_time - timestampcount);
  },



  data: (a = {
    showIcon: false,
    topdisp: 'none',
    globalimg: i.globalData.appimg,
    countDownHour: 0,
    countDownMinute: 0,
    countDownSecond: 0,
    addspead: "",
    adveradmin: !0,
    vertical: true,
    circular: true,
    current: 0,
    clock: "",
    diypage: "true",
    route: "home",
    icons: i.requirejs("icons"),
    shop: {},
    list: [],
    merchlist: [],
    indicatorDots: !0,
    autoplay: !0,
    interval: 2000,
    duration: 500,
    circular: !0,
    total: 1,
    page: 1,
    statues: '',
    loaded: !1,
    loading: !0,
    indicatorDotsHot: !1,
    autoplayHot: !0,
    intervalHot: 5e3,
    durationHOt: 1e3,
    circularHot: !0,
    goods_id: 0,
    ad_pop: 0,
    receive_bg: 1,
    is_receive: 1,
    activation: "",
    modelShow2: !1,
    cates: [],
    cateid: 0,
    keyword: '',
    disopt: [],
    range: 0,
    todaystep: 0,
    credit3: 0,
    mp3_url: '',
    indexdisp: 'none',
    // indexdisp: 'block',
    circleDis: 'none',
    condisp: 'block',
    merchdisp: 'block',
    storedisp: 'none',
    bindDis: 'none',
    giftDis: 'none',
    updateDis: 'none',
    cateList: [],
    // rewarddisp:'none',
    seckillDis: 'none',
    werunDis: 'block',
    addressDis: 'none',
    merchantDis: 'none',
    libaoDis: 'block',
    libaolist: [],
    killlist: [],
    sec_end_time: "",
    screenWidth: '',
    helpstep: '',
    jindu: 100,
    selector: 171,
    district: '',
    city: '',
    noticelist: [],
    avamessage: '',
    home_icon: [],
    backgroundimg: '',
    autoplayA: true,
    intervalA: 3000,
    durationA: 1000,
    circularA: true,
    allPrice: 'sc_tj_icon_jg_nor@2x',
    allSales: 'sc_tj_icon_jg_nor@2x',
    nowSign: 0,
    slideshow: '0',
    looklDis: 'none'
  }, t(a, "total", 1), a),

  bindPhone: function() {
    wx.navigateTo({
      url: '/pages/member/bind/index?param=' + 1,

    })
  },
  // 好友捐赠轮播动画
  onSlideChangeEnd: function(e) {
    var that = this;
    that.setData({
      slideshow: e.detail.current
    })
  },
  // 进入商城
  entrystore: function() {
    wx.navigateTo({
      url: '/pages/goods/index/index?cate=' + 171,
    })
  },
  hybtn: function() {
    wx.switchTab({
      url: '/pages/exclusive/exclusive',
    })
  },
  merch: function() {
    wx.navigateTo({
      url: 'moremerch/moremerch',
    })
  },
  products: function () {
    wx.navigateTo({
      url: '/pages/goods/index/index?cate=' + 171,
    })
  },
  // 卡路里明细
  zkbbtn: function() {
    wx.navigateTo({
      url: '/packageA/pages/discount/zkbaccount/zkbaccount',
    })
  },
  pull: function() {
    wx.switchTab({
      url: '/pages/rebate/discount/discount',
    })
  },
  firstclosebtn: function() {
    var tt = this
    tt.setData({
      indexdisp: 'none'
    })
  },
  // 点击气泡跳转到好友助力页面
  inviteBtn: function() {
    wx.navigateTo({
      url: '/packageA/pages/helphand/friendhelp/friendhelp',
    })
  },
  moresecbtn: function() {
    wx.navigateTo({
      url: '/packageA/pages/timelimit/timelimit',
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
  openhyBtn: function() {
    wx.navigateTo({
      url: '/packageA/pages/huiyuan/hygrade/hygrade',
    })
  },
  bindgift: function() {
    wx.navigateTo({
      url: '/packageA/pages/gift/gift',
    })
  },
  skipgift: function() {
    wx.navigateTo({
      url: '/packageA/pages/gift/gift',
    })
  },
  tabCategory: function(t) {
    this.setData({
      selector: t.target.dataset.id,
      page: 1,
      list: [],
      nowSign: 0,
      allPrice: 'sc_tj_icon_jg_nor@2x',
      allSales: 'sc_tj_icon_jg_nor@2x',
    })

    console.log(this.data.list);

    cate = t.currentTarget.dataset.id
    sortorder = "";
    sortby = ""
    // this.get_list()
  },
  checkAllt: function(e) {
    console.log(cate)
    if (cate == "" || cate == undefined) {
      cate = 171
    }
    const that = this;
    let mowtxt = e.currentTarget.dataset.now;
    let priceImg;
    let salesImg;
    if (mowtxt == 0) {
      // 综合
      priceImg = 'sc_tj_icon_jg_nor@2x';
      salesImg = 'sc_tj_icon_jg_nor@2x';
      pricemark = 0;
      salesmark = 0;
      sortorder = ""
      sortby = ""
    } else if (mowtxt == 1) {
      sortorder = "minprice"
      if (pricemark == 0) {
        priceImg = 'sc_tj_icon_jg_xs@2x';
        pricemark = 1;
        // 价格升序，由低到高
        sortby = "asc"
      } else if (pricemark == 1) {
        priceImg = 'sc_tj_icon_jg_xx@2x';
        pricemark = 0;
        // 价格降序，由高到低
        sortby = "desc"
      }
      salesImg = 'sc_tj_icon_jg_nor@2x';
      salesmark = 0;

    } else if (mowtxt == 2) {
      sortorder = "sales"
      if (salesmark == 0) {
        salesImg = 'sc_tj_icon_jg_xs@2x';
        salesmark = 1;
        // 销量升序，由低到高
        sortby = "asc"
      } else if (salesmark == 1) {
        salesImg = 'sc_tj_icon_jg_xx@2x';
        salesmark = 0;
        // 销量降序，由高到低
        sortby = "desc"
      }
      priceImg = 'sc_tj_icon_jg_nor@2x';
      pricemark = 0;

    }
    that.setData({
      nowSign: mowtxt,
      allPrice: priceImg,
      allSales: salesImg,
      page: 1
    })
    console.log(sortorder, sortby, )
    that.get_list()
  },
  // 拨打电话
  tel: function(t) {
    merchphone = t.currentTarget.dataset.mobile
    wx.makePhoneCall({
      phoneNumber: merchphone,
    })
  },
  onReachBottom: function() {
    this.get_list();
  },
  //回到顶部
  goTop: function(e) { // 一键回到顶部
    var a = this
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
      a.setData({
        topdisp: 'none'
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  // 超值兑换商品列表
  
  get_list: function() {
    console.log(cate)
    var t = this;
    t.setData({
      loading: !0
    }), s.get("goods/get_list", {
      openid: userinfo.openid,
      page: t.data.page,
      order: sortorder,
      cate: cate,
      by: sortby
    }, function(e) {
      console.log(e)
      if (t.data.page >= 5) {
        t.setData({
          topdisp: 'block'
        })
      }

      console.log(t.data.page);

      let record = t.data.page - 1;
      0 == e.error ? (t.setData({
        loading: !1,
        show: !0,
        total: e.total,
        empty: !0,
      }), e.list.length > 0 && t.setData({
        page: t.data.page + 1,
        ['list[' + record + ']']: e.list
      }), e.list.length < e.pagesize && t.setData({
        loaded: !0
      })) : a.toast(e.message, "loading");

      console.log(t.data.list[record]);
    }, this.data.show);
  },
  updatebtn: function() {
    // 用户版本更新
    if (wx.canIUse("getUpdateManager")) {
      let updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate((res) => {
        console.log(res)
        // 请求完新版本信息的回调
        // hasUpdate是否有新的版本
        console.log(res.hasUpdate);
        if (res.hasUpdate == false) {
          wx.showModal({
            title: '提示',
            content: '已经是最新版本',
          })
        }
      })
      updateManager.onUpdateReady(() => {
        console.log('更新')
        wx.showModal({
          title: '有新版本更新啦',
          content: '99%的小伙伴已经更新啦，快来试试',
          success: (res) => {
            if (res.confirm) {
              console.log('确认')
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
            } else if (res.cancel) {
              console.log('取消')
              return false;
            }
          }
        })
      })
      updateManager.onUpdateFailed(() => {
        console.log('新版本下载失败')
        // 新的版本下载失败
        wx.hideLoading();
        wx.showModal({
          title: '升级失败',
          content: '新版本下载失败，请检查网络！',
          showCancel: false
        });
      });
    }
  },
  onLoad: function(t) {
    console.log(i.globalData)
    console.log('运动日记')
    console.log(t)
    console.log(userinfo)
    var k = this
    s.get("version/appversion", {}, function(eve) {
      console.log(eve)
      if ((eve.app_version == "devtools" || eve.app_version > 0) && eve.storeshow == 1) { //开发者工具|正式版
        version = 1;
        k.setData({
          condisp: 'block',
          // storedisp: 'none'
        })
      } else if ((eve.app_version == "devtools" || eve.app_version > 0) && eve.storeshow == 0) {
        version = 0;
        k.setData({
          condisp: 'none',
          // storedisp: 'none'
        })
      }
      var reg = /test/;
      if (eve.app_version == 0 || reg.test(userinfo.nickName)) { //体验版，开发版，审核版
        version = 0;
        k.setData({
          condisp: 'none',
          storedisp: 'none'
        })
      }

    })

    var a = this;
    wx.getSetting({
      success: function(e) {
        var a2 = e.authSetting["scope.userInfo"];
        if (a2 != undefined && a2 && a2 != '') {
          a.setData({
            userInfo: a2
          });
        } else {
          var reurl = '/pages/index/index';
          // wx.redirectTo({
          //     url: "/pages/message/auth/index?refrom=index&reurl=" + reurl
          // })
        }
      }
    });
    this.get_list();
    if (t.scene) {
      scene = decodeURIComponent(t.scene)
      i.globalData.bindscene = scene
      console.log(scene)
      s.get("myown/index/scene", {
        openid: userinfo.openid,
        scene: scene
      }, function(eve) {
        console.log(eve)
      })
    }
    console.log(scene)

    var l = this
    t = t || {};
    "" == i.getCache("userinfo") && i.getUserInfo();

    s.get("black", {}, function(t) {
      t.isblack && wx.showModal({
        title: "无法访问",
        content: "您在商城的黑名单中，无权访问！",
        success: function(t) {
          t.confirm && a.close(), t.cancel && a.close();
        }
      });
    });
    s.get("info", {}, function(e) {
      a.setData(e.info);
    });
    // 自动签到
    s.get("index.sign_in", {
      openid: userinfo.openid
    }, function(eve) {
      if (eve.error == 0) {
        a.setData({
          signDis: "block",
          message: eve.message
        })
      }
    });
    //获取本人坐标
    //t.removeCache("mypos");
    var e = decodeURIComponent(t.scene);
    if (!t.id && e) {
      var n = s.str2Obj(e);
      t.id = n.id, n.mid && (t.mid = n.mid);
    }
    setTimeout(function() {
      a.setData({
        areas: i.getCache("cacheset").areas
      });
    }, 3e3), i.url(t), a.setData({
      cover: !0,
      showvideo: !1
    }), wx.getSystemInfo({
      success: function(t) {
        var e = t.windowWidth / 1.7;
        a.setData({
          swiperheight: e
        });
      }
    });


    s.get("userinfo", {}, function(ee) {
      if (ee.status == 1) {
        // console.log('更新信息');
        a.setData({
          credit3: ee.result.credit3,
          todaystep: ee.result.todaystep,
          cateList: ee.result.cate
        });
      }
    });

    // 今日好友助力步数
    s.get("help/index/helpstep_today", {
      openid: userinfo.openid
    }, function(aaa) {
      // console.log(aaa)
      a.setData({
        helpstep: aaa.result.step
      })
    });
    s.get("bushu_discount", {}, function(tt) {
      console.log(tt)
      if (tt.error == 0) {
        // console.log(tt);
        if (tt.result.length <= 1) {
          a.setData({
            circleDis: 'block'
          })
        }
        a.setData({
          my_currency: tt.result,
          mp3_url: tt.url,
          // type: tt.result.type,
          // currency_step:tt.result.step
        });

      }
    });


    s.get("myown.index.optindex", {
      id: 1
    }, function(e) {
      console.log(e);
      let totalPage = Math.ceil(e.result.icon.length / 4);

      a.setData({
        backgroundimg: e.result.backgroup
      })
      var dt = {
        home_icon: e.result.icon,
        lbSellerCatsLen: totalPage,
      }
      a.setData(dt)
    })
    l.openPage();
  },

  openPage: function() {
    var a = this;
    s.get("myown.index.adsense", {
      type: 1,
      openid: userinfo.openid
    }, function(e) {
      console.log(e);
      if (e.status == 1) {
        a.setData({
          bannerList: e.result.list
        })
      } else if (e.status == 0) {
        wx.showToast({
          title: e.result.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  onHide: function() {
    clearInterval(interval); //跳转页面关闭限时抢购的时间函数

    this.setData({
      adveradmin: !1,
      unpaid: !1
    });
  },

  receive: function(t) {
    var ttt = this;
    console.log(t)
    console.log(t.currentTarget.dataset.step)
    if (1 == ttt.data.is_receive) {
      ttt.setData({
        is_receive: 2
      });
      var eee = t.currentTarget.dataset.id,
        aaa = t.currentTarget.dataset.source,
        curstep = t.currentTarget.dataset.step,
        sss = wx.createInnerAudioContext();
      s.get("getkll_discount", {
        id: eee,
        source: aaa,
        step: curstep
      }, function(t) {
        console.log(t)
        ttt.setData({
          is_receive: 1
        });
        s.get("bushu_discount", {}, function(t) {
          if (t.error == 0) {
            // console.log(t.result);
            ttt.setData({
              my_currency: t.result,
              mp3_url: t.url
            });
          }

        });
      });
      sss.autoplay = !0, sss.src = this.data.mp3_url + "/coin.mp3", sss.onPlay(function() {
        console.log("开始播放");

      });
    }
  },
  onShow: function() {
    var t = this,
      a = wx.getSystemInfoSync(),
      e = i.getCache("sysset");
    s.get("game/index/icon", {
      openid: userinfo.openid
    }, function(e) {
      if (e.status == 1) {
        let sincss;
        if (e.result.is_show == 1) {

          sincss = 'block';
        } else if (e.result.is_show == 0) {

          sincss = 'none';
        }
        t.setData({
          giftDis: sincss
        })
      }

    });
    var TIME = util.formatTime(new Date());
    var timestamp = Date.parse(new Date());
    timestampcount = timestamp / 1000
    console.log(timestampcount)
    this.setData({
      time: TIME,
      timestamp: timestamp / 1000
    });

    // 秒杀列表
    s.get("seckill/list", {
      type: 1,
      page: 1
    }, function(e) {
      console.log(e)
      if (e.status == 1) {
        secend_time = e.result.end_time
        console.log(secend_time)
        t.startTimer(secend_time - timestamp / 1000);
        t.setData({
          seckillDis: 'block',
          killlist: e.result.list,
          sec_end_time: e.result.end_time
        })
      } else if (e.status == 0) {
        t.setData({
          seckillDis: 'none'
        })
      }

    });

    // 边看边买列表
    s.get("seckill.list.index_sale", {}, function(e) {
      console.log(e)
      if (e.status == 1) {
        t.setData({
          looklDis: 'block',
          lookBuy: e.result.list
        })
      } else if (e.status == 0) {
        t.setData({
          looklDis: 'none'
        })
      }
    });

    // 礼包
    s.get("help/gift", {
      openid: userinfo.openid
    }, function(e) {
      console.log(e)
      if (e.status == -1) {
        t.setData({
          libaoDis: 'none'
        })
      } else {
        if (e.status == 1) {
          t.setData({
            libaolist: e.result.goods
          })
        } else if (e.status == 0) {
          // wx.showModal({
          //   title: '提示',
          //   content: e.result.message,
          // })
        }
      }


    });
    wx.getSetting({
      success: (res) => {
        console.log(res)
        if (!res.authSetting['scope.werun']) {
          console.log('未获取微信运动')
          t.setData({
            credit3: 0,
            todaystep: 0
          });
        } else if (res.authSetting['scope.werun']) {
          console.log('已经获取运动')
          wx.getWeRunData({
            success(res) {
              console.log(res)
              wx.login({
                success: function(a) {
                  a.code ? s.post("wxapp.login", {
                    code: a.code
                  }, function(a) {
                    console.log(a)
                    openid = "sns_wa_" + a.openid
                    res.sessionKey = a.session_key;
                    res.openid = openid;
                    s.post('wxapp/urundata', {
                      res
                    }, function(e) {
                      console.log(e)
                      if (e.status == 1) {
                        s.get("userinfo", {}, function(ee) {
                          if (ee.status == 1) {
                            console.log('运动步数', ee);
                            t.setData({
                              credit3: ee.result.credit3,
                              todaystep: ee.result.todaystep,
                              cateList: ee.result.cate
                            });
                          }
                        });
                        // 今日好友助力步数
                        s.get("help/index/helpstep_today", {
                          openid: userinfo.openid
                        }, function(aaa) {
                          // console.log(aaa)
                          t.setData({
                            helpstep: aaa.result.step
                          })
                        });

                      }
                    })
                  }) : s.alert("获取用户登录态失败:" + a.errMsg);

                }
              })
            }
          });

        }
        if (!res.authSetting['scope.userLocation']) {
          console.log('未获取地理位置')
          t.setData({
            addressDis: 'block',
            merchantDis: 'none',
          })
          // 门店服务
          s.get("changce/merch/get_from_storenew", {
            page: 1,
            lat: latitude,
            lng: longitude,
          }, function(e) {
            console.log(e)
            var i = {
              loading: false,
              result: e.result,
              merchInfo: e.result.merchInfo,
              goodlist: e.result.goodList.list.slice(0, 3)
            }
            t.setData(i)
          })
        } else if (res.authSetting['scope.userLocation']) {
          t.setData({
            merchantDis: 'block',
            addressDis: 'none',
          })
          console.log('已经获取地理位置')
          console.log(res)
          console.log(longitude, latitude)
          // 门店服务
          s.get("changce/merch/get_from_storenew", {
            page: 1,
            lat: latitude,
            lng: longitude,
          }, function(e) {
            console.log(e)
            var i = {
              loading: false,
              result: e.result,
              merchInfo: e.result.merchInfo,
              goodlist: e.result.goodList.list.slice(0, 3)
            }

            t.setData(i)
          })
        }
      }
    })
    s.get("changce/merch/draw_rank", {}, function(e) {
      console.log(e)
      if (e.status == 1) {
        t.setData({
          noticelist: e.result.log
        })
      }
    });
    s.get("bushu_discount", {}, function(tttt) {
      if (tttt.error == 0) {
        console.log(tttt.result);
        if (tttt.result.length <= 1) {
          t.setData({
            circleDis: 'block'
          })
        }
      }
    });
    // 是否绑定手机号
    s.get("myown/bindmobile/isbind", {
      openid: userinfo.openid
    }, function(e) {
      console.log(e)
      if (e.error == 0) {
        let essence;
        if (e.message.bind == 0) {
          essence = 'block';
        } else if (e.message.bind == 1) {
          essence = 'none';
        }
        t.setData({
          bindDis: essence
        })
      }



    });
    // 测试
    s.get("index/ceshi", {
      openid: userinfo.openid
    }, function(e) {
      console.log(e)
      if (e.status == 1) {
        t.setData({
          updateDis: 'block'
        })
      } else {
        t.setData({
          updateDis: 'none'
        })
      }

    });
    // 平台活跃人数
    s.get("help/index/get_member_count", {}, function(e) {
      console.log(e)
      t.setData({
        avamessage: e.result.message
      })
    });
    t.getList();
    t.openPage();
  },
  getList: function() {
    var tt = this;
    wx.login({
      success: function(a) {
        console.log(a)
        a.code ? s.post("wxapp.login", {
          code: a.code
        }, function(a) {
          console.log(a);
          // login=a.login
          openid = "sns_wa_" + a.openid
          if (i.globalData.applogin == '') {
            i.globalData.applogin = a.login
          }
          i.globalData.applog = a.login
          console.log(i.globalData.applogin)
          console.log(i.globalData.applog)
          // login为1(不是首次登录)
          if (a.login == 0) {
            tt.setData({
              indexdisp: 'block'
            })
            s.get("myown/sport/update_login", {
              openid: openid
            }, function(event) {
              console.log(event)
            })
          } else {
            tt.setData({
              indexdisp: 'none'
            })
          }
          if (i.globalData.bindscene != "") {
            s.get("myown/sport/binding", {
              openid: openid,
              login: i.globalData.applogin,
              parent_id: i.globalData.bindscene
            }, function(u) {
              console.log(u)
              if (u.status == 0) {
                i.globalData.applogin = 1
              }

            })
          }
        }) : s.alert("获取用户登录态失败:" + a.errMsg);
      },
      fail: function() {
        s.alert("获取用户信息失败!");
      }
    })
    // console.log('获取附近商家')
    var newpos = i.getCache("mypos");
    // 首页附近异业商家
    s.get("changce/merch/get_list", {
      page: 1,
      lat: newpos.lat,
      lng: newpos.lng,
    }, function(eve) {
      console.log(eve)
      var i = {
        loading: false,
        total: eve.total,
        pagesize: eve.pagesize,
        cates: eve.cates,
        disopt: eve.disopt,
        merchlist: eve.list,
        // reward: eve.list[i].is_reward
      };
      tt.setData(i)

    })
  },

  startTimer: function(currentstartTimer) {
    clearInterval(interval);
    interval = setInterval(function() {
      var second = currentstartTimer;
      // 天数位
      var day = Math.floor(second / 3600 / 24);
      var dayStr = day.toString();
      if (dayStr.length == 1) dayStr = '0' + dayStr;

      // 小时位
      var hr = Math.floor((second) / 3600);
      var hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = '0' + hrStr;
      // 分钟位
      var min = Math.floor((second - hr * 3600) / 60);
      var minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr;

      // 秒位
      var sec = second - hr * 3600 - min * 60;
      var secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;

      this.setData({
        countDownHour: hrStr,
        countDownMinute: minStr,
        countDownSecond: secStr,
      });
      currentstartTimer--;
      if (currentstartTimer <= 0) {
        clearInterval(interval);
        this.setData({
          seckillDis: 'none',
          countDownDay: '00',
          countDownHour: '00',
          countDownMinute: '00',
          countDownSecond: '00',
        });
      }
    }.bind(this), 1000);
  },
  goodsicon: function(t) {
    this.setData({
      iconheight: t.detail.height,
      iconwidth: t.detail.width
    });
  },
  getcaloriebtn: function() {
    var that = this
    wx.getWeRunData({
      success(res) {
        console.log(res)
        // if (res.openid == undefined || res.sessionKey == undefined) {
        wx.login({
          success: function(a) {
            a.code ? s.post("wxapp.login", {
              code: a.code
            }, function(a) {
              console.log(a)
              openid = "sns_wa_" + a.openid
              res.sessionKey = a.session_key;
              res.openid = openid;
              s.post('wxapp/urundata', {
                res
              }, function(e) {
                console.log(e)
                if (e.status == 1) {
                  s.get("userinfo", {}, function(ee) {
                    if (ee.status == 1) {
                      console.log('运动步数');
                      that.setData({
                        credit3: ee.result.credit3,
                        todaystep: ee.result.todaystep,
                        cateList: ee.result.cate
                      });
                    }
                  });
                  // 今日好友助力步数
                  s.get("help/index/helpstep_today", {
                    openid: userinfo.openid
                  }, function(aaa) {
                    // console.log(aaa)
                    that.setData({
                      helpstep: aaa.result.step
                    })
                  });

                }
              })
            }) : s.alert("获取用户登录态失败:" + a.errMsg);

          }
        })
        // }
      }
    });
    //判断是否获得了微信运动
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.werun']) {
          that.setData({
            credit3: 0,
            todaystep: 0
          });
          that.openfirm()
        } else if (res.authSetting['scope.werun']) {
          console.log('已经获取')

          wx.showToast({
            title: '今日步数已更新',
            duration: 1000
          })
          s.get("userinfo", {}, function(e) {
            console.log(e)
            if (e.status == 1) {
              that.setData({
                credit3: e.result.credit3,
                todaystep: e.result.todaystep
              });
            }

          });
        }
      }
    })

  },
  openfirm: function() {
    wx.showModal({
      content: '是否允许跑库获取您的微信运动',
      confirmText: "确认",
      cancelText: "取消",
      success: function(res) {
        console.log(res);
        //点击“确认”时打开设置页面
        if (res.confirm) {
          console.log('用户点击确认')
          wx.openSetting({
            success: (res) => {}
          })
        } else {
          console.log('用户点击取消')
        }
      }
    });
  },

  // 打开地理位置
  click: function() {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        console.log(res)
        longitude = res.longitude
        latitude = res.latitude
        // 门店服务
        s.get("changce/merch/get_from_storenew", {
          page: 1,
          lat: res.latitude,
          lng: res.longitude,
        }, function(e) {
          console.log(e)
          var i = {
            loading: false,
            result: e.result,
            merchInfo: e.result.merchInfo,
            goodlist: e.result.goodList.list.slice(0, 3)
          }
          that.setData(i)
        })
      }
    })
    //判断是否获得了用户地理位置授权
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userLocation'])
          that.openConfirm()
      }
    })
  },
  openConfirm: function() {
    wx.showModal({
      content: '检测到您没打开地理位置权限，是否去设置打开？',
      confirmText: "确认",
      cancelText: "取消",
      success: function(res) {
        console.log(res);
        //点击“确认”时打开设置页面
        if (res.confirm) {
          console.log('用户点击确认')
          wx.openSetting({
            success: (res) => {}
          })
        } else {
          console.log('用户点击取消')
        }
      }
    });
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
  // page(e={})的结束括号
}, t(e, "userinfo", function(t) {
  var a = t.detail.iv,
    e = t.detail.encryptedData;
  i.getUserInfo(null, null, {
    iv: a,
    encryptedData: e
  });
}), t(e, "close", function() {
  i.globalData.flag = !0, wx.reLaunch({
    url: "/pages/index/index"
  });
}), e));