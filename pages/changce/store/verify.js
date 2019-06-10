var e = getApp(), r = e.requirejs("core");

Page({
    data: {
        vid: 0,
        verifycode: "",
        loading: !1,
        show: !1,
        order: [],
        approot: e.globalData.approot
    },
    onLoad: function(e) {
        var o = (e = e || {}).id, i = e.verifycode, t = decodeURIComponent(e.scene);
        if (!o && t) {
            var a = r.str2Obj(t);
            o = a.id, a.verifycode && (i = a.verifycode);
        }
        this.setData({
            vid: o,
            verifycode: i
        }), this.verify();
    },
    verify: function() {
        var e = this;
        r.get("changce/store/verify", {
            id: e.data.vid,
            verifycode: e.data.verifycode
        }, function(o) {
            if (!o.order) return r.alert(o.error), !1;
            e.setData({
                order: o.order,
                show: !0
            });
        });
    },
    callme: function(e) {
        wx.makePhoneCall({
            phoneNumber: e.target.id
        });
    },
    phone: function(e) {
        r.phone(e);
    }
});