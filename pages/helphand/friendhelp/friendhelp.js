var a, e, i = getApp(), s = i.requirejs("core"), n = i.requirejs("wxParse/wxParse"), o = i.requirejs("biz/diypage"),
    r = i.requirejs("biz/diyform"), d = i.requirejs("biz/goodspicker"), c = (i.requirejs("foxui"),
        i.requirejs("jquery"));
var t = getApp(),
    a = t.requirejs("core");
var i = getApp(),
    s = i.requirejs("core");
// p = i.requirejs("wxParse/wxParse");
var n = getApp();
var userinfo = '';
var steptoday = ''
var creditsum = ''
var creditprice = ''
var addstep=''
var formid = ''
Page({
    data: {
        globalimg: i.globalData.appimg,
        notadaDis: 'none',
        listDis: 'block',
        maskDis: 'none',
        goalDis: 'block',
        finishDis: 'none',
        isopen: !1,
        page: 1,
        loaded: !1,
        loading: !0,
        steptoday:'',
        creditsum:'',
        creditprice:'',
        addstep:'',
        helpList: [],
    },
    maskshow: function () {
        this.setData({
            maskDis: 'block'
        })
    },
    hidemask: function () {
        this.setData({
            maskDis: 'none'
        })
    },
    refresh: function (e) {
        console.log(e)
    },
    myList: function () {
        wx.navigateTo({
            url: '../mypowerlist/mypowerlist?openid=' + userinfo.openid+'&mid='+userinfo.id,
        })
    },
    form_submit: function (e) {
        console.log(e.detail.formId);
        formid = e.detail.formId
        s.get("message/collect", {
            openid: userinfo.openid,
            formid: formid
        }, function (event) {
            console.log(event)
        })

    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      userinfo = n.getCache('userinfo');
        console.log(options)
        a.type > 0 && this.setData({
            type: 1
        }), t.url(a), this.getList();
    },
    getList: function () {
        var t = this;
        t.setData({
            loading: !0
        }),
            a.get("help/index/helplist", {
            mids: userinfo.id,
            openid: userinfo.openid
            }, function (a) {
                console.log(a)
                if (a.message=='暂无助力信息'){
                    t.setData({
                        notadaDis:'block',
                        listDis: 'none'
                    })
                }else{
                    var e = {
                        loading: !1,
                        show: !0,
                        helpList: a.helpList.slice(0, 5)
                    };
                    t.setData(e)
                }
            }),
            // 刷新步数
            a.get("refresh_step", {
            openid: userinfo.openid
            }, function (f) {
                console.log(f)
                if (f.result.step == 0 ){
                    t.setData({
                        goalDis: 'none',
                        finishDis: 'block'
                    }) 
                }else{
                    t.setData({
                        loading: !1,
                        show: !0,
                        result: f.result
                    })
                }
               
            })
            // 今日目标已完成加xx步
        a.get("help/index/helpstep_today", {
            openid: userinfo.openid
        }, function(a){
            console.log(a)
            addstep = a.result.step
            t.setData({
                addstep: addstep
            })
        })
        // 累计邀请人数
        a.get("help/index/help_count", {
            openid: userinfo.openid
            },function(eve){
            console.log(eve)
                steptoday = eve.message.step_today
                creditsum = eve.message.credit_sum
                creditprice = eve.message.credit_price
            t.setData({
                steptoday: steptoday,
                creditsum: creditsum,
                creditprice: creditprice
            })
            })

    },
    
    createHbao() {
        wx.navigateTo({
            url: '../haibao/haibao',
        })
    },
    // onShareAppMessage: function (res) {
    //     return s.onShareAppMessage();
    // },

    onShareAppMessage: function (res) {
        return this.setData({
            maskDis:'none'
        }), s.onShareAppMessage();
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
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },


})