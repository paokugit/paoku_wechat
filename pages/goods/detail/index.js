 function t(t, e, a) {
        return e in t ? Object.defineProperty(t, e, {
            value: a,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = a, t;
    }

var e, a, o = getApp(), s = o.requirejs("core"), i = (o.requirejs("icons"), o.requirejs("foxui")), n = o.requirejs("biz/diypage"), r = o.requirejs("biz/diyform"), c = o.requirejs("biz/goodspicker"), d = o.requirejs("jquery"), l = o.requirejs("wxParse/wxParse"), u = 0, g = o.requirejs("biz/selectdate");
var merchid = '', reurl = '', sharemid = '', goodsid = '', inviteid=""
var f = getApp()
var productid = ''
var shareprice = ''
var clickprice = ''
var commission = ''
var reward = ''
var openid = ''
var sessionKey = ""
var iv = ""
var encryptedData = ""
var phoneerror = ""
var goodImg = ""
var version = 1
// var phonetype=""
// 当前登录人的openid
var f = getApp();
var userinfo = f.getCache('userinfo');
console.log(userinfo)
openid = userinfo.openid
const app = getApp()
var interval = new Object();
var second_time=""
var timestampcount = ""
var util = require('../../../utils/util.js');
Page((a = {
    data: (e = {
        globalimg: f.globalData.appimg,
      showIcon: true,
      gloheight: f.globalData.gloheight,
        countDownHour: 10,
        countDownMinute: 10,
        countDownSecond: 10,
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
        rewardDis: 'none',
        notaddDis: 'none',
        addDis: 'none',
        shareDis: 'block',
        listDis: 'block',
        seckillDis:'none',
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
    favorite: function (t) {
        var e = this;
        console.log(e)
        console.log(e.data.limits)
        if (e.data.limits) {
            var a = t.currentTarget.dataset.isfavorite ? 0 : 1;
            s.get("member/favorite/toggle", {
                id: e.data.options.id,
                isfavorite: a
            }, function (t) {
                t.isfavorite ? e.setData({
                    "goods.isfavorite": 1
                }) : e.setData({
                    "goods.isfavorite": 0
                });
            });
        } else this.setData({
            modelShow: !0
        });
    },
    goodsTab: function (t) {
        var e = this, a = t.currentTarget.dataset.tap;
        if ("info" == a) this.setData({
            info: "active",
            para: "",
            comment: ""
        }); else if ("para" == a) this.setData({
            info: "",
            para: "active",
            comment: ""
        }); else if ("comment" == a) {
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
            }, function (t) {
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
    comentTap: function (t) {
        var e = this, a = t.currentTarget.dataset.type, o = "";
        1 == a ? o = "all" : 2 == a ? o = "good" : 3 == a ? o = "normal" : 4 == a ? o = "bad" : 5 == a && (o = "pic"),
            a != e.data.commentObjTab && s.get("goods/get_comment_list", {
                id: e.data.options.id,
                level: o,
                page: e.data.commentPage
            }, function (t) {
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
    preview: function (t) {
        wx.previewImage({
            current: t.currentTarget.dataset.src,
            urls: t.currentTarget.dataset.urls
        });
    },

    getPhoneNumber: function (e) {
        var p = this
        console.log(e.detail.errMsg)
        console.log(e.detail.iv)
        console.log(e.detail.encryptedData)
        iv = e.detail.iv
        encryptedData = e.detail.encryptedData
        console.log(sessionKey)
        if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
            console.log('用户点击拒绝')
            p.setData({
                closeBtn: !0
            })
        } else {
            //同意授权
            console.log('用户同意授权')
            p.setData({
                closeBtn: !0
            })
            s.get("member/index/add_mobile", {
                iv: iv,
                encryptedData: encryptedData,
                sessionKey: sessionKey
            }, function (t) {
                console.log(t)
            })
        }

    },

    // 进店逛逛
    goStore: function () {
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
    getDetail: function (t) {

        console.log(phoneerror)
        var e = this, a = parseInt(Date.now() / 1e3);
        e.setData({
            loading: !0
        }), s.get("goods/get_detail", {
            id: t.id
        }, function (t) {
            console.log(t)
            var smart_title = t.goods.title.slice(0, 10);
            // e.setData({
            //     "nvabarData.title": smart_title
            // })
            second_time = t.goods.timeend
            merchid = t.goods.merchid
            reward = t.goods.reward
            console.log(reward)
            console.log(second_time)
            if (reward == 0) {
                // 没有赏金任务
                e.setData({
                    addDis: 'block',
                    rewardDis: 'none',
                })


            } else {
                // 有赏金任务
                // 未添加手机号
                if (phoneerror == 1) {
                    e.setData({
                        notaddDis: 'block',
                        addDis: 'none',
                    })
                } else {
                    // 已添加手机号
                    e.setData({
                        notaddDis: 'none',
                        addDis: 'block',
                    })
                }
                e.setData({
                    rewardDis: 'block',
                    shareprice: t.goods.share_price,
                    clickprice: t.goods.click_price,
                    commission: t.goods.commission,
                })
            }
            console.log(version)
            if (version == 0) {
                e.setData({
                    rewardDis: 'none',
                    // shareDis: 'none'
                })
            }
            console.log(t), t.error > 0 && (e.setData({
                show: !0,
                showgoods: !1
            }), i.toast(e, t.message), setTimeout(function () {
                wx.navigateBack();
            }, 800));
            var o = t.goods.coupons, n = t.goods.thumbMaxHeight, r = t.goods.thumbMaxWidth / n;
            if (wx.getSystemInfo({
                success: function (t) {
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
                packagegoods: t.goods.packagegoods,
                packagegoodsid: t.goods.packagegoods.goodsid,
                credittext: t.goods.credittext,
                activity: t.goods.activity,
                phonenumber: t.goods.phonenumber,
                showDate: t.goods.showDate,
                scope: t.goods.scope,
                merchid: t.goods.merchid
            }), t.goods.packagegoods && e.package(), l.wxParse("wxParseData", "html", t.goods.content, e, "0"),
                l.wxParse("wxParseData_buycontent", "html", t.goods.buycontent, e, "0"), e.setData({
                    show: !0,
                    goods: t.goods,
                    minprice: t.goods.minprice,
                    maxprice: t.goods.maxprice,
                    preselltimeend: t.goods.preselltimeend,
                    style: t.goods.labelstyle.style,
                    navbar: t.goods.navbar,
                    labels: t.goods.labels
                }), console.log(t.goods), wx.setNavigationBarTitle({
                    title: smart_title || "商品详情"
                }), u = t.goods.hasoption, d.isEmptyObject(t.goods.dispatchprice) || "string" == typeof t.goods.dispatchprice ? e.setData({
                    dispatchpriceObj: 0
                }) : e.setData({
                    dispatchpriceObj: 1
                }), t.goods.isdiscount > 0 && t.goods.isdiscount_time >= a) {
                clearInterval(e.data.timer);
                c = setInterval(function () {
                    e.countDown(0, t.goods.isdiscount_time);
                }, 1e3);
                e.setData({
                    timer: c
                });
            } else e.setData({
                discountTitle: "活动已结束"
            });
            if (t.goods.istime > 0) {
                clearInterval(e.data.timer);
                c = setInterval(function () {
                    e.countDown(t.goods.timestart, t.goods.timeend, "istime");
                }, 1e3);
                e.setData({
                    timer: c
                });
            }
            if (t.goods.ispresell > 0) {
                var c = setInterval(function () {
                    0 == t.goods.canbuy ? e.countDown(a, t.goods.preselltimestart, "istime") : 1 == t.goods.canbuy && e.countDown(a, t.goods.preselltimeend, "istime");
                }, 1e3);
                e.setData({
                    timer: c,
                    presellisstart: t.goods.presellisstart
                }), e.setData({
                    preselltimeend: t.goods.preselltimeend || t.goods.preselltimeend.getMonth() + "月" + t.goods.preselltimeend || t.goods.preselltimeend.getDate() + "日 " + t.goods.preselltimeend || t.goods.preselltimeend.getHours() + ":" + t.goods.preselltimeend || t.goods.preselltimeend.getMinutes() + ":" + t.goods.preselltimeend || t.goods.preselltimeend.getSeconds(),
                    presellsendstatrttime: t.goods.presellsendstatrttime || t.goods.presellsendstatrttime.getMonth() + "月" + t.goods.presellsendstatrttime || t.goods.presellsendstatrttime.getDate() + "日"
                });
            }
            t.goods.getComments > 0 && s.get("goods/get_comments", {
                id: e.data.options.id
            }, function (t) {
                e.setData({
                    commentObj: t
                });
            }), t.goods.fullbackgoods && e.setData({
                fullbackgoods: t.goods.fullbackgoods
            });
            var g = e.data.fullbackgoods;
            if (void 0 != g) {
                var m = g.maxfullbackratio, h = g.maxallfullbackallratio, m = Math.round(m), h = Math.round(h);
                e.setData({
                    maxfullbackratio: m,
                    maxallfullbackallratio: h
                });
            }
            9 == t.goods.type && (e.setData({
                checkedDate: t.goods.nowDate
            }), e.show_cycelbuydate()), t.goods.seckillinfo && e.initSeckill(t.goods);
        });
    },
    initSeckill: function (t) {
        var e = this, a = parseInt(t.seckillinfo.status), s = t.seckillinfo.starttime, i = t.seckillinfo.endtime;
        if (-1 != a) {
            var n = 0, r = 0, c = o.globalData.approot;
            wx.request({
                url: c + "map.json",
                success: function (o) {
                    var c = new Date(o.header.Date) / 1e3;
                    n = 0 == a ? i - c : s - c, e.setData({
                        lasttime: n
                    }), clearInterval(e.data.timer), e.setTimer(t.seckillinfo), r = e.setTimerInterval(t.seckillinfo),
                        e.setData({
                            timer: r
                        });
                }
            });
        }
    },
    setTimer: function (t) {
        var e = this, a = 0;
        if (-1 != t.status && parseInt(e.data.lasttime) % 10 == 0) {
            var s = parseInt(t.status), i = t.starttime, n = t.endtime;
            if (-1 != s) {
                var r = o.globalData.approot;
                wx.request({
                    url: r + "map.json",
                    success: function (t) {
                        var o = new Date(t.header.Date) / 1e3;
                        a = 0 == s ? n - o : i - o, e.setData({
                            lasttime: a
                        });
                    }
                });
            }
        }
        a = parseInt(e.data.lasttime) - 1;
        var c = e.formatSeconds(a);
        e.setData({
            lasttime: a,
            hour: c.hour,
            min: c.min,
            sec: c.sec
        }), a <= 0 && e.onLoad();
    },
    setTimerInterval: function (t) {
        var e = this;
        return setInterval(function () {
            e.setTimer(t);
        }, 1e3);
    },
    formatSeconds: function (t) {
        var e = parseInt(t), a = 0, o = 0;
        return e > 60 && (a = parseInt(e / 60), e = parseInt(e % 60), a > 60 && (o = parseInt(a / 60),
            a = parseInt(a % 60))), {
                hour: o < 10 ? "0" + o : o,
                min: a < 10 ? "0" + a : a,
                sec: e < 10 ? "0" + e : e
            };
    },
    countDown: function (t, e, a) {
        var o = parseInt(Date.now() / 1e3), s = (t > o ? t : e) - o, i = parseInt(s), n = Math.floor(i / 86400), r = Math.floor((i - 24 * n * 60 * 60) / 3600), c = Math.floor((i - 24 * n * 60 * 60 - 3600 * r) / 60), d = [n, r, c, Math.floor(i - 24 * n * 60 * 60 - 3600 * r - 60 * c)];
        if (this.setData({
            time: d
        }), "istime") {
            var l = "";
            t > o ? l = "距离限时购开始" : t <= o && e > o ? l = "距离限时购结束" : (l = "活动已经结束，下次早点来~",
                this.setData({
                    istime: 0
                })), this.setData({
                    istimeTitle: l
                });
        }
    },
    cityPicker: function (t) {
        var e = this;
        t.currentTarget.dataset.tap;
        wx.navigateTo({
            url: "/pages/goods/region/index?id=" + e.data.goods.id + "&region=" + e.data.goods.citys.citys + "&onlysent=" + e.data.goods.citys.onlysent
        });
    },
    giftPicker: function () {
        this.setData({
            active: "active",
            gift: !0
        });
    },
    couponPicker: function () {
        this.setData({
            active: "active",
            showcoupon: !0
        });
    },
    couponrecived: function (t) {
        var e = t.currentTarget.dataset.id, a = this;
        s.post("goods.pay_coupon", {
            id: e
        }, function (t) {
            console.log(t), 0 == t.error ? (a.setData({
                showcoupon: !1,
                active: ""
            }), i.toast(a, "已领取")) : i.toast(a, t.message);
        });
    },
    selectPicker: function (t) {
        var e = this, a = t.currentTarget.dataset.time, o = t.currentTarget.dataset.timeout;
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
    specsTap: function (t) {
        var e = this;
        c.specsTap(t, e);
    },
    emptyActive: function () {
        this.setData({
            active: "",
            slider: "out",
            tempname: "",
            showcoupon: !1,
            gift: !1,
            cycledate: !1
        });
    },
    buyNow: function (t) {
        var e = this;
        c.buyNow(t, e, "goods_detail", inviteid);
    },
    getCart: function (t) {
        var e = this;
        c.getCart(t, e);
    },
    select: function () {
        var t = this, e = t.data.optionid;
        t.data.diyform;
        u > 0 && 0 == e ? i.toast(t, "请选择规格") : this.setData({
            active: "",
            slider: "out",
            isSelected: !0,
            tempname: ""
        });
    },
    inputNumber: function (t) {
        var e = this;
        c.inputNumber(t, e);
    },
    number: function (t) {
        var e = this;
        c.number(t, e);
    },
    onPullDownRefresh: function () {
        var t = this;
        t.startTimer(second_time - timestampcount);
    },
    onLoad: function (t) {
        var k = this
        s.get("version/appversion", {
        }, function (eve) {
            console.log(eve)
            // if (eve.app_version == "devtools" || eve.app_version > 0) {//开发者工具|正式版
            //     version = 1;
            // }
            if ((eve.app_version == "devtools" || eve.app_version > 0) && eve.goodsshare == 1) { //开发者工具|正式版
                version = 1;
                k.setData({
                    shareDis: 'block'
                    // storedisp: 'none'
                })
            } else if ((eve.app_version == "devtools" || eve.app_version > 0) && eve.goodsshare == 0) { //开发者工具|正式版
                version = 0;
                k.setData({
                    // shareDis: 'none'
                    // storedisp: 'none'
                })
            }
            var reg = /test/;
            if (eve.app_version == 0 || reg.test(userinfo.nickName)) {//体验版，开发版，审核版
                version = 0;
                k.setData({
                    //   rewardDis:'none',
                    listDis: 'none'
                })
            }
        })

        s.get("goods/poster/sharegoodsimg", {
            id: t.id,
        }, function (a) {
            console.log(a)
            goodImg = a.url
        })
        // console.log(reward)
        wx.login({
            success: function (a) {
                a.code ? s.post("wxapp.login", {
                    code: a.code
                }, function (a) {
                    console.log(a)
                    sessionKey = a.session_key
                }) : s.alert("获取用户登录态失败:" + a.errMsg);

            }
        })
        var e = this;
        s.get("member/index/get_mobile", {
            openid: openid,
        }, function (t) {
            console.log(t)
            phoneerror = t.error
            if (t.error == 1) {
                console.log("未添加手机号")
               
            } else {
                console.log("已添加手机号")
                e.setData({
                    notaddDis: "none",
                    addDis: 'block'
                })
            }
        })
        console.log(t)
        // 商品id
        productid = t.id
        console.log(productid)

        s.get("black", {}, function (t) {
            t.isblack && wx.showModal({
                title: "无法访问",
                content: "您在商城的黑名单中，无权访问！",
                success: function (t) {
                    t.confirm && this.close(), t.cancel && this.close();
                }
            });
        }), n.get(this, "goodsdetail", function (t) {
            var a = t.diypage.items;
            for (var o in a) "copyright" == a[o].id && e.setData({
                copyright: a[o]
            });
        }), t = t || {};
        var a = decodeURIComponent(t.scene);
        console.log('detail-paoku')
        console.log(a)
        if (!t.id && a) {
            var i = s.str2Obj(a);
            t.id = i.id, i.mid && (t.mid = i.mid);
            console.log(a)
            console.log(t)
            console.log(t.mid)
        }
        console.log(t.mid)
        goodsid = t.id;
        console.log('goosid')
        console.log(goodsid)
        if (t.mid == undefined || !t.mid) {
            console.log('没有mid')
            console.log(o.getCache('userinfo'))
            var userinfo = o.getCache('userinfo');
            t.mid = sharemid = userinfo.id;
            inviteid=userinfo.agentid
        } else {
            console.log('有mid')
            sharemid = t.mid;
            inviteid=t.mid
            s.get("myown/goodshare/click", {
                goodid: goodsid,
                openid: openid,
                share_id: sharemid
            }, function (e) {
                console.log(e)
                console.log('用户点击详情页')
            })
        }
        o.setCache("sharemid", sharemid, 7200 * 24);
        this.setData({
            id: t.id
        }), o.url(t), wx.getSystemInfo({
            success: function (t) {
                e.setData({
                    windowWidth: t.windowWidth,
                    windowHeight: t.windowHeight
                });
            }
        }), e.setData({
            uid: t.id
        });
        o.getUserInfo(function () {
            e.setData({
                options: t
            }), wx.getSystemInfo({
                success: function (t) {
                    e.setData({
                        advWidth: t.windowWidth
                    }), console.log(t.windowHeight);
                }
            }), e.setData({
                success: !0,
                cover: !0,
                showvideo: !0
            }), e.getDetail(t), setTimeout(function () {
                e.setData({
                    areas: o.getCache("cacheset").areas
                });
            }, 3e3);
        }, function () {
            "" == o.getCache("userinfo") && o.getUserInfo();
        });
    },
    show_cycelbuydate: function () {
        var t = this, e = g.getCurrentDayString(this, t.data.showDate), a = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        t.setData({
            currentObj: e,
            currentDate: e.getFullYear() + "年" + (e.getMonth() + 1) + "月" + e.getDate() + "日 " + a[e.getDay()],
            currentYear: e.getFullYear(),
            currentMonth: e.getMonth() + 1,
            currentDay: e.getDate(),
            initDate: Date.parse(e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate()),
            checkedDate: Date.parse(e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate()),
            maxday: t.data.scope
        });
    },
    package: function () {
        var t = this;
        s.get("package.get_list", {
            goodsid: this.data.packagegoodsid
        }, function (e) {
            console.log(e.list[0]), t.setData({
                packageList: e.list[0]
            });
        });
    },
    onShow: function () {
        var t = this;
        o.getCache("isIpx") ? t.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar"
        }) : t.setData({
            isIpx: !1,
            iphonexnavbar: ""
        }), wx.getStorage({
            key: "mydata",
            success: function (e) {
                wx.removeStorage({
                    key: "mydata",
                    success: function (t) { }
                }), t.getDetail(e.data), wx.pageScrollTo({
                    scrollTop: 0
                });
            }
        }), wx.getSetting({
            success: function (e) {
                var a = e.authSetting["scope.userInfo"];
                if (a != undefined && a && a != '') {
                    t.setData({
                        limits: a
                    });
                } else {
                    reurl = '/pages/goods/detail/index?id=' + goodsid + '&sharemid=' + sharemid + '&mid=' + sharemid;
                    wx.redirectTo({
                        url: "/pages/message/auth/index?refrom=goods&id=" + goodsid + "&mid=" + sharemid + "&reurl=" + reurl
                    })
                }

            }
        });
        s.get("goods.get_end", {
            id: goodsid
        }, function (e) {
           console.log(e)
            var TIME = util.formatTime(new Date());
            var timestamp = Date.parse(new Date());
            timestampcount = timestamp / 1000
            console.log(timestampcount)
           if(e.status==2){
            //    2为秒杀中
               t.setData({
                   seckillDis:'block'
               })
               second_time = e.result.end
               console.log(second_time)
               t.startTimer(second_time - timestampcount);
           }
           else if(e.status==1){
            //1为秒杀未开始
               t.setData({
                   seckillDis: 'block'
               })
               second_time = e.result.start
               t.startTimer(second_time - timestampcount);
           }else if(e.status==4){
               t.setData({
                   seckillDis: 'none'
               })
           }
        });  
    },
    startTimer: function (currentstartTimer) {
        clearInterval(interval);
        interval = setInterval(function () {
            // 秒数
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
                countDownDay: dayStr,
                countDownHour: hrStr,
                countDownMinute: minStr,
                countDownSecond: secStr,
            });
            currentstartTimer--;
            if (currentstartTimer <= 0) {
                clearInterval(interval);
                this.setData({
                    countDownHour: '00',
                    countDownMinute: '00',
                    countDownSecond: '00',
                });
            }
        }.bind(this), 1000);
    },
    onChange: function (t) {
        return r.onChange(this, t);
    },
    DiyFormHandler: function (t) {
        return r.DiyFormHandler(this, t);
    },
    selectArea: function (t) {
        return r.selectArea(this, t);
    },
    bindChange: function (t) {
        return r.bindChange(this, t);
    },
    onCancel: function (t) {
        return r.onCancel(this, t);
    },
    onConfirm: function (t) {
        return r.onConfirm(this, t);
    },
    getIndex: function (t, e) {
        return r.getIndex(t, e);
    },
    onShareAppMessage: function (res) {
        var that = this;
        that.setData({
            closeBtn: !1
        })
        return {
            title: that.data.goods.title,
            path: "/pages/goods/detail/index?id=" + this.data.options.id + "&mid=" + sharemid,
            imageUrl: goodImg,
            success: function (res) {
                // 转发成功

                that.shareClick();
            },
            fail: function (res) {
                // 转发失败
            }
        }
    },

    showpic: function () {
        this.setData({
            showpic: !0,
            cover: !1,
            showvideo: !1
        }), this.videoContext = wx.createVideoContext("myVideo"), this.videoContext.pause();
    },
    showvideo: function () {
        this.setData({
            showpic: !1,
            showvideo: !0
        }), this.videoContext = wx.createVideoContext("myVideo"), this.videoContext.play();
    },
    startplay: function () {
        this.setData({
            cover: !1
        }), this.videoContext = wx.createVideoContext("myVideo"), this.videoContext.play();
    },
    bindfullscreenchange: function (t) {
        1 == t.detail.fullScreen ? this.setData({
            success: !1
        }) : this.setData({
            success: !0
        });
    },
    phone: function () {
        var t = this.data.phonenumber + "";
        wx.makePhoneCall({
            phoneNumber: t
        });
    },
    sharePoster: function () {
        console.log('用户点击海报分享')
        console.log(productid)
        s.get("myown/goodshare/share", {
            goodid: productid,
            openid: openid
        }, function (a) {
            console.log(a)
            console.log('haibao分享')
            console.log("aaaaaaaaaaaaaaa")
        })
        wx.navigateTo({
            url: "/pages/goods/poster/poster?id=" + this.data.uid
        });

    },
    // 微信分享
    shareweixin: function () {
        console.log('用户点击微信分享')
        s.get("myown/goodshare/share", {
            goodid: productid,
            openid: openid
        }, function (a) {
            console.log(a)
            console.log('weixin分享')
            console.log("eeeeeeee")
        })
    },
    closeBtn: function () {
        this.setData({
            closeBtn: !1
        });
    },
    onHide: function () {
        this.setData({
            closeBtn: !1
        });
    },

    addshow: function () {
        console.log('1')
        this.setData({
            closeBtn: !0
        });
    },
    nav: function () {
        this.setData({
            nav_mask: !this.data.nav_mask
        });
    },
    nav2: function () {
        this.setData({
            nav_mask2: !this.data.nav_mask2
        });
    },
    changevoice: function () {
        this.data.sound ? this.setData({
            sound: !1,
            soundpic: !0
        }) : this.setData({
            sound: !0,
            soundpic: !1
        });
    },
    radioChange: function (t) {
        this.setData({
            giftid: t.currentTarget.dataset.giftgoodsid,
            gift_title: t.currentTarget.dataset.title
        });
    },
    activityPicker: function () {
        this.setData({
            fadein: "in"
        });
    },
    actOutPicker: function () {
        this.setData({
            fadein: ""
        });
    },
    hintclick: function () {
        wx.openSetting({
            success: function (t) { }
        });
    },
    cancelclick: function () {
        this.setData({
            modelShow: !1
        });
    },
    confirmclick: function () {
        this.setData({
            modelShow: !1
        }), wx.openSetting({
            success: function (t) { }
        });
    },
    sendclick: function () {
        wx.navigateTo({
            url: "/pages/map/index"
        });
    },
    syclecancle: function () {
        this.setData({
            cycledate: !1
        });
    },
    sycleconfirm: function () {
        this.setData({
            cycledate: !1
        });
    },
    editdate: function (t) {
        g.setSchedule(this), this.setData({
            cycledate: !0
        });
    },
    doDay: function (t) {
        g.doDay(t, this);
    },
    selectDay: function (t) {
        g.selectDay(t, this), g.setSchedule(this);
    },
    play: function (t) {
        var e = t.target.dataset.id, a = this.data.audiosObj[e] || !1;
        if (!a) {
            a = wx.createInnerAudioContext("audio_" + e);
            var o = this.data.audiosObj;
            o[e] = a, this.setData({
                audiosObj: o
            });
        }
        var s = this;
        a.onPlay(function () {
            var t = setInterval(function () {
                var o = a.currentTime / a.duration * 100 + "%", i = Math.floor(Math.ceil(a.currentTime) / 60), n = (Math.ceil(a.currentTime) % 60 / 100).toFixed(2).slice(-2), r = Math.ceil(a.currentTime);
                i < 10 && (i = "0" + i);
                var c = i + ":" + n, d = s.data.audios;
                d[e].audiowidth = o, d[e].Time = t, d[e].audiotime = c, d[e].seconds = r, s.setData({
                    audios: d
                });
            }, 1e3);
        });
        var i = t.currentTarget.dataset.audio, n = t.currentTarget.dataset.time, r = t.currentTarget.dataset.pausestop, c = t.currentTarget.dataset.loopplay;
        0 == c && a.onEnded(function (t) {
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
    pauseOther: function (t) {
        var e = this;
        d.each(this.data.audiosObj, function (a, o) {
            if (a != t) {
                o.pause();
                var s = e.data.audios;
                s[a] && (s[a].status = !1, e.setData({
                    audios: s
                }));
            }
        });
    }
}, t(a, "onHide", function () {
    this.pauseOther();
}), t(a, "onUnload", function () {
    this.pauseOther();
    
    clearInterval(interval);
    console.log('asc');

}), t(a, "navigate", function (t) {
    var e = t.currentTarget.dataset.url, a = t.currentTarget.dataset.phone, o = t.currentTarget.dataset.appid, s = t.currentTarget.dataset.appurl;
    e && wx.navigateTo({
        url: e
    }), a && wx.makePhoneCall({
        phoneNumber: a
    }), o && wx.navigateToMiniProgram({
        appId: o,
        path: s
    });
}), t(a, "userinfo", function (t) {
    var e = this;
    o.getUserInfo(function () {
        e.onShow();
    });
}), t(a, "close", function () {
    o.globalData.flag = !0, wx.reLaunch({
        url: "/pages/index/index"
    });
}), a));