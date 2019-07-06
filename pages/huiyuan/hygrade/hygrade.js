// pages/huiyuan/hygrade/hygrade.js
var a, e, i = getApp(),
    s = i.requirejs("core"),
    n = i.requirejs("wxParse/wxParse"),
    r = i.requirejs("biz/diyform"),
    d = i.requirejs("biz/goodspicker"),
    c = (i.requirejs("foxui"),
        i.requirejs("jquery"));
// console.log(i.globalData.appimg)
var hyid=''
var content=''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: i.globalData.appimg,
        // 组件所需的参数
        nvabarData: {
            showCapsule: 1, 
            title: '会员等级', 
            height: i.globalData.height * 2 + 20,
        },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        // console.log(options.hyid)
        hyid = options.hyid
        var a = this;
        let open = wx.getStorageSync('openid')
        s.get("goods/get_list", {
            page: 1,
            cate: 4,
            openid: open
        }, function(e) {
            // console.log(111)
            console.log(e)
            // content = e.list.content.replace(/<\/?[^>]*>/g, '')
            var i = {
                loading: false,
                total: e.total,
                pagesize: e.pagesize,
                list: e.list,

            };
            a.setData(i)

        })
        

    },
    hyopen: function (e) {
        var tt=this
        console.log(e)
        hyid=e.currentTarget.dataset.id
        // console.log(hyid)
        let open = wx.getStorageSync('openid')
        s.get("order/create", {
            id: hyid,
            'goods[0][id]': hyid,
            'goods[0][goodsid]': hyid,
            openid: open
        }, function (eve) {

            console.log(eve)
            var i = {
                loading: false,
                // order:f.orderid
            };
            tt.setData(i)
            // 跳转收银台
            // wx.navigateTo({
            //     url: "/pages/order/pay/index?id=" + eve.orderid
            // })
            // 跳转确认订单页
            wx.navigateTo({
                url: "/pages/order/create/index?id=" + hyid
            })
            })
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
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})