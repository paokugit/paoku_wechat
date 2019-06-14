// pages/store/zhuye.js
var a, e, i = getApp(),
    s = i.requirejs("core");
var f = getApp();
var useropenid=''
var merchphone=''
var merchid=''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: i.globalData.appimg,
        url: "http://paokucoin.com/img/backgroup/heart-n@2x.png",
        iShow: "true",
        context_weixin: "runhouse",
        merchname: '',
        logo: "",
        address: "",
        wxsignal: "",
        main_business: "",
        shopimg: [],
        shopvideo: "",
        distance: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var a=this
        var userinfo = f.getCache('userinfo');
        useropenid = userinfo.openid
        console.log(options)
        var newpos = i.getCache("mypos");
        console.log(newpos)
        s.get("myown/shophome/index", {
            openid: useropenid,
            merch_id:options.id,
            lat:newpos.lat,
            lng:newpos.lng
        }, function (e) {
            console.log(e)
            merchphone=e.message.mobile
            merchid=e.message.id
            a.setData({
                merchname: e.message.merchname,
                logo:e.message.logo,
                address:e.message.address,
                wxsignal: e.message.wxsignal,
                main_business: e.message.main_business,
                shopimg: e.message.shopimg,
                shopvideo: e.message.shopvideo,
                distance: e.message.distance
            })
            
        })
    },
    //跳转简介界面
    heanjianjie: function() {
        // console.log(123),
        wx.navigateTo({
            url: '/pages/store/store',
        })
    },
    //长按复制微信号
    copy: function() {
        var that = this;
        wx.setClipboardData({
            data: that.data.context_weixin,
            success: function(res) {
                wx.showToast({
                    title: '复制微信号成功',
                    icon: 'none',
                });
            }
        });
    },
    //关注
    open: function(res) {
        let url

        if (res.currentTarget.dataset.msg == "http://paokucoin.com/img/backgroup/heart-n@2x.png") {

            url = "http://paokucoin.com/img/backgroup/heart-s@2x.png"

        } else {

            url = "http://paokucoin.com/img/backgroup/heart-n@2x.png"

        }
        this.setData({
            url: url
        })

    },
    navigation:function(){
        wx.navigateTo({
            url: '/pages/changce/merch/intro?id=' + merchid,
        })
    },
    // 拨打电话
    tel: function (t) {
        console.log(merchphone)
        wx.makePhoneCall({
            phoneNumber: merchphone,
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

    },

})