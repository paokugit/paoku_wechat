// pages/discount/discount.js
var a, e, i = getApp(),
    s = i.requirejs("core");
//   当前登录人的openid
var f = getApp();
var userinfo = f.getCache('userinfo');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: i.globalData.appimg
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    accountbtn:function(){
        wx.navigateTo({
            url: '/pages/discount/zkbaccount/zkbaccount',
        })
    },
    codebtn:function(){
        // s.get("app/payment/index/qrcode", {
        // }, function (eve) {
        //     console.log(eve)
        // })
        wx.request({
            url: 'https://paokucoin.com/app/index.php?i=1&c=entry&m=ewei_shopv2&do=mobile&r=app.payment.index.qrcode',
            success:function(e){
console.log(e)
            }
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