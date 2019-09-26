var a, e, i = getApp(),
    s = i.requirejs("core");
var f = getApp();
var useropenid=''
var iptvalue = ''
var creditnum = ''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: i.globalData.appimg,
        hintDis: 'none',
        usercredit: '',
        showIcon: true,
        gloheight: i.globalData.gloheight 
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var userinfo = f.getCache('userinfo');
        useropenid=userinfo.openid
        var t = this
        s.get("payment/index/getCredit", {
            openid: useropenid
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
        console.log('1')
        console.log(creditnum)
        console.log(iptvalue)
        wx.showLoading({
            title: '请求中',
            mask: true
        })
        if(iptvalue==''){
            wx.showModal({
                title: '提示',
                content: '请输入充值金额',
            })
            setTimeout(function () {
                wx.hideLoading()
            }, 1000)
        }else{
        if (iptvalue <= creditnum) {
            s.get("payment/index/change", {
                money: iptvalue,
                openid: useropenid
            }, function(eve) {
                console.log(eve)
                if (eve.status == 1) {
                    setTimeout(function () {
                        wx.hideLoading()
                    }, 1000)
                    wx.navigateTo({
                        url: '/packageA/pages/discount/resuccess/resuccess',
                    })
                } else if (eve.status == 0){
                    wx.showModal({
                        title: '提示',
                        content: eve.result.message,
                    })
                    setTimeout(function () {
                        wx.hideLoading()
                    }, 1000)
                }
            })

        } else {
            wx.showModal({
                title: '提示',
                content: '卡路里余额不足，请重新输入',
            })
            setTimeout(function () {
                wx.hideLoading()
            }, 1000)
        }
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