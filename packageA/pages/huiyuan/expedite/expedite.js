// pages/huiyuan/expedite/expedite.js
var t = getApp(),
    a = t.requirejs("core");
var f = getApp();

var speedId = ""; //加速宝id
var useropenid = ""; //用户openid

var isSelect = ""; //点击显示的判断条件

var order_id = ""; //订单ID

Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: t.globalData.appimg,
        // 组件所需的参数
        nvabarData: {
            showCapsule: 1,
            title: '加速宝',
            height: t.globalData.height * 2 + 20,
        },
        list: [], //列表数据
        isShow: false, //弹出层判断
        payDay: '', //加速天数内容
        tit_one: '', //标题提示内容
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var userinfo = f.getCache('userinfo');
        useropenid = userinfo.openid
        var b = this;
        a.get("myown/acceleration/index", {}, function(e) {
            b.setData({
                list: e.message,
            })
        });
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    // 列表点击事件
    list_btn: function(e) {
        speedId = e.currentTarget.dataset.id;

        this.setData({
            isSelect: speedId,
        })
    },

    // 立即支付点击事件
    pay_btn: function(e) {
        var t = this;
        a.get("myown.acceleration.order", {
            openid: useropenid,
            id: speedId
        }, function(e) {
            console.log(e);
            order_id = e.message.order_id;

            // 支付成功判断
            if (e.error == '0') {
                wx.requestPayment({
                    timeStamp: e.message.wx.timeStamp,
                    nonceStr: e.message.wx.nonceStr,
                    package: e.message.wx.package,
                    signType: 'MD5',
                    paySign: e.message.wx.paySign,
                    success(res) {
                        console.log(res);

                        // 支付成功后的接口请求
                        a.get("myown.acceleration.wx_back", {
                            order_id: order_id
                        }, function(e) {
                            console.log(e);
                            if (e.error == "0") {
                                wx.navigateTo({
                                    url: '/packageA/pages/huiyuan/pay_succeed/pay_succeed?order_id=' + order_id,
                                })
                            }
                        })

                    },
                    fail(res) {
                        console.log(res);
                    }
                })
            };

            // 支付失败判断
            if (e.error == '1') {
                t.setData({
                    isShow: true,
                    tit_one: '请选择加速天数'
                })
            };

            // 加速期内判断
            if (e.error == '2') {
                t.setData({
                    isShow: true,
                    payDay: e.message.day + '天后结束',
                    tit_one: '已经在加速期，请结束后再买哦'
                })
            };

        });
    },

    // 弹出窗隐藏点击
    know_btn: function() {
        this.setData({
            isShow: false
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