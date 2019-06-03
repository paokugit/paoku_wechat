// pages/discount/scancode/scancode.js

var a, e, i = getApp(),
    s = i.requirejs("core");
//   当前登录人的openid
var f = getApp();
var userinfo = f.getCache('userinfo');
console.log(userinfo)
var moneycount = ''
var calorienum = ''
var actualnum = ''
var merchid = 31
var itemid = ''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: i.globalData.appimg,
        moneynum: '',
        caloriecount: '',
        actualcount: '',
        fulllist: [],
        usercredit: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (t) {
        // 修改卡路里列表页的数据
        console.log(merchid)
        var b = decodeURIComponent(t.scene);
        var i = s.str2Obj(b);
        t.id = i.id;
        console.log(t)
        console.log(b)
        var a = this
        wx.request({
            url: 'https://paokucoin.com/app/index.php?i=1&c=entry&m=ewei_shopv2&do=mobile&r=app.payment.index.getset',
            data: {
                cate: 1,
                merchid: merchid
            },
            success: function (e) {
                console.log(e.data)
                a.setData({
                    fulllist: e.data.result.list
                })
            }
        })


    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    //   获取用户输入的金额
    moneyInput: function (e) {
        moneycount = e.detail.value
        calorienum = Math.floor((e.detail.value / 50)) * 5
        actualnum = e.detail.value - Math.floor((e.detail.value / 50)) * 5
        this.setData({
            moneynum: e.detail.value,
            caloriecount: Math.floor((e.detail.value / 50)) * 5,
            actualcount: e.detail.value - Math.floor((e.detail.value / 50)) * 5
        })
        console.log(actualnum)
    },
    //   立即买单
    paymentbtn: function () {
        console.log(moneycount)
        console.log(calorienum)
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var t = this
        wx.request({
            url: 'https://paokucoin.com/app/index.php?i=1&c=entry&m=ewei_shopv2&do=mobile&r=app.payment.index.getCredit',
            data: {
                openid: userinfo.openid
            },
            success: function (e) {
                console.log(e.data)
                t.setData({
                    usercredit: e.data.result.credit1
                })
            }
        })
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