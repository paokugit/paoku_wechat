var t = getApp(), a = t.requirejs("core");
var app=getApp()
Page({
    data: {
        code: 0,
        // 组件所需的参数
        nvabarData: {
            showCapsule: 1,
            title: '津贴佣金', 
            height: app.globalData.height * 2 + 20,
        },
    },
    onShow: function() {
        this.getData();
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
    getData: function() {
        var t = this;
        a.get("commission/withdraw", {}, function(a) {
            a.show = !0, t.setData(a), wx.setNavigationBarTitle({
                title: a.set.texts.commission1
            });
        });
    },
    toggleSend: function(t) {
        0 == t.currentTarget.dataset.id ? this.setData({
            code: 1
        }) : this.setData({
            code: 0
        });
    },
    withdraw: function(t) {
        this.data.cansettle && wx.navigateTo({
            url: "/pages/commission/apply/index"
        });
    }
});