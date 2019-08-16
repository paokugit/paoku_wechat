// pages/playmethod/hotdetail/hotdetail.js
var t = getApp(),
    s = t.requirejs("core"),
    a = t.requirejs("wxParse/wxParse");
var useropenid = ""
Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: t.globalData.appimg,
        // 组件所需的参数
        nvabarData: {
            showCapsule: 1,
            title: '文章详情',
            height: t.globalData.height * 2 + 20,
        },
        createtime: "",
        photo: "",
        title: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.showToast({ title: '加载中', icon: 'loading', duration: 1000 });
        console.log(options)
        var t=this
        s.get("myown/novice/novice_detail", {
            id:options.id
        }, function(e) {
            console.log(e)
            if(e.error==0){
                wx.hideLoading()
                a.wxParse("wxParseData", "html", e.message.detail, t, "5"), t.setData({
                    title: e.message.title,
                    createtime: e.message.createtime
                })
            }
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})