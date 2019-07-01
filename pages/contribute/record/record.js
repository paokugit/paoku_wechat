// pages/contribute/record/record.js
var a, e, i = getApp(),
    s = i.requirejs("core");
//   当前登录人的openid
var f = getApp();
var userinfo = f.getCache('userinfo');
var useropenid=''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: i.globalData.appimg,
        page:1,
        list:[],
        maskDis:'none',
        // 组件所需的参数
        nvabarData: {
            showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
            title: '变动记录', //导航栏 中间的标题
            // 此页面 页面内容距最顶部的距离
            height: i.globalData.height * 2 + 20,
        },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (a) {
        var userinfo = f.getCache('userinfo');
        useropenid=userinfo.openid
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
        }), s.get("myown/devote/dovate_log", {
            openid: useropenid,
            page: t.data.page,
        }, function (a) {
            console.log(a)
            if (a.message.list.length>0){
            }else{
                t.setData({
                    maskDis:'block'
                })
            }
            var e = {
                loading: !1,
                show: !0,
                list:a.message.list
            };
            a.message.list || (a.message.list = []), a.message.list.length > 0 && (e.page = t.data.page + 1, e.list = t.data.list.concat(a.message.list),
                a.message.list.length < a.message.pagesize && (e.loaded = !0)), t.setData(e);
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