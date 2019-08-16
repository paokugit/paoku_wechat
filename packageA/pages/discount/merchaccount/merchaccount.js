var a, e, i = getApp(),
    s = i.requirejs("core");
//   当前登录人的openid
var f = getApp();
var useropenid = ''
var iptvalue = ''
var creditnum = ''
var message = ''
var merchid = ""
var ordercount=""
Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: i.globalData.appimg,
        hintDis: 'none',
        credit5: '',
        orderprice: '',
        realpricerate: '',
        // 组件所需的参数
        nvabarData: {
            showCapsule: 1,
            title: '资金账户',
            height: i.globalData.height * 2 + 22,
        },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)
        merchid = options.merchantid
        var userinfo = f.getCache('userinfo');
        useropenid = userinfo.openid
        var t = this
        s.get("payment/myown/merch", {
            merchid: merchid
        }, function(e) {
            console.log(e)
            ordercount = e.result.orderprice
            t.setData({
                orderprice: e.result.orderprice,
                realpricerate: e.result.realpricerate,
            })
        })
    },
    recordbtn:function(){
        wx.navigateTo({
            url: '/packageA/pages/discount/merchwithdraw/merchwithdraw?id='+merchid,
        })
    },
    rechargebtn: function() {
        if (ordercount<1){
            wx.showModal({
                title: '提示',
                content: '提现金额不能小于1元',
            })
        }else{
            wx.showLoading({
                title: '请求中',
                mask: true
            })
        s.get("payment/myown/merch_draw", {
            merchid: merchid,
            applytype: 0
        }, function(eve) {
            console.log(eve)
            if (eve.status == 1) {
                setTimeout(function () {
                    wx.hideLoading()
                }, 1000)
                message = eve.result.message
                wx.showModal({
                    title: '提示',
                    content: message,
                    success: function(res) {
                        if (res.cancel) {
                            // 点击取消
                        } else {
                            // 点击确定
                            wx.navigateTo({
                                url: '/packageA/pages/discount/merchwithdraw/merchwithdraw?id=' + merchid,
                            })
                        }
                    }
                })
            } else if (eve.status == 0) {
                setTimeout(function () {
                    wx.hideLoading()
                }, 1000)
                message = eve.result.message
                wx.showModal({
                    title: '提示',
                    content: message,
                })
            }
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