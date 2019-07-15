// pages/playmethod/playmethod/playmethod.js
var t = getApp(),
    a = t.requirejs("core");
// console.log(t.globalData.appimg)
Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: t.globalData.appimg,
        src:'',
        type:2,
        // 组件所需的参数
        nvabarData: {
            showCapsule: 1, 
            title: '新手攻略', 
            height: t.globalData.height * 2 + 25,
        },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // this.videoContext = wx.createVideoContext('myvideo', this);
        // this.videoContext.requestFullScreen({ direction: 90 });
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    // myTab: function (t) {
    //     console.log(t)
    //     console.log(a.pdata(t))
    //     var e = this,
    //         i = a.pdata(t).type;
    //     e.setData({
    //         type: i,
    //         page: 1,
    //         list: [],
    //         loading: !0
    //     });
    // }
})