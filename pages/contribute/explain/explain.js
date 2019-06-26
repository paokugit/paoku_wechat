// pages/contribute/explain/explain.js
var a, e, i = getApp(),
    s = i.requirejs("core"), n = i.requirejs("wxParse/wxParse");
//   当前登录人的openid
var f = getApp();
var userinfo = f.getCache('userinfo');
var con=''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: i.globalData.appimg,
        content:''

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var a=this
        s.get("myown/devote/detail", {}, function (e) {
            console.log(e)
            con = e.message.content
            n.wxParse("con", "html",con,a,5)
            a.setData({
                content:e.message.content
            })
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