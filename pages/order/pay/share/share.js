var t = getApp(),
    a = t.requirejs("core");
Page({
    data: {
        globalimg: t.globalData.appimg,
        paperplane: !1,
      showIcon: true,
    },
    onLoad: function(a) {},
    transmit: function() {
        this.setData({
            paperplane: !0
        });
    },
    hidepaperplane: function() {
        this.setData({
            paperplane: !1
        });
    }
});