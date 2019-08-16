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
Page({
    data: {
        globalimg: e.globalData.appimg,
        // 组件所需的参数
        nvabarData: {
            showCapsule: 0,
            title: '个人中心',
            height: e.globalData.height * 2 + 20,
        },
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
        conbind: '',
        credit4: '',
        cometotal:"",
        calorietotal: ""
    },
    swiperChange(e) {
        let current = e.detail.current;
        let that = this;
        that.setData({
            swiperCurrent: current,
        })
    },
    //轮播图点击事件
    swipclick: function(e) {
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
    onLoad: function(a) {
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
        }), i.get(this, "member", function(e) {}), "" == e.getCache("userinfo") && wx.redirectTo({
            url: "/pages/message/auth/index"
        });
    },
    getInfo: function() {
        var e = this;
        a.get("member", {}, function(a) {
            console.log(a), 1 == a.isblack && wx.showModal({
                title: "无法访问",
                content: "您在商城的黑名单中，无权访问！",
                success: function(a) {
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
    onShow: function() {
        this.getInfo();
        var e = this;
        wx.getSetting({
            success: function(a) {
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
       e.getList();
    },
    getList:function(){
        var b = this
        a.get("myown/devote/msg", {
            openid: userinfo.openid,
        }, function (e) {
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
        p.get("member", {}, function (i) {
            console.log(i)
            b.setData({
                cometotal: i.come_total,
                calorietotal: i.calorie_total
            })
        })
    },
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
    onHide: function() {
    },
    onUnload: function() {
    },
    onPullDownRefresh: function() {
        // 显示顶部刷新图标
        wx.showNavigationBarLoading();
        wx.showToast({
            icon: 'loading',
            title:'加载中'
        })
        this.getList();
        wx.stopPullDownRefresh();
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
    }
});