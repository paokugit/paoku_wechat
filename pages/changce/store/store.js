var t = getApp(), e = t.requirejs("core"), a = (t.requirejs("jquery"), t.requirejs("biz/diyform")), i = t.requirejs("biz/goodspicker");

t.requirejs("foxui"), Page({
    data: {
        selectIdx: 0,
        cates: [],
        showcover: 0,
        store: [],
        pcate: 0,
        ccate: 0,
        page: 1,
        loading: !1,
        loaded: !1,
        list: [],
        intro: 0,
        limits: 1,
        modelShow: !1,
        cartcount: 0,
        totalprice: 0,
        specs: [],
        approot: t.globalData.approot
    },
    showcover: function() {
        0 == this.data.cartcount ? e.alert("您还未添加任何商品！") : this.setData({
            showcover: 1
        });
    },
    hidecorver: function() {
        this.setData({
            showcover: 0
        });
    },
    viewintro: function() {
        this.setData({
            intro: 1
        });
    },
    viewgoods: function() {
        this.setData({
            intro: 0
        });
    },
    selecttype: function(t) {
        this.setData({
            pcate: e.data(t).pcate,
            ccate: e.data(t).ccate,
            page: 1,
            list: []
        }), this.getList();
    },
    pay: function(t) {
        wx.navigateTo({
            url: "/pages/order/create/index"
        });
    },
    onLoad: function(t) {
        t = t || {};
        var a = decodeURIComponent(t.scene);
        if (!t.id && a) {
            var i = e.str2Obj(a);
            t.id = i.id, i.mid && (t.mid = i.mid);
        }
        if (!t.id) return e.alert("参数错误！");
        this.setData({
            storeid: t.id
        }), this.getStore(), this.getList(), this.get_cart();
    },
    getStore: function() {
        var t = this;
        e.get("changce/store/get_detail", {
            id: t.data.storeid
        }, function(e) {
            t.setData({
                store: e.store,
                cates: e.cates
            }), wx.setNavigationBarTitle({
                title: e.store.storename
            });
        });
    },
    getList: function() {
        var t = this;
        e.loading(), this.setData({
            loading: !0,
            loaded: !1
        }), e.get("changce/store/goods_list", {
            page: this.data.page,
            pcate: this.data.pcate,
            ccate: this.data.ccate,
            id: t.data.storeid
        }, function(a) {
            var i = {
                loading: !1,
                total: a.total,
                catethumb: a.catethumb,
                pagesize: a.pagesize
            };
            a.list.length > 0 && (i.page = t.data.page + 1, i.list = t.data.list.concat(a.list), 
            a.list.length < a.pagesize && (i.loaded = !0), t.setSpeed(a.list)), t.setData(i), 
            e.hideLoading();
        });
    },
    setSpeed: function(t) {
        if (t && !(t.length < 1)) for (var e in t) {
            var a = t[e];
            if (!isNaN(a.lastratio)) {
                var i = a.lastratio / 100 * 2.5, n = wx.createContext();
                n.beginPath(), n.arc(34, 35, 30, .5 * Math.PI, 2.5 * Math.PI), n.setFillStyle("rgba(0,0,0,0)"), 
                n.setStrokeStyle("rgba(0,0,0,0.2)"), n.setLineWidth(4), n.stroke(), n.beginPath(), 
                n.arc(34, 35, 30, .5 * Math.PI, i * Math.PI), n.setFillStyle("rgba(0,0,0,0)"), n.setStrokeStyle("#ffffff"), 
                n.setLineWidth(4), n.setLineCap("round"), n.stroke();
                var s = "coupon-" + a.id;
                wx.drawCanvas({
                    canvasId: s,
                    actions: n.getActions()
                });
            }
        }
    },
    get_cart: function() {
        var t, a = this;
        e.get("member/cart/get_cart", {}, function(e) {
            t = {
                ismerch: !1,
                ischeckall: e.ischeckall,
                cartcount: e.total,
                totalprice: e.totalprice,
                cartempty: e.empty || !1,
                merch_list: e.merch_list
            }, a.setData(t);
        });
    },
    cartdel: function(t) {
        var a = this, i = [ e.data(t).id ];
        e.post("member/cart/remove", {
            ids: i
        }, function(t) {
            a.get_cart();
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.data.loaded || this.data.list.length == this.data.total || this.getList();
    },
    phone: function(t) {
        e.phone(t);
    },
    selectPicker: function(t) {
        var e = this;
        console.log(e.data.limits), e.data.limits ? i.selectpicker(t, e, "goodslist") : e.setData({
            modelShow: !0
        });
    },
    specsTap: function(t) {
        var e = this;
        i.specsTap(t, e);
    },
    emptyActive: function() {
        this.setData({
            active: "",
            slider: "out",
            tempname: "",
            specsTitle: ""
        });
    },
    buyNow: function(t) {
        var e = this;
        i.buyNow(t, e);
    },
    getCart: function(t) {
        var e = this;
        i.getCart(t, e), this.get_cart();
    },
    select: function() {
        var t = this;
        i.select(t);
    },
    inputNumber: function(t) {
        var e = this;
        i.inputNumber(t, e);
    },
    number: function(t) {
        var e = this;
        i.number(t, e);
    },
    onChange: function(t) {
        return a.onChange(this, t);
    },
    DiyFormHandler: function(t) {
        return a.DiyFormHandler(this, t);
    },
    selectArea: function(t) {
        return a.selectArea(this, t);
    },
    bindChange: function(t) {
        return a.bindChange(this, t);
    },
    onCancel: function(t) {
        return a.onCancel(this, t);
    },
    onConfirm: function(t) {
        return a.onConfirm(this, t);
    },
    getIndex: function(t, e) {
        return a.getIndex(t, e);
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
    onShareAppMessage: function() {
        return e.onShareAppMessage("/pages/changce/store/store?id=" + this.data.storeid, this.data.store.storename);
    },
    tocashier: function() {
        this.data.store.cashierid && this.data.store.cashierid > 0 ? wx.reLaunch({
            url: "/pages/changce/cashier/pay?cashierid=" + this.data.store.cashierid
        }) : e.alert("收银台暂未开放！");
    }
});