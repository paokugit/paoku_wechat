// pages/discount/zkbrechange/zkbrechange.js
var a, e, i = getApp(),
    s = i.requirejs("core");
//   当前登录人的openid
var f = getApp();
var userinfo = f.getCache('userinfo');
var iptvalue=''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: i.globalData.appimg,
        hintDis:'none'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    // 监听输入
    watchPassWord: function (event) {
        var a=this
        console.log(event.detail.value);
        iptvalue = event.detail.value
        if (event.detail.value>=3000){
            a.setData({
                hintDis: 'block'
            })
        }else{
            a.setData({
                hintDis: 'none'
            })
        }
    },
    rechargebtn: function () {
        console.log(iptvalue)
        if (iptvalue<3000){
            console.log('调充值接口')
            wx.navigateTo({
                url: '/pages/discount/resuccess/resuccess',
            })
        }
          
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