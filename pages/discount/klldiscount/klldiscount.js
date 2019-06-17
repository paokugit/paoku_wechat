// pages/discount/scancode/scancode.js
var a, e, i = getApp(),
    s = i.requirejs("core");
var t = getApp().requirejs("core");
//   当前登录人的openid
var f = getApp();
var merchid=''
var itemid=''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        text: '卡路里折扣只针对收款码付款方式有效,线上订单不影响',
       list:[],
        page: 1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var userinfo = f.getCache('userinfo');
        merchid=userinfo.merchInfo.id
        console.log(merchid)
        this.getSet(), this.getList();
    },
    getList: function () {
        var e = this;
        t.get("payment/index/getset", {
            page: e.data.page,
            cate: 1,
            merchid: merchid,
        }, function (t) {
            console.log(t)
            var a = {
                total: t.result.total,
                pagesize: t.result.pageSize,
                list: t.result.list,
            };
            t.result.list.length > 0 && (a.page = e.data.page + 1, a.list = e.data.list.concat(t.result.list),
                t.result.list.length < t.result.pageSize && (a.loaded = !0)), e.setData(a);
        }, this.data.show);
    },
    getSet: function () {
        var e = this;
        t.show = !0, e.setData(t);
    },

    addbtn: function () {
        wx.navigateTo({
            url: '/pages/discount/setklldiscount/setklldiscount',
        })
    },
    orderbtn:function(t){
        console.log(t.currentTarget.dataset.id)
        itemid = t.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/discount/setklldiscount/setklldiscount?itemid='+itemid,
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
      wx.switchTab({
        url: '/pages/discount/discount/discount',
      })
      console.log('监听页面卸载');
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.data.loaded || this.data.list.length == this.data.total || this.getList();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})