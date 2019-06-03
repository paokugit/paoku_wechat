// pages/discount/scancode/scancode.js
var merchid=10
var itemid=''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        text: '卡路里折扣只针对收款码付款方式有效,线上订单不影响',
        calorielist:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
        var a=this
        wx.request({
            url: 'https://paokucoin.com/app/index.php?i=1&c=entry&m=ewei_shopv2&do=mobile&r=app.payment.index.getset',
            data: {
                cate:1,
                merchid:merchid
            },
            success: function (e) {
                console.log(e.data)
               a.setData({
                   calorielist:e.data.result.list
                })
            }
        })

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