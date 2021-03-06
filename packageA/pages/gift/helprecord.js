// pages/contribute/record/record.js
var a, e, i = getApp(),
    s = i.requirejs("core");
//   当前登录人的openid
var f = getApp();
var userinfo = f.getCache('userinfo');
var useropenid = ''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: i.globalData.appimg,
        page: 1,
        list: [],
        maskDis: 'none',
        
        showIcon: true,
        gloheight: i.globalData.gloheight
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (a) {
        var userinfo = f.getCache('userinfo');
        useropenid = userinfo.openid
        this.getList();
    },
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function () {
        this.data.loaded || this.data.list.length == this.data.total || this.getList();
    },
    getList: function () {
        var t = this;
        t.setData({
            loading: !0
        }), s.get("game/index/getstep", {
            openid: useropenid,
            page: t.data.page,
        }, function (a) {
            console.log(a)
            var e = {
                loading: !1,
                show: !0,
                list: a.result.list
            };
            a.result.list || (a.result.list = []), a.result.list.length > 0 && (e.page = t.data.page + 1, e.list = t.data.list.concat(a.result.list),
                a.result.list.length < a.result.pagesize && (e.loaded = !0)), t.setData(e);
        });
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})