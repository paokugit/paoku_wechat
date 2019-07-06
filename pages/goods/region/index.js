var e = getApp();

e.requirejs("core"), e.requirejs("jquery");

Page({
    data: {
        region: [],
        // 组件所需的参数
        nvabarData: {
            showCapsule: 1, 
            title: '', 
            height: e.globalData.height * 2 + 20,
        },
    },
    onLoad: function(e) {
        var r = this, n = e.region, t = e.onlysent;
        r.setData({
            region: n,
            onlysent: t
        });
    }
});