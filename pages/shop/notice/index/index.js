var t = getApp(), a = t.requirejs("core");

Page({
    data: {
        page: 1,
        loaded: !1,
        loading: !1,
        list: [],
        // 组件所需的参数
        nvabarData: {
            showCapsule: 1, 
            title: '系统公告', 
            height: t.globalData.height * 2 + 25,
        },
    },
    getList: function() {
        var t = this;
        t.setData({
            loading: !0
        }), a.get("shop/notice/get_list", {
            page: this.data.page
        }, function(a) {
            t.setData({
                loading: !1,
                show: !0
            }), a.list.length > 0 ? t.setData({
                page: t.data.page + 1,
                list: t.data.list.concat(a.list)
            }) : a.list.length < a.pagesize && t.setData({
                loaded: !0
            });
        });
    },
    onReachBottom: function() {
        this.data.loaded || this.getList();
    },
    onLoad: function(a) {
        t.url(a), this.getList();
    }
});