var a, e, i = getApp(),
    s = i.requirejs("core");
//   当前登录人的openid
var f = getApp();
var useropenid = ''
var iptvalue = ''
var creditnum = ''
var mobile = ''
var errormessage = ''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: i.globalData.appimg,
        hintDis: 'none',
        usercredit: '',
        nvabarData: {
            showCapsule: 1,
            title: '折扣宝转账',
            height: i.globalData.height * 2 + 20,
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var userinfo = f.getCache('userinfo');
        useropenid = userinfo.openid
        var t = this
        s.get("payment/rebate", {
            openid: useropenid
        }, function(e) {
            console.log(e)
            creditnum = Number(e.result.credit3)
            t.setData({
                usercredit: e.result.credit3

            })
        })
    },
    // 监听手机号输入
    watchmobile: function(eve) {
        // console.log(eve.detail.value)
        mobile = eve.detail.value
        console.log(mobile)
    },
    // 监听金额输入
    watchmoney: function(event) {
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
    transferbtn: function() {
        console.log('111')
        //执行请求之前进行showLoading()
        wx.showLoading({
            title: '请求中',
            mask: true
        })
        console.log(creditnum)
        console.log(iptvalue)
        if (mobile == "") {
            wx.showModal({
                title: '提示',
                content: '请输入手机号',
            })
            setTimeout(function() {
                wx.hideLoading()
            }, 1000)
        }else{
        if (iptvalue == "") {
            wx.showModal({
                title: '提示',
                content: '请输入转账金额',
            })
            setTimeout(function () {
                wx.hideLoading()
            }, 1000)
        }else{
        if (iptvalue <= creditnum) {
            s.get("payment/rebate_change", {
                money: iptvalue,
                openid: useropenid,
                mobile: mobile
            }, function(eve) {
                console.log(eve)
                if (eve.status == 1) {
                    setTimeout(function() {
                        wx.hideLoading()
                    }, 1000)
                    wx.showModal({
                        title: '提示',
                        content: '转账成功',
                        success: function(res) {
                            if (res.cancel) {
                                //    点击取消
                            } else {
                                wx.navigateTo({
                                    url: '/packageA/pages/discount/zkbaccount/zkbaccount',
                                })
                            }
                        }
                    })
                } else if (eve.status == 0) {
                    setTimeout(function() {
                        wx.hideLoading()
                    }, 1000)
                    errormessage = eve.result.message
                    wx.showModal({
                        title: '提示',
                        content: errormessage,
                    })
                }

            })


        } else {
            wx.showModal({
                title: '提示',
                content: '余额不足，请重新输入',
            })
            setTimeout(function() {
                wx.hideLoading()
            }, 1000)
        }
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