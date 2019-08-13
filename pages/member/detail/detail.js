var t = getApp(), a = t.requirejs("core");
//   当前登录人的openid
var f = getApp();
var userinfo = f.getCache('userinfo');
console.log(userinfo)
Page({
    data: {
        globalimg: f.globalData.appimg,
        icons: t.requirejs("icons"),
        type: 1,
        isopen: !1,
        page: 1,
        loaded: !1,
        loading: !0,
        list: [],
        downdis: 'block',
        topdis: 'none',
        reasondis: 'none',
        // 组件所需的参数
        nvabarData: {
            showCapsule: 1, 
            title: '明细', 
            height: f.globalData.height * 2 + 20,
        },
    },
    // 上拉加载
    onLoad: function (a) {
        a.type > 0 && this.setData({
            type: 2
        }), t.url(a), this.getList();
    },
    downbtn: function (e) {
        console.log(e.currentTarget.dataset.id)
        this.setData({
            downdis: 'none',
            topdis: 'block',
            reasondis: 'block'
        })
    },
    topbtn: function (e) {
        //    console.log(e.currentTarget.dataset.id)
        this.setData({
            topdis: 'none',
            downdis: 'block',
            reasondis: 'none'
        })
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
        }), a.get("member/log/money_log", {
            openid:userinfo.openid,
            type: t.data.type,
            page: t.data.page,
            type:t.data.type
        }, function (a) {
            console.log(a)
            var e = {
                loading: !1,
                total: a.total,
                show: !0,
                list:a.list
            };
            if (1 == t.data.page) {
                e.isopen = a.isopen;
                var i = "明细";
                wx.setNavigationBarTitle({
                    title: i
                });
            }
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
});