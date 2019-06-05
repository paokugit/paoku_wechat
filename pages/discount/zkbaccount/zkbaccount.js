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
        credit:'',
        exDis:'none',
        reDis:'none'
    },
    /**
     * 生命周期函数--监听页面加载
     */
    codebtn:function(){
        wx.navigateTo({
            url: '/pages/discount/zkbscancode/zkbscancode',
        })
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
        }, function (a) {
            console.log(a)
            // if ( a.result.pay=[]){
            //     t.setData({
            //         exDis:'block'
            //     })
            // }
            // if (a.result.income = []){
            //     t.setData({
            //         reDis: 'block'
            //     })
            // }else{
            //     t.setData({
            //         reDis: 'none'
            //     })
            // }
            var e = {
                loading: !1,
                total: a.total,
                show: !0,
                credit:a.result.credit3,
                incomelist: a.result.income,
                paylist:a.result.pay
            };
            a.list || (a.list = []), a.list.length > 0 && (e.page = t.data.page + 1, e.list = t.data.list.concat(a.list),
                a.list.length < a.pagesize && (e.loaded = !0)), t.setData(e);
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


