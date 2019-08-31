var a, e, i = getApp(),
    s = i.requirejs("core");
//   当前登录人的openid
var f = getApp();
var t = getApp(),
    a = t.requirejs("core");
var useropenid = ''
const app = getApp()
var interval = new Object();
var secend_time = ""
var timestampcount = ""
var util = require('../../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: i.globalData.appimg,
        // 组件所需的参数
        nvabarData: {
            showCapsule: 1,
            title: '限时秒杀',
            height: i.globalData.height * 2 + 20,
        },
        countDownHour: 0,
        countDownMinute: 0,
        countDownSecond: 0,
        type: 1,
        isopen: !1,
        page: 1,
        loaded: !1,
        loading: !0,
        list: [],
        credit: '',
        upcomeDis: 'block',
        notbeginDis: 'none'
    },
    /**
     * 生命周期函数--监听页面加载
     */

    // 上拉加载
    onLoad: function() {

    },
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.getList();
        var t = this
        a.get("seckill/list", {
            type: 2,
            page: 1,
        }, function(e) {
            console.log(e)
            if (e.status == 1) {
                secend_time = e.result.end_time
                console.log(secend_time)
                var TIME = util.formatTime(new Date());
                var timestamp = Date.parse(new Date());
                timestampcount = timestamp / 1000
                console.log(secend_time - timestampcount)
                t.startTimer(secend_time - timestampcount);
            } else if (e.status == 0) {
                t.setData({
                    upcomeDis: 'none',
                    notbeginDis: 'block',
                })
            }

        })

    },
    startTimer: function(currentstartTimer) {
        clearInterval(interval);
        interval = setInterval(function() {
            // 秒数
            var second = currentstartTimer;
            // 天数位
            var day = Math.floor(second / 3600 / 24);
            var dayStr = day.toString();
            if (dayStr.length == 1) dayStr = '0' + dayStr;

            // 小时位
            var hr = Math.floor((second) / 3600);
            var hrStr = hr.toString();
            if (hrStr.length == 1) hrStr = '0' + hrStr;

            // 分钟位
            var min = Math.floor((second - hr * 3600) / 60);
            var minStr = min.toString();
            if (minStr.length == 1) minStr = '0' + minStr;

            // 秒位
            var sec = second - hr * 3600 - min * 60;
            var secStr = sec.toString();
            if (secStr.length == 1) secStr = '0' + secStr;

            this.setData({
                countDownDay: dayStr,
                countDownHour: hrStr,
                countDownMinute: minStr,
                countDownSecond: secStr,
            });
            currentstartTimer--;
            if (currentstartTimer <= 0) {
                clearInterval(interval);
                this.setData({
                    countDownDay: '00',
                    countDownHour: '00',
                    countDownMinute: '00',
                    countDownSecond: '00',
                });
            }
        }.bind(this), 1000);
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
        this.startTimer(secend_time - timestampcount);
    },
    onReachBottom: function() {
        this.data.loaded || this.data.list.length == this.data.total || this.getList();
    },
    getList: function() {
        var t = this;
        t.setData({
            loading: !0
        }), a.get("seckill/list", {
            type: t.data.type,
            page: t.data.page,
        }, function(a) {
            console.log(a)
            if (a.status == 1) {
                var e = {
                    loading: !1,
                    total: a.result.total,
                    show: !0,
                    list: a.result.list,
                };
                a.result.list || (a.result.list = []), a.result.list.length > 0 && (e.page = t.data.page + 1, e.list = t.data.list.concat(a.result.list),
                    a.result.list.length < a.result.pageSize && (e.loaded = !0)), t.setData(e);
            }

        });
    },
    myTab: function(t) {
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