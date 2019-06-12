// pages/discount/recordlist/recordlist.js
var a, e, i = getApp(),
    s = i.requirejs("core");
//   当前登录人的openid
var f = getApp();
var merchid=''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        recordlist:[],
        totalmoney:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        var userinfo = f.getCache('userinfo');
        merchid=userinfo.merchInfo.id
        console.log(merchid)
        var a=this
        s.get("payment/index/oldrecord", {
            merchid: merchid,
            page:a.data.page,
            cate:options.cate
        }, function (e) {
            console.log(e)
            if(e.status==0){
                wx.showModal({
                    title: '提示',
                    content: '暂无数据',
                })
            }else{
                a.setData({
                    recordlist: e.result,
                    totalmoney: e.result.total_money
                })
            }
           
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