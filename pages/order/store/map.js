var t = getApp().requirejs("core");
var app=getApp();
Page({
    data: {
        storeid: 0,
        merchid: 0,
        markers: [],
        store: {},
        // 组件所需的参数
        nvabarData: {
            showCapsule: 1, 
            title: '地图', 
            height: app.globalData.height * 2 + 20,
        },
    },
    onLoad: function(t) {
        this.setData({
            storeid: t.id,
            merchid: t.merchid
        }), this.getInfo();
    },
    getInfo: function() {
        var e = this;
        console.log(this.data.storeid), t.get("store/map", {
            id: this.data.storeid,
            merchid: this.data.merchid
        }, function(t) {
            e.setData({
                store: t.store,
                markers: [ {
                    id: 1,
                    latitude: Number(t.store.lat),
                    longitude: Number(t.store.lng)
                } ],
                show: !0
            });
        });
    },
    phone: function(e) {
        t.phone(e);
    }
});