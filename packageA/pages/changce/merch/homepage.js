// pages/store/zhuye.js
var a, e, i = getApp(),
    s = i.requirejs("core");
var f = getApp();
var useropenid = ''
var merchphone = ''
var merchid = ''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: i.globalData.appimg,
        showIcon: true,
        gloheight: i.globalData.gloheight,
        
        merchname: '',
        logo: "", 
        address: "",
        wxsignal: "",
        main_business: "",
        shopimg: [],
        shopvideo: "",
        distance: "",
        follow: '',
        play: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var a = this
        var userinfo = f.getCache('userinfo');
        useropenid = userinfo.openid
        
      console.log(options);

        var newpos = i.getCache("mypos");
        s.get("myown/shophome/index", {
            openid: useropenid,
            merch_id: options.id,
            lat: newpos.lat,
            lng: newpos.lng
        }, function (e) {
            console.log(e)
          console.log(e.message.logo);
            merchphone = e.message.mobile
            merchid = e.message.id
            a.setData({
                show: !0,
                merchid: merchid,
                merchname: e.message.merchname,
                logo: e.message.logo,
                address: e.message.address,
                wxsignal: e.message.wxsignal,
                main_business: e.message.main_business,
                shopimg: e.message.shopimg,
                shopvideo: e.message.shopvideo,
                distance: e.message.distance,
                follow: e.message.follow
            })

        })
    },
    //关注
    follow: function () {
        var a = this
        var userinfo = f.getCache('userinfo');
        useropenid = userinfo.openid
        s.get("myown.shophome.follow", {
            openid: useropenid,
            merch_id: merchid,
            follow: 1,
        }, function (e) {
            a.setData({
                follow: 1
            })
        })
    },
    removeattention: function () {
        var a = this
        var userinfo = f.getCache('userinfo');
        useropenid = userinfo.openid
        s.get("myown.shophome.follow", {
            openid: useropenid,
            merch_id: merchid,
            follow: 0,
        }, function (e) {
            a.setData({
                follow: 0
            })
        })
    },
    //长按复制微信号
    copy: function () {
        var that = this;
        wx.setClipboardData({
            data: that.data.context_weixin,
            success: function (res) {
                wx.showToast({
                    title: '复制微信号成功',
                    icon: 'none',
                });
            }
        });
    },
    //地图
    navigation: function () {
        wx.navigateTo({
            url: '/packageA/pages/changce/merch/intro?id=' + merchid,

        })
    },

    // 拨打电话
    tel: function (t) {
        console.log(merchphone)
        wx.makePhoneCall({
            phoneNumber: merchphone,
        })
    },
    //图片
    enlarge: function () {
        wx.navigateTo({
            url: '/packageA/pages/changce/merch/businesspictures?id=' + merchid
        })
    },
    more: function () {
        wx.navigateTo({
            url: '/packageA/pages/changce/merch/businesspictures?id=' + merchid
        })
    },
    //图片的点击放大预览
    previewImage: function (res) {
        var imgsrc = res.target.dataset.src;
        var imglist = res.target.dataset.imglist
        wx.previewImage({
            current: imgsrc,
            urls: imglist,
        })
    },
    //视频的点击放大播放
    playvideo: function () {
        var that = this
        that.setData({
            play: 1,
        })
    },
    nonemask: function () {
        var that = this
        that.setData({
            play: 0,
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

    },

})