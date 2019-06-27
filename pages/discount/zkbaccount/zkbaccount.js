// pages/discount/zkbaccount/zkbaccount.js
var a, e, i = getApp(),
    s = i.requirejs("core");
//   当前登录人的openid
var f = getApp();
var t = getApp(),
    a = t.requirejs("core");
var useropenid = ''
var conbind = ''
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
        list: [],
        credit: ''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    withdrawbtn: function() {
        // wx.showModal({
        //     title: '提示',
        //     content: '暂未开放',
        // })
        console.log(conbind)
        if (conbind == 0) {
            wx.showModal({
                title: '提示',
                content: '您还未开通贡献值',
            })
        } else if (conbind == 1) {
            wx.navigateTo({
                url: '/pages/contribute/withdraw/withdraw',
            })
        }
    },
    transferbtn: function() {
       wx.navigateTo({
           url: '/pages/discount/transfer/transfer',
       })
    },
    rechargebtn: function() {
        wx.navigateTo({
            url: '/pages/discount/zkbrechange/zkbrechange',
        })
    },
    // 上拉加载
    onLoad: function(a) {
        var userinfo = f.getCache('userinfo');
        useropenid = userinfo.openid
        s.get("myown/devote/msg", {
            openid: useropenid,
        }, function(e) {
            console.log(e)
            if (e.error == 0) {
                conbind = e.message.bind
            }
        })
        a.type > 0 && this.setData({
            type: 1
        }), t.url(a), this.getList();
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
        }), a.get("payment/index/rebateRecord", {
            openid: useropenid,
            type: t.data.type,
            page: t.data.page,
            type: t.data.type
        }, function(a) {
            console.log(a)
            var e = {
                loading: !1,
                total: a.result.total,
                show: !0,
                credit: a.result.credit3,
                list: a.result.list
                // incomelist: a.result.income,
                // paylist:a.result.pay
            };
            a.result.list || (a.result.list = []), a.result.list.length > 0 && (e.page = t.data.page + 1, e.list = t.data.list.concat(a.result.list),
                a.result.list.length < a.pagesize && (e.loaded = !0)), t.setData(e);
        });
    },
    myTab: function(t) {
        console.log(t)
        console.log(a.pdata(t))
        var e = this,
            i = a.pdata(t).type;
        e.setData({
            type: i,
            page: 1,
            list: [],
            loading: !0
        }), e.getList();
    }
})