var app = getApp(), request = function(n) {
    console.log(n), n.data.version = "4.0.17", app.util.request({
        method: n.method || "get",
        url: n.url,
        data: n.data,
        cachetime: 0,
        showLoading: !1,
        success: function(t) {
            var e = t.data.status;
            -1 == e ? login(n) : 0 == e ? wx.showModal({
                title: "提示",
                mask: !0,
                content: t.data.info,
                showCancel: !1
            }) : -2 == e ? validateAuthorize(n) : n.success(t.data);
        },
        fail: function() {}
    });
}, login = function(s) {
    wx.login({
        success: function(t) {
            var e = wx.getStorageSync("parent_id"), n = wx.getStorageSync("goods_id"), o = wx.getStorageSync("share_tpye");
            request({
                method: "get",
                url: "entry/wxapp/login",
                data: {
                    code: t.code,
                    parent_id: e,
                    goods_id: n,
                    share_tpye: o
                },
                success: function(t) {
                    if (wx.setStorageSync("token", t.info.token), null != s) return s.data.token = t.info.token, 
                    void request(s);
                }
            });
        },
        fail: function() {}
    });
}, validateAuthorize = function e(n) {
    wx.showModal({
        title: "提示",
        content: "asjjasjsajjsjjsaj",
        showCancel: !1,
        success: function(t) {
            wx.openSetting({
                success: function(t) {
                    t.authSetting["scope.werun"] ? null != n && wx.getWeRunData({
                        success: request(n)
                    }) : e();
                }
            });
        }
    });
};

module.exports = {
    request: request
};