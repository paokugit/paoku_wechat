var a, e, i = getApp(),
    s = i.requirejs("core");
//   当前登录人的openid
var f = getApp();
var userinfo = f.getCache('userinfo');
var usermobile = ''
var errormessage = ''
var usercode = ''
var code = ''
var message=''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: i.globalData.appimg,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    inputChange: function(event) {
        var a = this
        usermobile = event.detail.value
    },
    codeChange: function(eve) {
        var a = this
        usercode = eve.detail.value
    },
    getCode: function() {
        var t = this
        s.get("myown/bindmobile/send", {
            mobile: usermobile
        }, function(e) {
            console.log(e)
            if (e.error == 0) {
                code = e.message.code
                wx.showToast({
                    title: '短信发送成功',
                })
            } else {
                errormessage = e.message
                wx.showModal({
                    title: '提示',
                    content: errormessage,
                })
            }
        })
    },
    bindPhone: function() {
        console.log(userinfo)
        console.log(usermobile, usercode)
        if (usercode == code) {
            // 验证码正确
            s.get("myown/bindmobile/bind", {
                mobile: usermobile,
                openid: userinfo.openid
            }, function(t) {
                console.log(t)
                if(t.error==0){
                message=t.message
                wx.showToast({
                    title: message,
                    success:function(){
                        wx.switchTab({
                            url: '/pages/member/index/index',
                        })
                    }
                })
                }else{
                    message=t.message
                    wx.showModal({
                        title: '提示',
                        content: message,
                    })
                }

            })
        } else {
            wx.showModal({
                title: '提示',
                content: '验证码错误',
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