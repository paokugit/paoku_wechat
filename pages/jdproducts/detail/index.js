 function t(t, e, a) {
   return e in t ? Object.defineProperty(t, e, {
     value: a,
     enumerable: !0,
     configurable: !0,
     writable: !0
   }) : t[e] = a, t;
 }

 var e, a, o = getApp(),
   s = o.requirejs("core"),
   i = (o.requirejs("icons"), o.requirejs("foxui")),
   n = o.requirejs("biz/diypage"),
   r = o.requirejs("biz/diyform"),
   c = o.requirejs("biz/goodspicker"),
   d = o.requirejs("jquery"),
   l = o.requirejs("wxParse/wxParse"),
   u = 0,
   g = o.requirejs("biz/selectdate");
 var merchid = '',
   reurl = '',
   goodsid = 2065,
   inviteid = ""
 var f = getApp()
 var productid = ''
 var openid = ''
 var goodImg = ""
 // 当前登录人的openid
 var f = getApp();
 var userinfo = f.getCache('userinfo');
 console.log(userinfo)
 openid = userinfo.openid
 const app = getApp()
 var util = require('../../../utils/util.js');
 Page((a = {
   data: (e = {
       globalimg: f.globalData.appimg,
       showIcon: true,
       gloheight: f.globalData.gloheight,
       diypages: {},
       usediypage: !1,
       specs: [],
       options: [],
       icons: o.requirejs("icons"),
       goods: {},
       indicatorDots: !0,
       autoplay: !0,
       interval: 5e3,
       duration: 500,
       circular: !0,
       play: "/static/images/video_play.png",
       mute: "/static/images/icon/mute.png",
       voice: "/static/images/icon/voice.png",
       active: "",
       slider: "",
       tempname: "",
       info: "active",
       preselltimeend: "",
       presellsendstatrttime: "",
       advWidth: 0,
       dispatchpriceObj: 0,
       now: parseInt(Date.now() / 1e3),
       day: 0,
       hour: 0,
       minute: 0,
       second: 0,
       timer: 0,
       discountTitle: "",
       istime: 1,
       istimeTitle: "",
       isSelected: !1,
       params: {},
       total: 1,
       optionid: 0,
       audios: {},
       audiosObj: {},
       merchid: '',
       defaults: {
         id: 0,
         merchid: 0
       },
       buyType: "",
       pickerOption: {},
       specsData: [],
       specsTitle: "",
       canBuy: "",
       diyform: {},
       showPicker: !1,
       showcoupon: !1,
       pvalOld: [0, 0, 0],
       pval: [0, 0, 0],
       areas: [],
       noArea: !0,
       commentObj: {},
       commentObjTab: 1,
       loading: !1,
       commentEmpty: !1,
       commentPage: 1,
       commentLevel: "all",
       commentList: [],
       closeBtn: !1,
       soundpic: !0,
       animationData: {},
       uid: "",
       stararr: ["all", "good", "normal", "bad", "pic"],
       nav_mask: !1,
       nav_mask2: !1,
       nav: 0,
       giftid: "",
       limits: !0,
       phonetype: '',
       modelShow: !1,
       showgoods: !0
     }, t(e, "timer", 0), t(e, "lasttime", 0), t(e, "hour", "-"), t(e, "min", "-"), t(e, "sec", "-"),
     t(e, "currentDate", ""), t(e, "dayList", ""), t(e, "currentDayList", ""), t(e, "currentObj", ""),
     t(e, "currentDay", ""), t(e, "checkedDate", ""), t(e, "showDate", ""), t(e, "scope", ""),
     t(e, "goods_hint_show", !1), t(e, "presellisstart", 0), e),

   goodsTab: function(t) {
     var e = this,
       a = t.currentTarget.dataset.tap;
     if ("info" == a) this.setData({
       info: "active",
       para: "",
       comment: ""
     });
     else if ("para" == a) this.setData({
       info: "",
       para: "active",
       comment: ""
     });
     else if ("comment" == a) {
       if (e.setData({
           info: "",
           para: "",
           comment: "active"
         }), e.data.commentList.length > 0) return void e.setData({
         loading: !1
       });
       e.setData({
         loading: !0
       }), s.get("goods/get_comment_list", {
         id: e.data.options.id,
         level: e.data.commentLevel,
         page: e.data.commentPage
       }, function(t) {
         t.list.length > 0 ? e.setData({
           loading: !1,
           commentList: t.list,
           commentPage: t.page
         }) : e.setData({
           loading: !1,
           commentEmpty: !0
         });
       });
     }
   },
   comentTap: function(t) {
     var e = this,
       a = t.currentTarget.dataset.type,
       o = "";
     1 == a ? o = "all" : 2 == a ? o = "good" : 3 == a ? o = "normal" : 4 == a ? o = "bad" : 5 == a && (o = "pic"),
       a != e.data.commentObjTab && s.get("goods/get_comment_list", {
         id: e.data.options.id,
         level: o,
         page: e.data.commentPage
       }, function(t) {
         t.list.length > 0 ? e.setData({
           loading: !1,
           commentList: t.list,
           commentPage: t.page,
           commentObjTab: a,
           commentEmpty: !1
         }) : e.setData({
           loading: !1,
           commentList: t.list,
           commentPage: t.page,
           commentObjTab: a,
           commentEmpty: !0
         });
       });
   },
   preview: function(t) {
     wx.previewImage({
       current: t.currentTarget.dataset.src,
       urls: t.currentTarget.dataset.urls
     });
   },

   // 进店逛逛
   goStore: function() {
     console.log(merchid)
     if (merchid == 0) {
       wx.switchTab({
         url: '/pages/index/index',
       })
     } else {
       wx.navigateTo({
         url: '/packageA/pages/changce/merch/detail?id=' + merchid,
       })
     }

   },
   getDetail: function(t) {
     var e = this,
       a = parseInt(Date.now() / 1e3);
     e.setData({
       loading: !0
     }), s.get("goods/get_detail", {
       id: 2065
     }, function(t) {
       console.log(t)
       var smart_title = t.goods.title.slice(0, 10);
       merchid = t.goods.merchid
       
       console.log(t), t.error > 0 && (e.setData({
         show: !0,
         showgoods: !1
       }), i.toast(e, t.message), setTimeout(function() {
         wx.navigateBack();
       }, 800));
       var o = t.goods.coupons,
         n = t.goods.thumbMaxHeight,
         r = t.goods.thumbMaxWidth / n;
       if (wx.getSystemInfo({
           success: function(t) {
             console.log(t)
             var a = t.windowWidth / r;
             e.setData({
               advWidth: t.windowWidth,
               advHeight: a
             });
           }
         }), e.setData({
           coupon: o,
           coupon_l: o.length,

           credittext: t.goods.credittext,
           activity: t.goods.activity,
           merchid: t.goods.merchid
         }), l.wxParse("wxParseData", "html", t.goods.content, e, "0"),
         l.wxParse("wxParseData_buycontent", "html", t.goods.buycontent, e, "0"), e.setData({
           show: !0,
           goods: t.goods,
           minprice: t.goods.minprice,
           maxprice: t.goods.maxprice,
           preselltimeend: t.goods.preselltimeend,
           style: t.goods.labelstyle.style,
           navbar: t.goods.navbar,
           labels: t.goods.labels
         })) {
         
       }

       var g = e.data.fullbackgoods;
       if (void 0 != g) {
         var m = g.maxfullbackratio,
           h = g.maxallfullbackallratio,
           m = Math.round(m),
           h = Math.round(h);
         e.setData({
           maxfullbackratio: m,
           maxallfullbackallratio: h
         });
       }
       9 == t.goods.type && (e.setData({
         checkedDate: t.goods.nowDate
       }));
     });
   },
   selectPicker: function(t) {
     var e = this,
       a = t.currentTarget.dataset.time,
       o = t.currentTarget.dataset.timeout;
     if (e.data.limits) {
       if (console.log(o), "timeout" == a || "access_time" == a) {
         if ("false" == o) return void e.setData({
           goods_hint_show: !0
         });
         if ("true" == o) {
           if ("access_time" == a) {
             e.setData({
               goods_hint_show: !1
             });
             s = "goodsdetail";
             return void c.selectpicker(t, e, s);
           }
           if ("timeout" == a) return void e.setData({
             goods_hint_show: !1
           });
         }
       }
       var s = "goodsdetail";
       c.selectpicker(t, e, s);
     } else e.setData({
       modelShow: !0
     });
   },
   specsTap: function(t) {
     var e = this;
     c.specsTap(t, e);
   },
   emptyActive: function() {
     this.setData({
       active: "",
       slider: "out",
       tempname: "",
       showcoupon: !1,
       gift: !1,
       cycledate: !1
     });
   },
   buyNow: function(t) {
     var e = this;
     c.buyNow(t, e, "goods_detail", inviteid);
   },
   getCart: function(t) {
     var e = this;
     c.getCart(t, e);
   },
   select: function() {
     var t = this,
       e = t.data.optionid;
     t.data.diyform;
     u > 0 && 0 == e ? i.toast(t, "请选择规格") : this.setData({
       active: "",
       slider: "out",
       isSelected: !0,
       tempname: ""
     });
   },
   inputNumber: function(t) {
     var e = this;
     c.inputNumber(t, e);
   },
   number: function(t) {
     var e = this;
     c.number(t, e);
   },
   onPullDownRefresh: function() {
   },
   onLoad: function(t) {
     var tt = this
     s.get("goods/poster/sharegoodsimg", {
       id: t.id,
     }, function(a) {
       console.log(a)
       goodImg = a.url
     })
     // 商品id
     productid = t.id
     console.log(productid)
     n.get(this, "goodsdetail", function(t) {
       var a = t.diypage.items;
       for (var o in a) "copyright" == a[o].id && tt.setData({
         copyright: a[o]
       });
     }), t = t || {};
     goodsid = t.id;
     console.log(goodsid)
     tt.setData({
       id: t.id
     }), o.url(t), wx.getSystemInfo({
       success: function(t) {
         tt.setData({
           windowWidth: t.windowWidth,
           windowHeight: t.windowHeight
         });
       }
       }), tt.setData({
       uid: t.id
     });
     o.getUserInfo(function() {
       tt.setData({
         options: t
       }), wx.getSystemInfo({
         success: function(t) {
           tt.setData({
             advWidth: t.windowWidth
           }), console.log(t.windowHeight);
         }
         }), tt.setData({
         success: !0,
         cover: !0,
         showvideo: !0
         }), tt.getDetail(t), setTimeout(function() {
         tt.setData({
           areas: o.getCache("cacheset").areas
         });
       }, 3e3);
     }, function() {
       "" == o.getCache("userinfo") && o.getUserInfo();
     });
   },
   onShow: function() {
     var t = this;
     o.getCache("isIpx") ? t.setData({
       isIpx: !0,
       iphonexnavbar: "fui-iphonex-navbar"
     }) : t.setData({
       isIpx: !1,
       iphonexnavbar: ""
     }), wx.getStorage({
       key: "mydata",
       success: function(e) {
         wx.removeStorage({
           key: "mydata",
           success: function(t) {}
         }), t.getDetail(e.data), wx.pageScrollTo({
           scrollTop: 0
         });
       }
     })

   },
   onChange: function(t) {
     return r.onChange(this, t);
   },
   DiyFormHandler: function(t) {
     return r.DiyFormHandler(this, t);
   },
   selectArea: function(t) {
     return r.selectArea(this, t);
   },
   bindChange: function(t) {
     return r.bindChange(this, t);
   },
   onCancel: function(t) {
     return r.onCancel(this, t);
   },
   onConfirm: function(t) {
     return r.onConfirm(this, t);
   },
   getIndex: function(t, e) {
     return r.getIndex(t, e);
   },
   onShareAppMessage: function(res) {
     var that = this;
     that.setData({
       closeBtn: !1
     })
     return {
       title: that.data.goods.title,
       path: "/pages/goods/detail/index?id=" + this.data.options.id,
       imageUrl: goodImg,
       success: function(res) {
         // 转发成功

         that.shareClick();
       },
       fail: function(res) {
         // 转发失败
       }
     }
   },

   showpic: function() {
     this.setData({
       showpic: !0,
       cover: !1,
       showvideo: !1
     }), this.videoContext = wx.createVideoContext("myVideo"), this.videoContext.pause();
   },
   showvideo: function() {
     this.setData({
       showpic: !1,
       showvideo: !0
     }), this.videoContext = wx.createVideoContext("myVideo"), this.videoContext.play();
   },
   startplay: function() {
     this.setData({
       cover: !1
     }), this.videoContext = wx.createVideoContext("myVideo"), this.videoContext.play();
   },
   bindfullscreenchange: function(t) {
     1 == t.detail.fullScreen ? this.setData({
       success: !1
     }) : this.setData({
       success: !0
     });
   },
   phone: function() {
     var t = this.data.phonenumber + "";
     wx.makePhoneCall({
       phoneNumber: t
     });
   },
   closeBtn: function() {
     this.setData({
       closeBtn: !1
     });
   },
   onHide: function() {
     this.setData({
       closeBtn: !1
     });
   },

   addshow: function() {
     console.log('1')
     this.setData({
       closeBtn: !0
     });
   },
   nav: function() {
     this.setData({
       nav_mask: !this.data.nav_mask
     });
   },
   nav2: function() {
     this.setData({
       nav_mask2: !this.data.nav_mask2
     });
   },
   changevoice: function() {
     this.data.sound ? this.setData({
       sound: !1,
       soundpic: !0
     }) : this.setData({
       sound: !0,
       soundpic: !1
     });
   },
   radioChange: function(t) {
     this.setData({
       giftid: t.currentTarget.dataset.giftgoodsid,
       gift_title: t.currentTarget.dataset.title
     });
   },
   activityPicker: function() {
     this.setData({
       fadein: "in"
     });
   },
   actOutPicker: function() {
     this.setData({
       fadein: ""
     });
   },
   cancelclick: function() {
     this.setData({
       modelShow: !1
     });
   },
   confirmclick: function() {
     this.setData({
       modelShow: !1
     }), wx.openSetting({
       success: function(t) {}
     });
   },
   sendclick: function() {
     wx.navigateTo({
       url: "/pages/map/index"
     });
   },
   syclecancle: function() {
     this.setData({
       cycledate: !1
     });
   },
   sycleconfirm: function() {
     this.setData({
       cycledate: !1
     });
   },
   editdate: function(t) {
     g.setSchedule(this), this.setData({
       cycledate: !0
     });
   },
   doDay: function(t) {
     g.doDay(t, this);
   },
   selectDay: function(t) {
     g.selectDay(t, this), g.setSchedule(this);
   },
   play: function(t) {
     var e = t.target.dataset.id,
       a = this.data.audiosObj[e] || !1;
     if (!a) {
       a = wx.createInnerAudioContext("audio_" + e);
       var o = this.data.audiosObj;
       o[e] = a, this.setData({
         audiosObj: o
       });
     }
     var s = this;
     a.onPlay(function() {
       var t = setInterval(function() {
         var o = a.currentTime / a.duration * 100 + "%",
           i = Math.floor(Math.ceil(a.currentTime) / 60),
           n = (Math.ceil(a.currentTime) % 60 / 100).toFixed(2).slice(-2),
           r = Math.ceil(a.currentTime);
         i < 10 && (i = "0" + i);
         var c = i + ":" + n,
           d = s.data.audios;
         d[e].audiowidth = o, d[e].Time = t, d[e].audiotime = c, d[e].seconds = r, s.setData({
           audios: d
         });
       }, 1e3);
     });
     var i = t.currentTarget.dataset.audio,
       n = t.currentTarget.dataset.time,
       r = t.currentTarget.dataset.pausestop,
       c = t.currentTarget.dataset.loopplay;
     0 == c && a.onEnded(function(t) {
       d[e].status = !1, s.setData({
         audios: d
       });
     });
     var d = s.data.audios;
     d[e] || (d[e] = {}), a.paused && 0 == n ? (a.src = i, a.play(), 1 == c && (a.loop = !0),
       d[e].status = !0, s.pauseOther(e)) : a.paused && n > 0 ? (a.play(), 0 == r ? a.seek(n) : a.seek(0),
       d[e].status = !0, s.pauseOther(e)) : (a.pause(), d[e].status = !1), s.setData({
       audios: d
     });
   },
   pauseOther: function(t) {
     var e = this;
     d.each(this.data.audiosObj, function(a, o) {
       if (a != t) {
         o.pause();
         var s = e.data.audios;
         s[a] && (s[a].status = !1, e.setData({
           audios: s
         }));
       }
     });
   }
 }, t(a, "onHide", function() {
   this.pauseOther();
 }), t(a, "onUnload", function() {
   this.pauseOther();
   console.log('asc');

 }), t(a, "navigate", function(t) {
   var e = t.currentTarget.dataset.url,
     a = t.currentTarget.dataset.phone,
     o = t.currentTarget.dataset.appid,
     s = t.currentTarget.dataset.appurl;
   e && wx.navigateTo({
     url: e
   }), a && wx.makePhoneCall({
     phoneNumber: a
   }), o && wx.navigateToMiniProgram({
     appId: o,
     path: s
   });
 }), t(a, "userinfo", function(t) {
   var e = this;
   o.getUserInfo(function() {
     e.onShow();
   });
 }), t(a, "close", function() {
   o.globalData.flag = !0, wx.reLaunch({
     url: "/pages/index/index"
   });
 }), a));