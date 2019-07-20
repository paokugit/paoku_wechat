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
        credit5:'',
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
    onLoad: function (options) {
        var userinfo = f.getCache('userinfo');
        useropenid = userinfo.openid
        var t = this
        s.get("payment/myown/getCredit", {
            openid: useropenid
        }, function (e) {
            console.log(e)
            creditnum = Number(e.result.credit5)
            t.setData({
                credit5: e.result.credit5
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
    recordbtn: function () {
        wx.navigateTo({
            url: '/pages/personalcode/withdrawrecord?param=' + 0,
        })
    },
    rechargebtn: function () {
        console.log(creditnum)
        console.log(iptvalue)
        if (iptvalue==""){
            wx.showModal({
                title: '提示',
                content: '请输入提现金额',
            })
        }else{
        if (iptvalue <= creditnum) {
            s.get("payment/myown/own_draw", {
                money: iptvalue,
                openid: useropenid
            }, function (eve) {
                console.log(eve)
                if(eve.status==1){
                    message=eve.result.message
                        wx.showModal({
                            title: '提示',
                            content: message,
                            success:function(res){
                                if(res.cancel){
                                    // 点击取消
                                }else{
                                    // 点击确定
                                    wx.navigateTo({
                                        url: '/pages/personalcode/withdrawrecord',
                                    })
                                }
                            }
                        })
                } else if (eve.status == 0){
                    message = eve.result.message
                    wx.showModal({
                        title: '提示',
                        content: message,
                    })
                }
            })
        } else {
            wx.showModal({
                title: '提示',
                content: '您的余额不足，请重新输入',
            })
        }
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