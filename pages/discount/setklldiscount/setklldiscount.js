// pages/discount/setklldiscount/setklldiscount.js
var moneynum=""
var calorienum=""
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    setmoney: function (e) {
        moneynum = e.detail.value
       console.log(moneynum)
    },
    setcalorie: function (e) {
        calorienum = e.detail.value
        console.log(calorienum)
    },
    // 确认
    confirm:function(){
        console.log(moneynum, calorienum)
        wx.request({
            url: 'https://paokucoin.com/app/index.php?i=1&c=entry&m=ewei_shopv2&do=mobile&r=app.payment.index.set',
            method: 'post',
            data: {
                money: moneynum,
                deduct: calorienum,
                cate:1
            },
            success: function (e) {
                console.log(e.data)
                // t.setData({
                //     usercredit: e.data.result.credit1
                // })
            }
        })
        // wx.navigateTo({
        //     url: '/pages/discount/klldiscount/klldiscount',
        // })
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