var t = getApp().requirejs("core");
var app=getApp();
Page({
    data: {
        page: 1,
        list: [],
        // 组件所需的参数
        nvabarData: {
            showCapsule: 1, 
            title: '详情', 
            height: app.globalData.height * 2 + 20,
        },
    },
    onLoad: function(t) {
        t.id > 0 && this.setData({
            id: t.id
        }), this.getList();
    },
    onReachBottom: function() {
        this.data.loaded || this.data.list.length == this.data.total || this.getList();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    getList: function() {
        var a = this;
        t.get("commission/log/detail_list", {
            page: a.data.page,
            id: a.data.id
        }, function(t) {
            var e = {
                total: t.total,
                pagesize: t.pagesize,
                show: !0,
                textyuan: t.textyuan,
                textcomm: t.textcomm
            };
            t.list.length > 0 && (e.page = a.data.page + 1, e.list = a.data.list.concat(t.list), 
            t.list.length < t.pagesize && (e.loaded = !0)), a.setData(e);
        }, this.data.show);
    }
});