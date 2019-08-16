var a, e, i = getApp(),
    s = i.requirejs("core");
//   当前登录人的openid
var f = getApp();
var userinfo = f.getCache('userinfo');
var bind = ''
var mobile=''
var weixin=''
var bindcount=''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: i.globalData.appimg,
        nvabarData: {
            showCapsule: 1,
            title: '贡献值',
            height: i.globalData.height * 2 + 25,
        },
        maskDis: 'none',
        statedisp01: 'none',
        statedisp02: 'none',
        statedisp03: 'none',
        statedisp04: 'none',
        credit4: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var tt=this
        s.get("myown/devote/msg", {
            openid: userinfo.openid
        }, function (e) {
            console.log(e.message.bind)
            console.log(i.globalData.contributebind)
            if (i.globalData.contributebind.length==0){
                console.log('空')
                i.globalData.contributebind = e.message.bind
            }
            console.log(i.globalData.contributebind)
            if (i.globalData.contributebind == 0) {
                if (e.message.bind == 1) {
                    console.log('弹窗')
                    tt.setData({
                        maskDis: 'block'
                    })
                    i.globalData.contributebind = e.message.bind
                }
            }
        })
    },
    openBtn: function() {
        wx.navigateTo({
            url: '/packageA/pages/contribute/rzdata/rzdata?mobile=' + mobile + '&weixin=' + weixin,
        })
    },
    hidebtn:function(){
        this.setData({
            maskDis: 'none'
        })
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
        var a = this
        s.get("myown/devote/msg", {
            openid: userinfo.openid
        }, function(e) {
            console.log(e)
            console.log(i.globalData.contributebind)
            if (i.globalData.contributebind.length==0) {
                console.log('空2')
                i.globalData.contributebind = e.message.bind

            }
            if (i.globalData.contributebind == 0) {
                if (e.message.bind == 1) {
                    console.log('弹窗')
                    a.setData({
                        maskDis: 'block'
                    })
                    console.log('232323')
                    i.globalData.contributebind = e.message.bind
                }
            }
            console.log(e.message.mobile)
            console.log(e.message.weixin)
            mobile = e.message.mobile
            weixin = e.message.weixin
            a.setData({
                bind: e.message.bind,
                credit4: e.message.credit4
            })
            if (e.message.mobile == '') {
                if (e.message.weixin == '') {
                    //电话号为空 微信为空
                    a.setData({
                        statedisp01: 'block'
                    })
                } else {
                    // 电话号为空 微信不为空
                    a.setData({
                        statedisp03: 'block'
                    })
                }
            } else {
                if (e.message.weixin == '') {
                    //电话号不为空 微信为空
                    a.setData({
                        statedisp02: 'block'
                    })
                } else {
                    //电话号不为空 微信不为空
                    a.setData({
                        statedisp04: 'block',
                    })
                }
            }
        })
    },
    changebtn: function () {
        wx.navigateTo({
            url: '/packageA/pages/contribute/rzdata/rzdata?mobile=' + mobile + '&weixin=' + weixin ,
        })
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
        wx.showToast({
            icon: 'loading',
            title: '加载中'
        })
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