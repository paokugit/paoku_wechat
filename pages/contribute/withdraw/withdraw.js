// pages/discount/zkbrechange/zkbrechange.js
var a, e, i = getApp(),
    s = i.requirejs("core");
//   当前登录人的openid
var f = getApp();
var useropenid = ''
var iptvalue = ''
var creditnum = ''
var message=''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: i.globalData.appimg,
        hintDis: 'none',
        credit4:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var userinfo = f.getCache('userinfo');
        useropenid = userinfo.openid
        var t = this
        s.get("myown/devote/msg", {
            openid: useropenid
        }, function (e) {
            console.log(e)
            creditnum = Number(e.message.credit4)
            t.setData({
                credit4: e.message.credit4
            })
        })
    },
    // 监听输入
    watchPassWord: function (event) {
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
    rechargebtn: function () {
        console.log(creditnum)
        console.log(iptvalue)
        if (iptvalue <= creditnum) {
            s.get("myown/devote/withdrawal", {
                money: iptvalue,
                openid: useropenid
            }, function (eve) {
                console.log(eve)
                if(eve.error==0){
                    message=eve.message
                        wx.showModal({
                            title: '提示',
                            content: message,
                        })
                } else if (eve.error == 1){
                    message = eve.message
                    wx.showModal({
                        title: '提示',
                        content: message,
                    })
                }
            })
        } else {
            wx.showModal({
                title: '提示',
                content: '您的贡献值不足，请重新输入',
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