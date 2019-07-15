var t = getApp(), a = t.requirejs("core");

Page({
    data: {
        loaded: !1,
        list: [],
        // 组件所需的参数
        nvabarData: {
            showCapsule: 1, 
            title: '选择地址', 
            height: t.globalData.height * 2 + 20,
        },
    },
    onLoad: function(a) {
        t.url(a);
    },
    onShow: function() {
        this.getList();
        var a = this;
        t.getCache("isIpx") ? a.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar",
            paddingb: "padding-b"
        }) : a.setData({
            isIpx: !1,
            iphonexnavbar: "",
            paddingb: ""
        });
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    getList: function() {
        var t = this;
        a.get("member/address/get_list", {}, function(a) {
            t.setData({
                loaded: !0,
                list: a.list,
                show: !0
            });
        });
    },
    select: function(e) {
        var i = a.pdata(e).index;
        t.setCache("orderAddress", this.data.list[i], 30), wx.navigateBack();
    }
});