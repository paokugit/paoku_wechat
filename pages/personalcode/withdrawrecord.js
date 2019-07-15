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
        downdis: 'block',
        topdis: 'none',
        reasondis: 'none',
        // 组件所需的参数
        nvabarData: {
            showCapsule: 1,
            title: '提现记录',
            height: i.globalData.height * 2 + 30,
        },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(a) {
        var userinfo = f.getCache('userinfo');
        useropenid = userinfo.openid
        this.getList();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.data.loaded || this.data.list.length == this.data.total || this.getList();
    },
    getList: function() {
        var t = this;
        t.setData({
            loading: !0
        }), s.get("payment/myown/draw_log", {
            openid: useropenid,
            page: t.data.page,
        }, function(a) {
            console.log(a)
            if (a.result.list.length > 0) {} else {
                // t.setData({
                //     maskDis:'block'
                // })
            }
            var e = {
                loading: !1,
                show: !0,
                list: a.result.list
            };
            a.result.list || (a.result.list = []), a.result.list.length > 0 && (e.page = t.data.page + 1, e.list = t.data.list.concat(a.result.list),
                a.result.list.length < a.result.pagesize && (e.loaded = !0)), t.setData(e);
        });
    },
    downbtn: function() {
        this.setData({
            downdis: 'none',
            topdis: 'block',
            reasondis: 'block'
        })
    },
   topbtn: function () {
        this.setData({
            topdis: 'none',
            downdis: 'block',
            reasondis: 'none'
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})