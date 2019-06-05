// pages/discount/zkbrechange/zkbrechange.js
var a, e, i = getApp(),
    s = i.requirejs("core");
//   当前登录人的openid
var f = getApp();
var userinfo = f.getCache('userinfo');
var iptvalue = ''
var creditnum = ''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: i.globalData.appimg,
        hintDis: 'none',
        usercredit: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        var t = this
        s.get("payment/index/getCredit", {
            openid: userinfo.openid
        }, function(e) {
            console.log(e)
            creditnum = Number(e.result.credit1)
            t.setData({
                usercredit: e.result.credit1
            })
        })
    },
    // 监听输入
    watchPassWord: function(event) {
        var a = this
        console.log(event.detail.value);
        iptvalue = event.detail.value
        if (event.detail.value > creditnum) {
            a.setData({
                hintDis: 'block'
            })
        } else {
            a.setData({
                hintDis: 'none'
            })
        }
    },
    rechargebtn: function() {
        console.log(creditnum)
        console.log(iptvalue)
        if (iptvalue < creditnum) {
            s.get("payment/index/change", {
                money: iptvalue,
                openid: userinfo.openid
            }, function(eve) {
                console.log(eve)
                if (eve.status == 1) {
                    wx.navigateTo({
                        url: '/pages/discount/resuccess/resuccess',
                    })
                }
            })

        } else {
            wx.showModal({
                title: '提示',
                content: '卡路里余额不足，请重新输入',
            })
        }

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