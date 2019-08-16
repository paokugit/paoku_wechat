// pages/huiyuan/pay_succeed/pay_succeed.js
var t = getApp(),
    a = t.requirejs("core");
var f = getApp();

var useropenid = ""; //用户openid

var order_id = ""; //用于接收页面传值

Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: t.globalData.appimg,
        // 组件所需的参数
        nvabarData: {
            showCapsule: 1,
            title: '支付成功',
            height: t.globalData.height * 2 + 20,
        },
        pay_money: "", //加速宝金额
        pay_time: "", //加速宝日期
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var userinfo = f.getCache('userinfo');
        useropenid = userinfo.openid
        var b = this;

        console.log(options.order_id);

        order_id = options.order_id; //订单ID获取

        a.get("myown.acceleration.back_message", {
            openid: useropenid,
            order_id: order_id
        }, function(e) {
            console.log(e);
            b.setData({
                pay_money: e.message.money + "元加速宝权益已生效",
                pay_time: "到期时间" + e.message.accelerate_end.substring(0, 4) + "年" + e.message.accelerate_end.substring(5, 7) + "月" + e.message.accelerate_end.substring(8, 10) + "日",
            })
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    // 支付成功返回一级页面
    pay_btn: function() {
        wx.navigateTo({
            url: '/packageA/pages/huiyuan/membercenter/membercenter'
        })
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