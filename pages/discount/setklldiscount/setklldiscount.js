// pages/discount/setklldiscount/setklldiscount.js
var moneynum = ""
var calorienum = ""
var itemid = ''
var message = ''
var remoneynum=''
var recalorienum=''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        moneytext:'',
        calorietext:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(t) {
        var a=this
        if (t.itemid == '' || t.itemid == undefined) {

        } else {
            itemid = t.itemid
            wx.request({
                url: 'https://paokucoin.com/app/index.php?i=1&c=entry&m=ewei_shopv2&do=mobile&r=app.payment.index.edit',
                method: 'post',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                  id:itemid
                },
                success: function(e) {
                    console.log(e.data)
                    
                    a.setData({
                        moneytext:e.data.result.data.money,
                        calorietext: e.data.result.data.deduct
                    })
                }
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
            wx.request({
                url: 'https://paokucoin.com/app/index.php?i=1&c=entry&m=ewei_shopv2&do=mobile&r=app.payment.index.set',
                data: {
                    money: moneynum,
                    deduct: calorienum,
                    cate: 1
                },
                success: function(e) {
                    console.log(e.data)
                    if (e.data.status == 0) {
                        message = e.data.result.message
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
                        message = e.data.result.message
                        wx.showModal({
                            title: '提示',
                            content: message,
                            success: function(res) {
                                if (res.confirm) { //这里是点击了确定以后
                                    console.log('用户点击确定')
                                    wx.navigateTo({
                                        url: '/pages/discount/klldiscount/klldiscount',
                                    })
                                } else { //这里是点击了取消以后
                                    console.log('用户点击取消')
                                }
                            }
                        })
                        // wx.navigateTo({
                        //     url: '/pages/discount/klldiscount/klldiscount',
                        // })
                    }
                }
            })

        } else {
            console.log('有itemid')
            console.log(itemid)
            console.log(moneynum, calorienum)
            console.log(this.data.moneytext, this.data.calorietext)
            if (moneynum != this.data.moneytext){
                console.log('输入框没有变化')
                remoneynum = this.data.moneytext
            }else{
                remoneynum = moneynum
            }
            if (calorienum != this.data.calorietext) {
                console.log('输入框没有变化')
                recalorienum = this.data.calorietext
            } else {
                recalorienum = calorienum
            }
            console.log(moneynum, calorienum)
            console.log(remoneynum, recalorienum)
            // remoneynum = this.data.moneytext
            // recalorienum = this.data.calorietext
            wx.request({
                url: 'https://paokucoin.com/app/index.php?i=1&c=entry&m=ewei_shopv2&do=mobile&r=app.payment.index.set',
                data: {
                    money: moneynum,
                    deduct: calorienum,
                    cate: 1,
                    id: itemid
                },
                success: function(e) {
                    console.log(e.data)
                    if (e.data.status == 0) {
                        message = e.data.result.message
                        console.log(message)
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
                        message = e.data.result.message
                        console.log(message)
                        wx.showModal({
                            title: '提示',
                            content: message,
                            success: function(res) {
                                if (res.confirm) { //这里是点击了确定以后
                                    console.log('用户点击确定')
                                    // wx.navigateTo({
                                    //     url: '/pages/discount/klldiscount/klldiscount',
                                    // })
                                } else { //这里是点击了取消以后
                                    console.log('用户点击取消')
                                }
                            }
                        })
                    }
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