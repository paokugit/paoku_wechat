var t = getApp(),
    a = t.requirejs("core");
Page({

    data: {
        globalimg: t.globalData.appimg,
        // 组件所需的参数
        nvabarData: {
            showCapsule: 1, 
            title: '', 
            height: t.globalData.height * 2 + 20,
        },
    },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});