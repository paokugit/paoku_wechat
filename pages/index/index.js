function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}
var a, e, i = getApp(),
    s = i.requirejs("core"),
    n = i.requirejs("wxParse/wxParse"),
    o = i.requirejs("biz/diypage"),
    r = i.requirejs("biz/diyform"),
    d = i.requirejs("biz/goodspicker"),
    c = (i.requirejs("foxui"),
        i.requirejs("jquery"));
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
                    credit1: e.result.credit1,
                    todaystep: e.result.todaystep,
                    jindu: e.result.jindu
                });
            }

        });
        o.get(this, "home", function(a) {
            t.getDiypage(a), 0 == a.error && wx.stopPullDownRefresh();
        });
    },

    data: (a = {
            topdisp: 'none',
            globalimg: i.globalData.appimg,
            // 组件所需的参数
            nvabarData: {
                showCapsule: 0,
                title: '跑库',
                height: i.globalData.height * 2 + 20
            },
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
            credit1: 0,
            mp3_url: '',
            indexdisp: 'none',
            // indexdisp: 'block',
            circleDis: 'none',
            condisp: 'block',
            merchdisp: 'block',
            storedisp: 'block',
            bindDis: 'none',
            giftDis: 'none',
            // rewarddisp:'none',
            screenWidth: '',
            helpstep: '',
            jindu: 100,
            district: '',
            city: '',
            noticelist: [],
            avamessage: '',

            home_icon: [],
            backgroundimg: '',
        }, t(a, "total", 1), t(a, "active", ""), t(a, "slider", ""), t(a, "tempname", ""),
        t(a, "buyType", ""), t(a, "areas", []), t(a, "closeBtn", !1), t(a, "soundpic", !0),
        t(a, "modelShow", !1), t(a, "limits", !0), t(a, "result", {}), t(a, "showcoupon", !1),
        t(a, "showcoupontips", !1), t(a, "topmenu", {}), t(a, "topmenuDataType", ""), t(a, "tabbarData", {}),
        t(a, "tabbarDataType", ""), t(a, "istopmenu", !1), t(a, "seckillinfo", {}), t(a, "timer", 0),
        t(a, "lasttime", 0), t(a, "hour", "-"), t(a, "min", "-"), t(a, "sec", "-"), a),
    getShop: function() {
        var t = this;
        s.get("shop/get_shopindex", {}, function(a) {
            n.wxParse("wxParseData", "html", a.copyright, t, "5"), t.setData({
                shop: a
            });
        });
    },
    bindPhone: function() {
        wx.navigateTo({
            url: '/pages/member/bind/index?param=' + 1,

        })
    },
    // 进入商城
    entrystore: function() {
        wx.switchTab({
            url: '/pages/index/huodong',
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
    products: function() {
        wx.navigateTo({
            url: '/pages/goods/index/index',
        })
    },
    // 卡路里明细
    kllbtn: function() {
        wx.navigateTo({
            url: '/pages/member/log/bushu',
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
    get_list: function() {
        var t = this;

        t.setData({
            loading: !0
        }), s.get("goods/get_list", {
            openid: userinfo.openid,
            deduct: 1,
            page: t.data.page
        }, function(e) {
            console.log(e)
            if (t.data.page >= 5) {
                t.setData({
                    topdisp: 'block'
                })
            }
            0 == e.error ? (t.setData({
                loading: !1,
                show: !0,
                total: e.total,
                empty: !0
            }), e.list.length > 0 && t.setData({
                page: t.data.page + 1,
                list: t.data.list.concat(e.list)
            }), e.list.length < e.pagesize && t.setData({
                loaded: !0
            })) : a.toast(e.message, "loading");
        }, this.data.show);
    },
    onLoad: function(t) {
        console.log('运动日记')
        console.log(t)
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
                    wx.redirectTo({
                        url: "/pages/message/auth/index?refrom=index&reurl=" + reurl
                    })
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
        }, 3e3), i.url(t), o.get(this, "home", function(t) {
            if (a.getDiypage(t), void 0 != a.data.startadv && "" != a.data.startadv) {
                0 != a.data.startadv.status && "" != a.data.startadv || wx.getSetting({
                    success: function(t) {
                        t.authSetting["scope.userInfo"] && a.get_nopayorder();
                    }
                });
                var e = a.data.startadv.params;
                if ("default" == e.style) {
                    var s = e.autoclose;
                    ! function t(e) {
                        a.setData({
                            clock: s
                        }), s <= 0 ? a.setData({
                            adveradmin: !1
                        }) : setTimeout(function() {
                            s -= 1, t(e);
                        }, 1e3);
                    }(a);
                }
                if (1 == e.showtype) {
                    var n = 1e3 * e.showtime * 60,
                        o = i.getCache("startadvtime"),
                        r = +new Date(),
                        d = !0;
                    a.setData({
                        adveradmin: !0
                    }), o && r - o < n && (d = !1), a.setData({
                        adveradmin: d
                    }), d && i.setCache("startadvtime", r);
                }
                a.data.startadv.status;
            }
        }), a.setData({
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
                    credit1: ee.result.credit1,
                    todaystep: ee.result.todaystep
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
        s.get("bushu", {}, function(tt) {
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
        s.get("myown.index.opt", {
            id: 1
        }, function(e) {
            console.log(e);
            a.setData({
                home_icon: e.result.icon,
                backgroundimg: e.result.backgroup
            })
        })
    },
    onHide: function() {
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
            s.get("getkll", {
                id: eee,
                source: aaa,
                step: curstep
            }, function(t) {
                console.log(t)
                ttt.setData({
                    is_receive: 1
                });
                s.get("bushu", {}, function(t) {
                    if (t.error == 0) {
                        // console.log(t.result);
                        ttt.setData({
                            my_currency: t.result,
                            mp3_url: t.url
                        });
                    }

                });
                s.get("userinfo", {}, function(e) {
                    if (e.status == 1) {
                        ttt.setData({
                            credit1: e.result.credit1,
                            todaystep: e.result.todaystep
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
            console.log(e)
            if (e.status == 1) {
                if (e.result.is_show == 1) {
                    t.setData({
                        giftDis: 'none'
                    })
                } else if (e.result.is_show == 0) {
                    t.setData({
                        giftDis: 'none'
                    })
                }
            }

        });

        s.get("userinfo", {}, function(e) {
            if (e.status == 1) {
                t.setData({
                    credit1: e.result.credit1,
                    todaystep: e.result.todaystep
                });
            }

        });
        s.get("changce/merch/draw_rank", {}, function(e) {
            console.log(e)
            if (e.status == 1) {
                t.setData({
                    noticelist: e.result.log
                })
            }
        });
        s.get("bushu", {}, function(tttt) {
            if (tttt.error == 0) {
                console.log(tttt.result);
                if (tttt.result.length <= 1) {
                    t.setData({
                        circleDis: 'block'
                    })
                }
                // t.setData({
                //     my_currency: t.result,
                //     mp3_url: t.url
                // });
            }
        });
        // 是否绑定手机号
        s.get("myown/bindmobile/isbind", {
            openid: userinfo.openid
        }, function(e) {
            console.log(e)
            if (e.error == 0) {
                if (e.message.bind == 0) {
                    t.setData({
                        bindDis: 'block'
                    })
                } else if (e.message.bind == 1) {
                    t.setData({
                        bindDis: 'none'
                    })
                }
            }

        });
        // 平台活跃人数
        s.get("help/index/get_member_count", {}, function(e) {
            console.log(e)
            t.setData({
                avamessage: e.result.message
            })
        });
        // 获取本人坐标
        var mypos = i.getCache("mypos");
        if (!mypos) {
            wx.getLocation({
                type: 'wgs84',
                success: function(res) {
                    i.setCache("mypos", {
                        lat: res.latitude,
                        lng: res.longitude,
                        speed: res.speed,
                        accuracy: res.accuracy
                    }, 7200);
                },
                fail: function(res) {}
            })
        }
        t.getList();
        t.getShop(), t.get_hasnewcoupon(), t.get_cpinfos(), wx.getSetting({
            success: function(a) {
                var e = a.authSetting["scope.userInfo"];
                // console.log(e), 
                t.setData({
                    limits: e
                });
            }
        });
        var shopname = e.shopname || "商城首页";
        t.data.pages && "" != t.data.pages.title && (shopname = t.data.diytitle), wx.setNavigationBarTitle({
            title: shopname
        }), t.data.pages && wx.setNavigationBarColor({
            frontColor: t.data.pages.titlebarcolor,
            backgroundColor: t.data.pages.titlebarbg
        }), t.setData({
            // screenWidth: a.windowWidthF
        });
    },
    goodsicon: function(t) {
        this.setData({
            iconheight: t.detail.height,
            iconwidth: t.detail.width
        });
    },
    getList: function() {
        var tt = this;
        wx.login({
            success: function(a) {
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
                    wx.getWeRunData({
                        success(res) {
                            res.sessionKey = a.session_key;
                            res.openid = i.openid;
                            s.post('wxapp/urundata', {
                                res
                            }, function(e) {

                            })
                        }
                    });
                }) : s.alert("获取用户登录态失败:" + a.errMsg);
            },
            fail: function() {
                s.alert("获取用户信息失败!");
            }
        })
        // console.log('获取附近商家')
        var newpos = i.getCache("mypos");
        // 门店服务
        s.get("changce/merch/get_from_store", {
            page: 1,
            lat: newpos.lat,
            lng: newpos.lng,
        }, function(e) {
            console.log(e)
            var i = {
                loading: false,
                result: e.result,
                merchInfo: e.result.merchInfo,
                goodlist: e.result.goodList.list.slice(0, 3)
            }
            tt.setData(i)
        })
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
    getDiypage: function(t) {
        var a = this;
        c.each(t.diypage.items, function(t, e) {
            if ("topmenu" == e.id)
                if (a.setData({
                        topmenu: e
                    }), void 0 == e.data[0]) i = "";
                else {
                    var i = e.data[0].linkurl;
                    s.get("diypage/getInfo", {
                        dataurl: i
                    }, function(t) {
                        e.data[0].data = t.goods.list;
                    });
                }
            if ("seckillgroup" == e.id) {
                var n = {};
                n.status = e.data.status, n.endtime = e.data.endtime, n.starttime = e.data.starttime,
                    a.initSeckill(n);
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
    imagesHeight: function(t) {
        console.log(t)
        var a = t.detail.width,
            e = t.detail.height,
            i = t.target.dataset.type,
            s = this;
        wx.getSystemInfo({
            success: function(t) {
                s.data.result[i] = t.windowWidth / a * e, (!s.data[i] || s.data[i] && result[i] < s.data[i]) && s.setData({
                    result: s.data.result
                });
            }
        });
    },
    bindInput: function(t) {
        this.setData({
            inputValue: t.detail.value
        });
    },
    t1: function(t) {
        o.fixedsearch(this, t);
    },
    startplay: function(t) {
        var a = t.target.dataset.cover;
        this.setData({
            cover: a,
            showvideo: !0
        }), this.videoContext = wx.createVideoContext("Video"), this.videoContext.play();
    },
    unpaidcolse: function(t) {
        var a = "";
        a = "open" == t.target.dataset.type, this.setData({
            unpaid: a
        });
    },
    unpaidcolse2: function(t) {
        this.setData({
            unpaidhide: !0
        });
    },
    get_nopayorder: function() {
        var t = this;
        s.get("shop/get_nopayorder", {}, function(a) {
            1 == a.hasinfo && t.setData({
                nopaygoods: a.goods,
                nopaygoodstotal: a.goodstotal,
                nopayorder: a.order,
                unpaid: !0
            });
        });
    },
    get_hasnewcoupon: function() {
        var t = this;
        s.get("shop/get_hasnewcoupon", {}, function(a) {
            1 == a.hasnewcoupon && t.setData({
                showcoupontips: !0
            });
        });
    },
    get_cpinfos: function() {
        var t = this;
        s.get("shop/get_cpinfos", {}, function(a) {
            1 == a.hascpinfos && t.setData({
                showcoupon: !0,
                cpinfos: a.cpinfos
            });
        });
    },
    adverclose: function() {
        this.setData({
            adveradmin: !1
        }), this.get_nopayorder();
    },
    indexChangebtn: function(t) {
        var a = t.currentTarget.dataset.type;
        wx.navigateTo({
            url: a
        });
    }
}, t(e, "unpaidcolse", function(t) {
    var a = "";
    a = "open" == t.target.dataset.type, this.setData({
        unpaid: a
    });
}), t(e, "unpaidcolse2", function(t) {
    this.setData({
        unpaidhide: !0
    });
}), t(e, "selectPicker", function(t) {
    var a = this;
    wx.getSetting({
        success: function(e) {
            if (e.authSetting["scope.userInfo"]) {
                d.selectpicker(t, a, "goodslist"), a.setData({
                    cover: "",
                    showvideo: !1
                });
            } else a.setData({
                modelShow: !0
            });
        }
    });
}), t(e, "specsTap", function(t) {
    var a = this;
    d.specsTap(t, a);
}), t(e, "emptyActive", function() {
    this.setData({
        active: "",
        slider: "out",
        tempname: "",
        specsTitle: ""
    });
}), t(e, "buyNow", function(t) {
    var a = this;
    d.buyNow(t, a);
}), t(e, "getCart", function(t) {
    var a = this;
    d.getCart(t, a);
}), t(e, "select", function() {
    var t = this;
    d.select(t);
}), t(e, "inputNumber", function(t) {
    var a = this;
    d.inputNumber(t, a);
}), t(e, "number", function(t) {
    var a = this;
    d.number(t, a);
}), t(e, "onChange", function(t) {
    return r.onChange(this, t);
}), t(e, "DiyFormHandler", function(t) {
    return r.DiyFormHandler(this, t);
}), t(e, "selectArea", function(t) {
    return r.selectArea(this, t);
}), t(e, "bindChange", function(t) {
    return r.bindChange(this, t);
}), t(e, "onCancel", function(t) {
    return r.onCancel(this, t);
}), t(e, "onConfirm", function(t) {
    return r.onConfirm(this, t);
}), t(e, "getIndex", function(t, a) {
    return r.getIndex(t, a);
}), t(e, "changevoice", function() {
    this.data.sound ? this.setData({
        sound: !1,
        soundpic: !0
    }) : this.setData({
        sound: !0,
        soundpic: !1
    });
}), t(e, "phone", function() {
    var t = this.data.phonenumber + "";
    wx.makePhoneCall({
        phoneNumber: t
    });
}), t(e, "cancelclick", function() {
    this.setData({
        modelShow: !1
    });
}), t(e, "confirmclick", function() {
    this.setData({
        modelShow: !1
    }), wx.openSetting({
        success: function(t) {}
    });
}), t(e, "navigate", function(t) {
    var a = t.currentTarget.dataset.url,
        e = t.currentTarget.dataset.phone,
        i = t.currentTarget.dataset.appid,
        s = t.currentTarget.dataset.appurl;
    a && wx.navigateTo({
        url: a,
        fail: function() {
            wx.switchTab({
                url: a
            });
        }
    }), e && wx.makePhoneCall({
        phoneNumber: e
    }), i && wx.navigateToMiniProgram({
        appId: i,
        path: s
    });
}), t(e, "closecoupon", function() {
    this.setData({
        showcoupon: !1
    });
}), t(e, "closecoupontips", function() {
    this.setData({
        showcoupontips: !1
    });
}), t(e, "tabtopmenu", function(t) {
    console.log(t);
    var a = this,
        e = a.data.diypages,
        i = (e.items, t.currentTarget.dataset.id, t.currentTarget.dataset.url),
        n = t.currentTarget.dataset.type,
        o = a.data.topmenu,
        r = t.currentTarget.dataset.index;
    if (a.setData({
            topmenuindex: r
        }), "m0" == t.currentTarget.id && "" == i && s.get("diypage", {
            type: "home"
        }, function(t) {
            var e = t.diypage;
            c.each(e.items, function(t, a) {
                "topmenu" == a.id && (a.status = n);
            }), 0 == t.error && a.setData({
                diypages: t.diypage
            });
        }), "" != i && void 0 != i) {
        if (1 == i.indexOf("pages")) {
            var d = i.lastIndexOf("="),
                u = i.substring(d + 1, i.length);
            s.get("diypage", {
                id: u
            }, function(t) {
                if (0 == t.error) {
                    var e = [];
                    for (var i in t.diypage.items) e.push(t.diypage.items[i]);
                    e.unshift(o);
                    var s = new Object();
                    for (var r in e) s[r] = e[r], "topmenu" == e[r].id && (e[r].status = n);
                    t.diypage.items = s, a.setData({
                        diypages: t.diypage,
                        topmenuDataType: ""
                    });
                }
            });
        } else s.get("diypage/getInfo", {
            dataurl: i
        }, function(t) {
            a.data.topmenu;
            s.get("diypage", {
                type: "home"
            }, function(e) {
                var i = e.diypage;
                c.each(i.items, function(a, e) {
                    if ("topmenu" == e.id) {
                        e.status = n;
                        for (var i in e.data) i == n && (e.data[i].data = t.goods.list, t.goods.list.length <= 8 && (e.data[i].showmore = !0));
                    }
                }), 0 == e.error && a.setData({
                    diypages: e.diypage,
                    topmenuDataType: t.type
                });
            });
        });
        a.setData({
            diypages: e
        });
    }
}), t(e, "tabwidget", function(t) {
    var a = this,
        e = a.data.diypages,
        i = (e.items, t.currentTarget.dataset.id),
        n = t.currentTarget.dataset.url,
        o = t.currentTarget.dataset.type;
    "" != n && void 0 != n && s.get("diypage/getInfo", {
        dataurl: n
    }, function(t) {
        for (var s in e.items)
            if (s == i) {
                e.items[s].data[o].data = t.goods.list, e.items[s].data[o].type = t.type, e.items[s].type = t.type,
                    e.items[s].status = o, t.goods.list.length <= 8 && (e.items[s].data[o].showmore = !0);
                a.setData({
                    diypages: e
                });
            }
    });
}), t(e, "getstoremore", function(t) {
    var a = this,
        e = t.currentTarget.dataset.id,
        i = a.data.diypages;
    c.each(i.items, function(t, n) {
        if (t == e)
            if (void 0 == n.status || "" == n.status) {
                if (-1 != n.data[0].linkurl.indexOf("stores")) d = "stores";
                else d = "goods";
                var o = n.data[0].linkurl,
                    r = n.data[0].data.length;
                s.get("diypage/getInfo", {
                    dataurl: o,
                    num: r,
                    paramsType: d
                }, function(t) {
                    n.data[0].data = t.goods.list, console.error(t.goods), n.data[0].data.length == t.goods.count && (n.data[0].showmore = !0),
                        a.setData({
                            diypages: i
                        });
                });
            } else {
                if (-1 != n.data[n.status].linkurl.indexOf("stores")) d = "stores";
                else var d = "goods";
                var o = n.data[n.status].linkurl,
                    r = n.data[n.status].data.length;
                s.get("diypage/getInfo", {
                    dataurl: o,
                    num: r
                }, function(t) {
                    n.data[n.status].data = t.goods.list, console.error(t.goods.count), n.data[n.status].data.length == t.goods.count && (n.data[n.status].showmore = !0),
                        a.setData({
                            diypages: i
                        });
                });
            }
    });
}), t(e, "userinfo", function(t) {
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
}), t(e, "initSeckill", function(t) {
    var a = this,
        e = parseInt(t.status),
        s = t.starttime,
        n = t.endtime;
    if (-1 != e) {
        var o = 0,
            r = 0,
            d = i.globalData.approot;
        wx.request({
            url: d + "map.json",
            success: function(i) {
                var d = new Date(i.header.Date) / 1e3;
                o = 0 == e ? n - d : s - d, a.setData({
                    lasttime: o
                }), clearInterval(a.data.timer), a.setTimer(t), r = a.setTimerInterval(t), a.setData({
                    timer: r
                });
            }
        });
    }
}), t(e, "setTimer", function(t) {
    var a = this,
        e = 0;
    if (-1 != t.status && parseInt(a.data.lasttime) % 10 == 0) {
        var s = i.globalData.approot;
        wx.request({
            url: s + "map.json",
            success: function(i) {
                var s = new Date(i.header.Date) / 1e3;
                e = 0 == t.status ? t.endtime - s : t.starttime - s, a.setData({
                    lasttime: e
                });
            }
        });
    }
    e = parseInt(a.data.lasttime) - 1;
    var n = a.formatSeconds(e);
    a.setData({
        lasttime: e,
        hour: n.hour,
        min: n.min,
        sec: n.sec
    }), e <= 0 && a.onLoad();
}), t(e, "setTimerInterval", function(t) {
    var a = this;
    return setInterval(function() {
        a.setTimer(t);
    }, 1e3);
}), t(e, "formatSeconds", function(t) {
    var a = parseInt(t),
        e = 0,
        i = 0;
    return a > 60 && (e = parseInt(a / 60), a = parseInt(a % 60), e > 60 && (i = parseInt(e / 60),
        e = parseInt(e % 60))), {
        hour: i < 10 ? "0" + i : i,
        min: e < 10 ? "0" + e : e,
        sec: a < 10 ? "0" + a : a
    };
}), t(e, "cutGoods", function(t) {
    var a = this,
        e = t.currentTarget.dataset.type,
        i = t.currentTarget.dataset.num,
        s = t.currentTarget.dataset.id,
        n = a.data.diypages;
    for (var o in n.items)
        if (o == s) {
            var r = n.items[o].current || 0;
            "advance" == e ? r < i - 1 ? (n.items[o].current = r + 1, a.setData({
                diypages: n
            })) : (n.items[o].current = 0, a.setData({
                diypages: n
            })) : r > 0 ? (n.items[o].current = r - 1, a.setData({
                diypages: n
            })) : (n.items[o].current = i - 1, a.setData({
                diypages: n
            }));
        }
}), e));