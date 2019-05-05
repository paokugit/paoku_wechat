var t = getApp(), a = (t.requirejs("jquery"), t.requirejs("core")), o = t.requirejs("foxui"), e = t.requirejs("biz/diyform");

module.exports = {
    number: function(t, e) {
        var s = a.pdata(t), d = o.number(e, t), i = (s.id, s.optionid, s.min);
        s.max;
        1 == d && 1 == s.value && "minus" == t.target.dataset.action || d < i && "minus" == t.target.dataset.action ? o.toast(e, "单次最少购买" + s.value + "件") : s.value == s.max && "plus" == t.target.dataset.action || (parseInt(e.data.stock) < parseInt(d) ? o.toast(e, "库存不足") : e.setData({
            total: d
        }));
    },
    inputNumber: function(t, a) {
        var e = a.data.goods.maxbuy, s = a.data.goods.minbuy, d = t.detail.value;
        if (d > 0) {
            if (e > 0 && e <= parseInt(t.detail.value) && (d = e, o.toast(a, "单次最多购买" + e + "件")), 
            s > 0 && s > parseInt(t.detail.value) && (d = s, o.toast(a, "单次最少购买" + s + "件")), 
            parseInt(a.data.stock) < parseInt(d)) return void o.toast(a, "库存不足");
        } else d = s > 0 ? s : 1;
        a.setData({
            total: d
        });
    },
    buyNow: function(t, s, d) {
        var i = s.data.optionid, r = s.data.goods.hasoption, l = s.data.diyform, n = s.data.giftid;
        if (9 == s.data.goods.type) var c = s.data.checkedDate / 1e3;
        if (r > 0 && !i) o.toast(s, "请选择规格"); else if (l && l.fields.length > 0) {
            if (!e.verify(s, l)) return;
            console.log(l.f_data), a.post("order/create/diyform", {
                id: s.data.id,
                diyformdata: l.f_data
            }, function(t) {
                0 == s.data.goods.isgift || "goods_detail" != d ? wx.redirectTo({
                    url: "/pages/order/create/index?id=" + s.data.id + "&total=" + s.data.total + "&optionid=" + i + "&gdid=" + t.gdid + "&selectDate=" + c
                }) : "" != n || 1 == s.data.goods.gifts.length ? (1 == s.data.goods.gifts.length && (n = s.data.goods.gifts[0].id), 
                wx.redirectTo({
                    url: "/pages/order/create/index?id=" + s.data.id + "&total=" + s.data.total + "&optionid=" + i + "&gdid=" + t.gdid + "&giftid=" + n
                })) : o.toast(s, "请选择赠品");
            });
        } else 0 == s.data.goods.isgift || "goods_detail" != d ? wx.navigateTo({
            url: "/pages/order/create/index?id=" + s.data.id + "&total=" + s.data.total + "&optionid=" + i + "&selectDate=" + c
        }) : "" != n || 1 == s.data.goods.gifts.length ? (1 == s.data.goods.gifts.length && (n = s.data.goods.gifts[0].id), 
        wx.navigateTo({
            url: "/pages/order/create/index?id=" + s.data.id + "&total=" + s.data.total + "&optionid=" + i + "&giftid=" + n
        })) : o.toast(s, "请选择赠品");
    },
    getCart: function(t, s) {
        var d = s.data.optionid;
        console.log(s.data.goods.hasoption);
        var i = s.data.goods.hasoption, r = s.data.diyform;
        if (i > 0 && !d) o.toast(s, "请选择规格"); else if (s.data.quickbuy) {
            if (console.log("quickbuy"), r && r.fields.length > 0) {
                if (!(l = e.verify(s, r))) return;
                s.setData({
                    formdataval: {
                        diyformdata: r.f_data
                    }
                }), console.log(s.data.formdataval);
            }
            s.addCartquick(d, s.data.total);
        } else if (r && r.fields.length > 0) {
            var l = e.verify(s, r);
            if (!l) return;
            a.post("order/create/diyform", {
                id: s.data.id,
                diyformdata: r.f_data
            }, function(t) {
                console.log(s.data), a.post("member/cart/add", {
                    id: s.data.id,
                    total: s.data.total,
                    optionid: d,
                    diyformdata: r.f_data
                }, function(t) {
                    0 == t.error ? (s.setData({
                        "goods.carttotal": t.carttotal,
                        active: "",
                        slider: "out",
                        isSelected: !0,
                        tempname: ""
                    }), o.toast(s, "添加成功")) : o.toast(s, t.message);
                });
            });
        } else a.post("member/cart/add", {
            id: s.data.id,
            total: s.data.total,
            optionid: d
        }, function(t) {
            if (0 == t.error) {
                o.toast(s, "添加成功");
                var a = s.data.goods;
                s.setData({
                    "goods.carttotal": t.carttotal,
                    active: "",
                    slider: "out",
                    isSelected: !0,
                    tempname: "",
                    goods: a
                });
            } else o.toast(s, t.message);
        });
    },
    selectpicker: function(t, e, s, d) {
        e.setData({
            optionid: "",
            specsData: ""
        });
        var i = e.data.active, r = t.currentTarget.dataset.id;
        "" == i && e.setData({
            slider: "in",
            show: !0
        }), a.get("goods/get_picker", {
            id: r
        }, function(a) {
            if (console.log(a), a.goods.presellstartstatus || "1" != a.goods.ispresell) if (a.goods.presellendstatus || "1" != a.goods.ispresell) {
                var i = a.options;
                if ("goodsdetail" == s) if (e.setData({
                    pickerOption: a,
                    canbuy: e.data.goods.canbuy,
                    buyType: t.currentTarget.dataset.buytype,
                    options: i,
                    minpicker: s,
                    "goods.thistime": a.goods.thistime
                }), 0 != a.goods.minbuy && e.data.total < a.goods.minbuy) l = a.goods.minbuy; else l = e.data.total; else if (e.setData({
                    pickerOption: a,
                    goods: a.goods,
                    options: i,
                    minpicker: s
                }), e.setData({
                    optionid: !1,
                    specsData: [],
                    specs: []
                }), console.log(e.data.specsData), 0 != a.goods.minbuy && e.data.total < a.goods.minbuy) l = a.goods.minbuy; else var l = 1;
                a.diyform && e.setData({
                    diyform: {
                        fields: a.diyform.fields,
                        f_data: a.diyform.lastdata
                    }
                }), e.setData({
                    id: r,
                    pagepicker: s,
                    total: l,
                    tempname: "select-picker",
                    active: "active",
                    show: !0,
                    modeltakeout: d
                });
            } else o.toast(e, a.goods.presellstatustitle); else o.toast(e, a.goods.presellstatustitle);
        });
    },
    sortNumber: function(t, a) {
        return t - a;
    },
    specsTap: function(t, a) {
        var e = a.data.specs;
        e[t.target.dataset.idx] = {
            id: t.target.dataset.id,
            title: t.target.dataset.title
        };
        var s = "", d = "", i = [];
        e.forEach(function(t) {
            s += t.title + ";", i.push(t.id);
        });
        var r = i.sort(this.sortNumber);
        d = r.join("_");
        var l = a.data.options;
        "" != t.target.dataset.thumb && a.setData({
            "goods.thumb": t.target.dataset.thumb
        }), l.forEach(function(t) {
            t.specs == d && (a.setData({
                optionid: t.id,
                "goods.total": t.stock,
                "goods.maxprice": t.marketprice,
                "goods.minprice": t.marketprice,
                "goods.marketprice": t.marketprice,
                "goods.seecommission": t.seecommission,
                "goods.presellprice": a.data.goods.ispresell > 0 ? t.presellprice : a.data.goods.presellprice,
                optionCommission: !0
            }), t.stock < a.data.total ? (a.setData({
                canBuy: "库存不足",
                stock: t.stock
            }), o.toast(a, "库存不足")) : a.setData({
                canBuy: "",
                stock: t.stock
            }));
        }), console.log(e), a.setData({
            specsData: e,
            specsTitle: s
        });
    }
};