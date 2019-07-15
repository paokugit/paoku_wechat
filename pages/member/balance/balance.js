// pages/member/balance/balance.js
var t = getApp(),
    a = t.requirejs("core");
// console.log(t.globalData.appimg)
//   当前登录人的openid
var f = getApp();
var userinfo = f.getCache('userinfo');
console.log(userinfo)
var formid=''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: t.globalData.appimg,
        // 组件所需的参数
        nvabarData: {
            showCapsule: 1, 
            title: '余额账户',
            height: t.globalData.height * 2 + 20,
        },
        credit2:'',
        balance_total:'',
        come_total:'',
        frozen_credit2: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var t=this
        a.get('member/log/member_money',{
            openid:userinfo.openid
        },function(e){
            console.log(e)
            t.setData({
                credit2:e.info.credit2,
                balance_total: e.info.balance_total,
                come_total: e.info.come_total,
                frozen_credit2: e.info.frozen_credit2
            })
        })

  
    },
    form_submit: function (e) {
        console.log(e.detail.formId);
        formid = e.detail.formId
        a.get("message/collect", {
            openid: userinfo.openid,
            formid: formid
        }, function (event) {
            console.log(event)
        })

    },
    txBtn:function(){
        wx.navigateTo({
            url: '../withdraw/index',
        })
    },
    mxBtn: function () {
        wx.navigateTo({
            url: '../detail/detail',
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
    onShareAppMessage: function () {

    }
})