var e = getApp();

e.requirejs("core"), e.requirejs("jquery");

Page({
    data: {
        region: [],
      showIcon: true,
      gloheight: e.globalData.gloheight
    },
    onLoad: function(e) {
        var r = this, n = e.region, t = e.onlysent;
        r.setData({
            region: n,
            onlysent: t
        });
    }
});