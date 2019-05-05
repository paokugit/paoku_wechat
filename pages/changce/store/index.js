var t = getApp(), a = t.requirejs("core");

t.requirejs("jquery");

Page({
    data: {
        cates: [],
        cateid: 0,
        page: 1,
        loading: !1,
        loaded: !1,
        list: [],
        keyword: "",
        disopt: [],
        range: 0,
        selcity: "",
        selprovince: "",
        approot: t.globalData.approot
    },
    store: function(t) {
        wx.redirectTo({
            url: "/pages/index/store"
        });
    },
    onLoad: function(e) {
        var i = this;
        e.cateid && i.setData({
            cateid: e.cateid
        });
        var s = t.getCache("mypos");
        s ? (i.setData({
            mypos: s,
            firsttime: 1
        }), i.getList()) : wx.getLocation({
            type: "wgs84",
            success: function(a) {
                t.setCache("mypos", {
                    lat: a.latitude,
                    lng: a.longitude,
                    speed: a.speed,
                    accuracy: a.accuracy
                }, 7200), i.setData({
                    mypos: {
                        lat: a.latitude,
                        lng: a.longitude,
                        speed: a.speed,
                        accuracy: a.accuracy
                    },
                    firsttime: 1
                }), i.getList();
            },
            fail: function(t) {
                a.alert("取消位置信息将无法定位门店距离！"), i.setData({
                    mypos: {
                        lat: "",
                        lng: ""
                    },
                    firsttime: 0
                }), i.getList();
            }
        });
    },
    getList: function() {
        var t = this;
        a.loading(), this.setData({
            loading: !0,
            loaded: !1
        }), a.get("changce/store/get_list", {
            page: this.data.page,
            cateid: this.data.cateid,
            keyword: this.data.keyword,
            lat: this.data.mypos.lat,
            lng: this.data.mypos.lng,
            range: this.data.range,
            province: this.data.selprovince,
            city: this.data.selcity,
            firsttime: this.data.firsttime
        }, function(e) {
            var i = {
                loading: !1,
                total: e.total,
                pagesize: e.pagesize,
                cates: e.cates,
                disopt: e.disopt,
                citysel: e.citysel,
                citys: e.citys,
                selcity: e.selcity ? e.selcity : t.data.selcity
            };
            e.list.length > 0 && (i.page = t.data.page + 1, i.list = t.data.list.concat(e.list), 
            e.list.length < e.pagesize && (i.loaded = !0), t.setSpeed(e.list)), t.setData(i), 
            a.hideLoading();
        });
    },
    setSpeed: function(t) {
        if (t && !(t.length < 1)) for (var a in t) {
            var e = t[a];
            if (!isNaN(e.lastratio)) {
                var i = e.lastratio / 100 * 2.5, s = wx.createContext();
                s.beginPath(), s.arc(34, 35, 30, .5 * Math.PI, 2.5 * Math.PI), s.setFillStyle("rgba(0,0,0,0)"), 
                s.setStrokeStyle("rgba(0,0,0,0.2)"), s.setLineWidth(4), s.stroke(), s.beginPath(), 
                s.arc(34, 35, 30, .5 * Math.PI, i * Math.PI), s.setFillStyle("rgba(0,0,0,0)"), s.setStrokeStyle("#ffffff"), 
                s.setLineWidth(4), s.setLineCap("round"), s.stroke();
                var o = "coupon-" + e.id;
                wx.drawCanvas({
                    canvasId: o,
                    actions: s.getActions()
                });
            }
        }
    },
    onReachBottom: function() {
        this.data.loaded || this.data.list.length == this.data.total || this.getList();
    }
});