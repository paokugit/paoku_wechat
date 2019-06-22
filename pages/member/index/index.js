var e = getApp(),
    a = e.requirejs("core"),
    p = e.requirejs("core"),
    t = e.requirejs("wxParse/wxParse"),
    i = e.requirejs("biz/diypage"),
    s = e.requirejs("jquery");
var f = getApp();
var userinfo = f.getCache('userinfo');
var formid = ''
var navigaterurl = ''
var bindcount = ''
// var conbind=''
Page({
    data: {
        globalimg: e.globalData.appimg,
        imgUrls: [],
        imgUrls: [],
        indicatorDots: false,
        autoplay: true,
        circular: true,
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
        conbind:'',
        credit4:''
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
    swipclick: function (e) {
        console.log(e)
        navigaterurl = e.currentTarget.dataset.url
        console.log(this.data.swiperCurrent)
        wx.switchTab({
            url: navigaterurl,
        })
    },
    form_submit: function (e) {
        console.log(e.detail.formId);
        formid = e.detail.formId
        a.get("message/collect", {
            openid: userinfo.openid,
            formid: formid
        }, function (event) {
            console.log(event)
        })

    },
    opengxz:function(){
        wx.navigateTo({
            url: '/pages/contribute/contribute/contribute',
        })
    },
    bindphone: function () {
        if (bindcount == 1) {
            wx.navigateTo({
                url: '/pages/member/bind/index',
            })
        } else {
            wx.showModal({
                title: '提示',
                content: '您已经绑定过手机号',
            })
        }

    },
    onLoad: function (a) {
        p.get("member", {}, function (i) {
            console.log(i)
            bindcount = i.needbind
            console.log(bindcount)
        })
        e.getCache("userinfo")
        var t = this;
        e.url(a), wx.getSystemInfo({
            success: function (e) {
                var a = e.windowWidth / 1.7;
                t.setData({
                    windowWidth: e.windowWidth,
                    windowHeight: e.windowHeight,
                    swiperheight: a
                });
            }
        }), i.get(this, "member", function (e) { }), "" == e.getCache("userinfo") && wx.redirectTo({
            url: "/pages/message/auth/index"
        });
    },
    getInfo: function () {
        var e = this;
        a.get("member", {}, function (a) {
            console.log(a), 1 == a.isblack && wx.showModal({
                title: "无法访问",
                content: "您在商城的黑名单中，无权访问！",
                success: function (a) {
                    a.confirm && e.close(), a.cancel && e.close();
                }
            }), 0 != a.error ? wx.redirectTo({
                url: "/pages/message/auth/index"
            }) : e.setData({
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
                    url: "/pages/message/auth/index"
                });
            }
        });
        var b=this
        a.get("myown/devote/msg", {
            openid: userinfo.openid,
        }, function (e) {
            console.log(e)
            if(e.error==0){
                b.setData({
                    conbind:e.message.bind,
                    credit4:e.message.credit4
                })
            }
        })
    },
    onShareAppMessage: function (res) {
        // return s.onShareAppMessage();
        var that = this;
        return {
            title: '原来微信步数可以当钱用，快来和我一起薅羊毛',
            path: '/pages/index/index?id=' + that.data.scratchId,
            success: function (res) {
                // 转发成功
                that.shareClick();
            },
            fail: function (res) {
                // 转发失败
            }
        }
    },
    cancelclick: function () {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    confirmclick: function () {
        wx.openSetting({
            success: function (e) { }
        });
    },
    phone: function () {
        var e = this.data.phonenumber + "";
        wx.makePhoneCall({
            phoneNumber: e
        });
    },
    play: function (e) {
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
        t.onPlay(function () {
            var e = setInterval(function () {
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
        0 == u && t.onEnded(function (e) {
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
    pauseOther: function (e) {
        var a = this;
        s.each(this.data.audiosObj, function (t, i) {
            if (t != e) {
                i.pause();
                var s = a.data.audios;
                s[t] && (s[t].status = !1, a.setData({
                    audios: s
                }));
            }
        });
    },
    onHide: function () {
        this.pauseOther();
    },
    onUnload: function () {
        this.pauseOther();
    },
    navigate: function (e) {
        var a = e.currentTarget.dataset.url,
            t = e.currentTarget.dataset.phone,
            i = e.currentTarget.dataset.appid,
            s = e.currentTarget.dataset.appurl;
        a && wx.navigateTo({
            url: a,
            fail: function () {
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
    close: function () {
        e.globalDataClose.flag = !0, wx.reLaunch({
            url: "/pages/index/index"
        });
    }
});