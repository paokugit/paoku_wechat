var t = getApp(), s = t.requirejs("core");

Page({
    data: {
        // 组件所需的参数
        nvabarData: {
            showCapsule: 1, 
            title: '物流信息', 
            height: t.globalData.height * 2 + 20,
        },  
    },
    onLoad: function(s) {
        this.setData({
            options: s
        }), t.url(s), this.get_list();
    },
    get_list: function() {
        var t = this;
        s.get("order/express", t.data.options, function(e) {
            0 == e.error ? (e.show = !0, t.setData(e)) : s.toast(e.message, "loading");
        });
    }
});