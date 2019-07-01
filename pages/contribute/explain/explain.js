// pages/contribute/explain/explain.js
var a, e, i = getApp(),
    s = i.requirejs("core");
// var WxParse = require('../../../utils/wxParse/wxParse.js');
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
        content:'',
        // 组件所需的参数
        nvabarData: {
            showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
            title: '贡献值', //导航栏 中间的标题
            // 此页面 页面内容距最顶部的距离
            height: i.globalData.height * 2 + 20,
        },

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var a=this
        s.get("myown/devote/detail", {}, function (e) {
            console.log(e)
            a.setData({
                content:e.message.content
                // content: WxParse.wxParse('content', 'html', e.message.content, a, 5)
                // content: WxParse.wxParse('content', 'html', '<p>' + e.message.content+'</p>', a, 5)
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