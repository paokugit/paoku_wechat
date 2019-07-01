// pages/discount/merchcode/merchcode.js
var a, e, i = getApp(),
    s = i.requirejs("core");
//   当前登录人的openid
var f = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: i.globalData.appimg,
        // 组件所需的参数
        nvabarData: {
            showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
            title: '商家收款码', //导航栏 中间的标题
            // 此页面 页面内容距最顶部的距离
            height: i.globalData.height * 2 + 20,
        },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var userinfo = f.getCache('userinfo');
        console.log(userinfo)
    },
    caloriebtn:function(){
        // wx.showModal({
        //     title: '提示',
        //     content: '暂未开放',
        // })
        wx.navigateTo({
            url: '/pages/discount/caloriecode/caloriecode',
        })
    },
    
    zkbbtn: function() {
        wx.navigateTo({
            url: '/pages/discount/zkbcode/zkbcode',
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