var t = getApp().requirejs("core");
var ii = getApp();
// console.log(ii.globalData.appimg)
//   当前登录人的openid
var f = getApp();
var userinfo = f.getCache('userinfo');
// console.log(userinfo)
Page({
    data: {
        globalimg: ii.globalData.appimg,
        level: 1,
        page: 1,
        list: [],
        agentcount:''
    },
    onLoad: function () {
        this.getSet(), this.getList();
        var that=this
        t.get("commission/index", {}, function (t) {
            console.log(t)
            that.setData({
                recommendid:t.member.id,
                agentname: t.agentname,
            })
        })
    },
    onReachBottom: function () {
        this.data.loaded || this.data.list.length == this.data.total || this.getList();
    },
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh();
    },
    getSet: function () {
        var e = this;
        t.get("commission/down/get_set", {}, function (t) {
            wx.setNavigationBarTitle({
                title: t.textdown + "(" + t.total + ")"
            }), delete t.error, t.show = !0, e.setData(t);
        });
    },
    getList: function () {
        var e = this;
        t.get("commission/down/get_list", {
            openid:userinfo.openid,
            page: e.data.page,
            level: e.data.level
        }, function (t) {
            console.log(t)
            var a = {
                total: t.total,
                pagesize: t.pagesize,
                list:t.list
            };
            t.list.length > 0 && (a.page = e.data.page + 1, a.list = e.data.list.concat(t.list),
            t.list.length < t.pagesize && (a.loaded = !0)), e.setData(a);
        }, this.data.show);
    },
    transmit:function(){
        wx.navigateTo({
            url: '../transmit/transmit',
        })
    },
    myTab: function (e) {
        var a = this, i = t.pdata(e).level;
        a.setData({
            level: i,
            page: 1,
            list: []
        }), a.getList();
    },
    onShareAppMessage: function (res) {
        // return s.onShareAppMessage();
        var that = this;
        return {
            title: '原来微信步数可以当钱用，快来和我一起薅羊毛',
            path: '/pages/index/index?id=' + that.data.scratchId,
            success: function (res) {
                // 转发成功

                that.shareClick();
            },
            fail: function (res) {
                // 转发失败
            }
        }
        }
});