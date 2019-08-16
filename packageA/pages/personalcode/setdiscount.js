// pages/discount/setklldiscount/setklldiscount.js
var moneynum = ""
var calorienum = ""
var itemid = ''
var message = ''
var remoneynum = ''
var recalorienum = ''
var merchid = ''
var openid=''
var a, e, i = getApp(),
    s = i.requirejs("core");
var f = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        moneytext: '',
        calorietext: '',
        nvabarData: {
            showCapsule: 1, 
            title: '折扣宝折扣',
            height: i.globalData.height * 2 + 20,
        },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(t) {
        console.log(t)
        var userinfo = f.getCache('userinfo');
        console.log(userinfo);
        openid=userinfo.openid
        // merchid = userinfo.merchInfo.id
        var a = this
        if (t.itemid == '' || t.itemid == undefined || t == null || Object.keys(t).length === 0) {
            console.log('没有itemid')
            console.log(itemid)
        } else {
            itemid = t.itemid
            s.get("payment/index/edit", {
                id: itemid,
            }, function(e) {
                console.log(e)
                calorienum = e.result.data.deduct;
                moneynum = e.result.data.money;
                console.log(calorienum)
                console.log(moneynum)
                a.setData({
                    moneytext: e.result.data.money,
                    calorietext: e.result.data.deduct
                })
            })

        }
    },

    setmoney: function(e) {
        const that = this;
        that.setData({
            moneynum: e.detail.value
        })
    },
    setcalorie: function(e) {
        const that = this;
        that.setData({
            calorienum: e.detail.value
        })
    },
    // 确认
    confirm: function(a) {
        console.log(itemid)
        if (itemid == '' || itemid == undefined) {
            console.log('没有itemid')
            s.post("payment/index/set", {
                money: this.data.moneynum,
                deduct: this.data.calorienum,
                cate: 2,
                openid:openid,
                merchid: 0
            }, function(e) {
                console.log(e)
                if (e.status == 0) {
                    message = e.result.message
                    wx.showModal({
                        title: '提示',
                        content: message,
                        success: function(res) {
                            if (res.confirm) { 
                                console.log('确定')
                            } else { 
                                console.log('取消')
                            }
                        }
                    })
                } else {
                    message = e.result.message
                    wx.showModal({
                        title: '提示',
                        content: message,
                        success: function(res) {
                            if (res.confirm) { 
                                console.log('用户点击确定')
                                wx.navigateTo({
                                    url: '/packageA/pages/personalcode/discountlist',
                                })
                            } else { 
                                console.log('用户点击取消')
                            }
                        }
                    })
                }
            })

        } else {
            // var r = this, a = r.data;
            if (moneynum != this.data.moneynum && this.data.moneynum != undefined) {
                console.log('输入框有变化')
                remoneynum = this.data.moneynum
            } else {
                remoneynum = moneynum
            }

            if (calorienum != this.data.calorienum && this.data.calorienum != undefined) {
                console.log('输入框没有变化')
                recalorienum = this.data.calorienum
            } else {
                recalorienum = calorienum
            }
            s.post("payment/index/set", {
                money: remoneynum,
                deduct: recalorienum,
                cate: 2,
                id: itemid,
                merchid: 0,
                openid:openid
            }, function(e) {
                console.log(e)
                if (e.status == 0) {
                    message = e.result.message
                    console.log(message)
                    wx.showModal({
                        title: '提示',
                        content: message,
                        success: function(res) {
                            if (res.confirm) {
                                console.log('确定')
                            } else {
                                console.log('取消')
                            }
                        }
                    })
                } else {
                    message = e.result.message
                    console.log(message)
                    wx.showModal({
                        title: '提示',
                        content: message,
                        success: function(res) {
                            if (res.confirm) {
                                console.log('确定')
                                wx.navigateTo({
                                    url: '/packageA/pages/personalcode/discountlist',
                                })
                            } else {
                                console.log('取消')
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
        console.log('监听页面隐藏');
        itemid = '';
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        //   wx.switchTab({
        //     url: '/pages/discount/discount/discount',
        //   })
        console.log('监听页面卸载');
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