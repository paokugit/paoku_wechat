var t = getApp().requirejs("core");
var app=getApp()
Page({
    data: {
        status: 0,
        page: 1,
        list: [],
        // 组件所需的参数
        nvabarData: {
            showCapsule: 1, 
            title: '', 
            height: app.globalData.height * 2 + 20,
        },
    },
    onLoad: function() {
        this.getList();
    },
    onReachBottom: function() {
        this.data.loaded || this.data.list.length == this.data.total || this.getList();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    getList: function() {
        var a = this;
        t.get("commission/log/get_list", {
            page: a.data.page,
            status: a.data.status
        }, function(t) {
            var s = {
                total: t.total,
                pagesize: t.pagesize,
                commissioncount: t.commissioncount,
                textyuan: t.textyuan,
                textcomm: t.textcomm,
                textcomd: t.textcomd,
                show: !0
            };
            t.list.length > 0 && (s.page = a.data.page + 1, s.list = a.data.list.concat(t.list), 
            t.list.length < t.pagesize && (s.loaded = !0)), a.setData(s), a.setData({
                'nvabarData.title': t.textcomd + "(" + t.total + ")"
            });
            // wx.setNavigationBarTitle({
            //     title: t.textcomd + "(" + t.total + ")"
            // });
        }, this.data.show);
    },
    myTab: function(a) {
        var s = this, e = t.pdata(a).status;
        s.setData({
            status: e,
            page: 1,
            list: []
        }), s.getList();
    }
});