
var a, e, i = getApp(), s = i.requirejs("core"), n = i.requirejs("wxParse/wxParse"),
    r = i.requirejs("biz/diyform"), d = i.requirejs("biz/goodspicker"), c = (i.requirejs("foxui"),
        i.requirejs("jquery"));
//   当前登录人的openid
var f = getApp();
var userinfo = f.getCache('userinfo');
console.log(userinfo)
var memberid = ''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: i.globalData.appimg,
      showIcon: false,
      gloheight: i.globalData.gloheight,
        total: 1,
        page: 1,
        loaded: !1,
        loading: !0,
        list: [],
        hydisp: 'none',
        id: '',
        minprice: '',
        title: '',
        productprice: ''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var a = this;
        s.get("goods/get_list", {
            page: 1,
            cate: 4,
            openid: userinfo.openid
        }, function (e) {
            console.log(111)
            console.log(e)
            var i = {
                loading: false,
                total: e.total,
                pagesize: e.pagesize,
                list: e.list
            };
            a.setData(i)
        })




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
        console.log(userinfo.openid)
        s.get("member", {
            openid: userinfo.openid
        }, function (u) {
            if (u.levelid != 0) {
                wx.reLaunch({
                    url: "/packageA/pages/huiyuan/membercenter/membercenter"
                })
            }

            // a.setData(ii)
        })
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

    /**
     * 用户点击右上角分享
     */
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
})