var t = getApp(),
    a = t.requirejs("core");
Page({
    data: {
        globalimg: t.globalData.appimg,
        paperplane: !1,
        // 组件所需的参数
        nvabarData: {
            showCapsule: 1,
            title: '待领取优惠券',
            height: t.globalData.height * 2 + 20,
        },
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