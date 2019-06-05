// pages/discount/setklldiscount/setklldiscount.js
var a, e, i = getApp(),
    s = i.requirejs("core");
//   当前登录人的openid
var f = getApp();
var userinfo = f.getCache('userinfo');
var moneynum = ""
var calorienum = ""
var itemid = ''
var message = ''
var remoneynum = ''
var recalorienum = ''
var merchid = 10
Page({

    /**
     * 页面的初始数据
     */
    data: {
        moneytext: '',
        calorietext: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(t) {
        var a = this
        if (t.itemid == '' || t.itemid == undefined) {

        } else {
            itemid = t.itemid
            s.get("payment/index/edit", {
                merchid: merchid,
                id: itemid
            }, function(e) {
                console.log(e)
                a.setData({
                    moneytext: e.result.data.money,
                    calorietext: e.result.data.deduct
                })
            })
        }
    },
    setmoney: function(e) {
        moneynum = e.detail.value
    },
    setcalorie: function(e) {
        calorienum = e.detail.value
    },
    // 确认
    confirm: function() {
        if (itemid == '' || itemid == undefined) {
            console.log('没有itemid')
            s.get("payment/index/set", {
                money: moneynum,
                deduct: calorienum,
                cate: 1,
                merchid: merchid
            }, function(e) {
                console.log(e)
                if (e.status == 0) {
                    message = e.result.message
                    wx.showModal({
                        title: '提示',
                        content: message,
                        success: function(res) {
                            if (res.confirm) { //这里是点击了确定以后
                                console.log('用户点击确定')
                            } else { //这里是点击了取消以后
                                console.log('用户点击取消')
                            }
                        }
                    })
                } else {
                    message = e.result.message
                    wx.showModal({
                        title: '提示',
                        content: message,
                        success: function(res) {
                            if (res.confirm) { //这里是点击了确定以后
                                wx.navigateTo({
                                    url: '/pages/discount/klldiscount/klldiscount',
                                })
                            } else { //这里是点击了取消以后
                            }
                        }
                    })
                }
            })

        } else {
            console.log('有itemid')
            console.log(moneynum, calorienum)
            console.log(this.data.moneytext, this.data.calorietext)
            console.log(moneynum, calorienum)
            console.log(remoneynum, recalorienum)
            s.get("payment/index/set", {
                money: moneynum,
                deduct: calorienum,
                cate: 1,
                merchid: merchid,
                id:itemid,
            }, function (e) {
                console.log(e)
                if (e.status == 0) {
                    message = e.result.message
                    wx.showModal({
                        title: '提示',
                        content: message,
                        success: function (res) {
                            if (res.confirm) { //这里是点击了确定以后
                                console.log('用户点击确定')
                            } else { //这里是点击了取消以后
                                console.log('用户点击取消')
                            }
                        }
                    })
                } else {
                    message = e.result.message
                    wx.showModal({
                        title: '提示',
                        content: message,
                        success: function (res) {
                            if (res.confirm) { //这里是点击了确定以后
                                wx.navigateTo({
                                    url: '/pages/discount/klldiscount/klldiscount',
                                })
                            } else { //这里是点击了取消以后
                            }
                        }
                    })
                }
            })
        }



    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},

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