// pages/discount/mingxi/mingxi.js
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
        globalimg: i.globalData.appimg,
        moneynum:'',
        create_time:'',
        merchname:'',
        remark:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var a=this
        console.log(options.id)
        s.get("payment/index/detail", {
            openid:userinfo.openid,
            id:options.id
        }, function (e) {
            console.log(e)
            a.setData({
                moneynum: e.result.num,
                create_time: e.result.createtime,
                merchname:e.result.merch_name,
                remark:e.result.remark
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