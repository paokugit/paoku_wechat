// pages/playmethod/playmethod/playmethod.js
var t = getApp(),
    a = t.requirejs("core");
// console.log(t.globalData.appimg)
Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: t.globalData.appimg,
        src: '',
        type: 1,
        page: 1,
        list: [],
        helplist: [],
        play: 0,
      showIcon: true,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 1000
        });
        var t = this
        a.get("myown/novice/novice_list", {
            page: this.data.page
        }, function(e) {
            console.log(e)
            wx.hideLoading()
            if (e.error == 0) {
                t.setData({
                    list: e.message
                })

            }
        });
        a.get("myown/novice/help", {
            page: this.data.page
        }, function(e) {
            console.log(e)
            if (e.error == 0) {
                t.setData({
                    helplist: e.message
                })
            }
        });

    },
    detailbtn: function(e) {
        console.log(e)
        wx.navigateTo({
            url: '/packageA/pages/playmethod/hotdetail/hotdetail?id=' + e.currentTarget.dataset.id,
        })
    },
    helpdetailbtn: function(eve) {
        console.log(eve)
        wx.navigateTo({
            url: '/packageA/pages/playmethod/helpdetail/helpdetail?id=' + eve.currentTarget.dataset.id,
        })
    },
    feedbackbtn: function() {
        wx.navigateTo({
            url: '/packageA/pages/playmethod/feedback/feedback',
        })
    },
    //视频的点击放大播放
    playvideo: function() {
        console.log('1')
        var that = this
        that.setData({
            play: 1,
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
        // this.videoContext = wx.createVideoContext('myvideo', this);
        // this.videoContext.requestFullScreen({ direction: 90 });
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
    myTab: function(t) {
        console.log(t)
        console.log(a.pdata(t))
        var e = this,
            i = a.pdata(t).type;
        e.setData({
            type: i,
            page: 1,
            // list: [],
            loading: !0
        });
    }
})