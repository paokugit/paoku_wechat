// pages/contribute/rzdata/rzdata.js
var a, e, i = getApp(),
    s = i.requirejs("core");
//   当前登录人的openid
var f = getApp();
var userinfo = f.getCache('userinfo');
var userwechat=''
var message=''
var rzbind=
Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: i.globalData.appimg,
        maskDis:'none',
        wechatnumber:'',
        usermobile:'',
        userweixin:''

    },
    gobindbtn:function(){
        wx.navigateTo({
            url: '/pages/member/bind/index',
        })
    },
    wechatbtn:function(){
        this.setData({
            maskDis: 'block'
        })
    },
    inputChange: function (event) {
        userwechat = event.detail.value
        console.log(userwechat)
    },
    confirmbtn:function(){
            var a=this
            a.setData({
                maskDis: 'none',
                userweixin: userwechat
            })
        s.get("myown/devote/wx", {
            openid: userinfo.openid,
            weixin: userwechat
        }, function (e) {
            console.log(e)
            if(e.message=='成功'){
                message=e.message
                wx.showToast({
                    title: message,
                    duration:2000
                })
            }
        })
    },
    backBtn:function(){
        wx.navigateTo({
            url: '/pages/contribute/contribute/contribute',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 修改资料传过来的参数
        console.log(options)
        rzbind=options.bindcount
        var t=this
        t.setData({
            usermobile:options.mobile,
            userweixin:options.weixin
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