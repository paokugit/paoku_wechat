// pages/playmethod/playmethod/playmethod.js
var t = getApp(),
    a = t.requirejs("core");
// console.log(t.globalData.appimg)
Page({

    /**
     * 页面的初始数据
     */
    data: {
        selectedSrc: "icox icox-xing selected",
        key: -1,
        content: "",
        images: [],
        imgs: [],
        globalimg: t.globalData.appimg,
        // 组件所需的参数
        nvabarData: {
            showCapsule: 1,
            title: '反馈问题',
            height: t.globalData.height * 2 + 30,
        },
        index: 0,
        date: '',
        dateDis:'block'
    },

    onLoad: function (a) {
        this.setData({
            options: a
        }), t.url(a);
    },
    upload: function (t) {
        var e = this, s = a.data(t), i = s.type, o = e.data.images, n = e.data.imgs, r = s.index;
        "image" == i ? a.upload(function (t) {
            o.push(t.filename), n.push(t.url), e.setData({
                images: o,
                imgs: n
            });
        }) : "image-remove" == i ? (o.splice(r, 1), n.splice(r, 1), e.setData({
            images: o,
            imgs: n
        })) : "image-preview" == i && wx.previewImage({
            current: n[r],
            urls: n
        });
    },

    bindDateChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            dateDis: 'none',
            date: e.detail.value
        })
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

    }
})