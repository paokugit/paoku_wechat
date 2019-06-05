// pages/discount/zkbaccount/zkbaccount.js
var a, e, i = getApp(),
    s = i.requirejs("core");
//   当前登录人的openid
var f = getApp();
var userinfo = f.getCache('userinfo');
var t = getApp(), a = t.requirejs("core");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: i.globalData.appimg,
        type: 1,
        isopen: !1,
        page: 1,
        loaded: !1,
        loading: !0,
        incomelist: [],
        paylist: [],
        list:[],
        credit:''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    codebtn:function(){
        wx.showModal({
            title: '提示',
            content: '暂未开放',
        })
        // var _this = this;
        // // 允许从相机和相册扫码
        // wx.scanCode({
        //     success: (res) => {
        //         console.log(res.path)
        //         wx.navigateTo({
        //             url: '/' + res.path,
        //         })
        //     }
        // })
    },
    rechargebtn:function(){
        wx.navigateTo({
            url: '/pages/discount/zkbrechange/zkbrechange',
        })
    },
    // 上拉加载
    onLoad: function (a) {
        a.type > 0 && this.setData({
            type: 1
        }), t.url(a), this.getList();
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
        }), a.get("payment/index/rebateRecord", {
            openid: userinfo.openid,
            type: t.data.type,
            page: t.data.page,
            type: t.data.type
        }, function (a) {
            console.log(a)
            var e = {
                loading: !1,
                total: a.result.total,
                show: !0,
                credit:a.result.credit3,
                list:a.result.list
                // incomelist: a.result.income,
                // paylist:a.result.pay
            };
            a.result.list || (a.result.list = []), a.result.list.length > 0 && (e.page = t.data.page + 1, e.list = t.data.list.concat(a.result.list),
                a.result.list.length < a.pagesize && (e.loaded = !0)), t.setData(e);
        });
    },
    myTab: function (t) {
        console.log(t)
        var e = this, i = a.pdata(t).type;
        e.setData({
            type: i,
            page: 1,
            list: [],
            loading: !0
        }), e.getList();
    }
})


