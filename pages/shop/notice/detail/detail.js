var t = getApp(), e = t.requirejs("core"), a = t.requirejs("wxParse/wxParse");

Page({
    data: {
        id: "-",
        title: "-",
        createtime: "-",
        // 组件所需的参数
        nvabarData: {
            showCapsule: 1, 
            title: '系统公告', 
            height: t.globalData.height * 2 + 20,
        },
    },
    onLoad: function(i) {
        var r = this;
        r.setData({
            id: i.id
        }), t.url(i), e.get("shop.notice.detail", {
            id: this.data.id
        }, function(t) {
            var e = t.notice;
            a.wxParse("wxParseData", "html", e.detail, r, "5"), r.setData({
                show: !0,
                title: e.title,
                createtime: e.createtime
            });
        });
    }
});