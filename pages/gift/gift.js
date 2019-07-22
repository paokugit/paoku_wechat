// pages/contribute/record/record.js
var a, e, i = getApp(),
    s = i.requirejs("core");
//   当前登录人的openid
var f = getApp();
// var userinfo = f.getCache('userinfo');
var useropenid = ''
var errormessgae = ""
var formid = ""
var invitedid = ''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: i.globalData.appimg,
        page: 1,
        list: [],
        type: 1,
        helpDis: 'none',
        explainDis: "none",
        goal: '',
        help_count: '',
        remain: '',
        gradelevel: '',
        gradegift: '',
        helplist: [],
        starttime: '',
        endtime: '',
        primarylist: [],
        middlelist: [],
        highlist: [],
        friendavatar:'',
        // 组件所需的参数
        nvabarData: {
            showCapsule: 1,
            title: '助力免费领礼品',
            height: i.globalData.height * 2 + 20,
        },
    },
    explainbtn: function() {
        this.setData({
            explainDis: 'none'
        })
    },
    form_submit: function(e) {
        console.log(e.detail.formId);
        formid = e.detail.formId
        s.get("message/collect", {
            openid: userinfo.openid,
            formid: formid
        }, function(event) {
            console.log(event)
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(a) {
        console.log(a)
        var userinfo = f.getCache('userinfo');
        console.log(userinfo)
        useropenid = userinfo.openid
        var tt = this
        if (a.invitedid != undefined && a.invitedid != "") {
            console.log('通过分享进入')
            tt.setData({
                // helpDis:'block',
                friendavatar: userinfo.avatarUrl
            })
        } else {
            console.log('非')
            // tt.setData({
            //     helpDis: 'none'
            // })
        }
       
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
        }), s.get("myown/devote/dovate_log", {
            openid: useropenid,
            page: t.data.page,
        }, function(a) {

            var e = {
                loading: !1,
                show: !0,
                list: a.message.list
            };
            a.message.list || (a.message.list = []), a.message.list.length > 0 && (e.page = t.data.page + 1, e.list = t.data.list.concat(a.message.list),
                a.message.list.length < a.message.pagesize && (e.loaded = !0)), t.setData(e);
        });
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
        var t = this
        s.get("game/index/free", {
            openid: useropenid
        }, function(e) {
            console.log(e)
            if (e.status == 1) {
                t.setData({
                    goal: e.result.all,
                    help_count: e.result.help_count,
                    remain: e.result.remain,
                    gradelevel: e.result.agentlevel,
                    gradegift: e.result.gift,
                    helplist: e.result.new_member,
                    starttime: e.result.start,
                    endtime: e.result.end,
                    primarylist: e.result.goods[0].thumbs,
                    middlelist: e.result.goods[1].thumbs,
                    highlist: e.result.goods[2].thumbs
                });
            } else {
                errormessgae = e.result.message
                wx.showModal({
                    title: '提示',
                    content: errormessgae,
                })
            }

        });

        s.get("game/index/getgift", {
            openid: useropenid
        }, function(e) {
            console.log(e)
            // if (e.status == 1) {

            // } else {
            //     errormessgae = e.result.message
            //     wx.showModal({
            //         title: '提示',
            //         content: errormessgae,
            //     })
            // }

        });
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
    onShareAppMessage: function(res) {
        // return s.onShareAppMessage();
        var that = this;
        return {
            title: '原来微信步数可以当钱用，快来和我一起薅羊毛',
            path: '/pages/gift/gift?invitedid=' + useropenid,
            success: function(res) {
                // 转发成功

                that.shareClick();
            },
            fail: function(res) {
                // 转发失败
            }
        }
    },
    myTab: function(t) {
        console.log(t)
        console.log(s.pdata(t))
        var e = this,
            i = s.pdata(t).type;
        e.setData({
            type: i,
            page: 1,
            list: [],
            loading: !0
        }), e.getList();
    }
})