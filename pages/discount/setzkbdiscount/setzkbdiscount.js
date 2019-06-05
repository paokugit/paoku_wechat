// pages/discount/setklldiscount/setklldiscount.js
var a, e, i = getApp(),
    s = i.requirejs("core");
//   当前登录人的openid
var f = getApp();
var userinfo = f.getCache('userinfo');
var moneynum = ""
var zkbnum = ""
var itemid = ''
var message = ''
var remoneynum = ''
var rezkbnum = ''
var merchid = 10
Page({

    /**
     * 页面的初始数据
     */
    data: {
        moneytext: '',
        zkbtext: ''
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
                   zkbtext: e.result.data.deduct
                })
            })

        }
    },

    setmoney: function(e) {
        moneynum = e.detail.value
    },
    setzkb: function(e) {
        zkbnum = e.detail.value
    },
    // 确认
    confirm: function() {
        if (itemid == '' || itemid == undefined) {
            console.log('没有itemid')
            s.get("payment/index/set", {
                money: moneynum,
                deduct: zkbnum,
                cate: 2,
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
                                    url: '/pages/discount/zkbdiscount/zkbdiscount',
                                })
                            } else { //这里是点击了取消以后
                            }
                        }
                    })
                }
            })

        } else {
            console.log('有itemid')
            console.log(itemid)
            console.log(moneynum, zkbnum)
            console.log(this.data.moneytext, this.data.zkbtext)
            if (moneynum != this.data.moneytext) {
                console.log('输入框没有变化')
                remoneynum = this.data.moneytext
            } else {
                remoneynum = moneynum
            }
            if (zkbnum != this.data.zkbtext) {
                console.log('输入框没有变化')
                rezkbnum = this.data.zkbtext
            } else {
                rezkbnum = zkbnum
            }
            console.log(moneynum, zkbnum)
            console.log(remoneynum, rezkbnum)
            // remoneynum = this.data.moneytext
            // rezkbnum = this.data.zkbtext
            wx.request({
                url: 'https://paokucoin.com/app/index.php?i=1&c=entry&m=ewei_shopv2&do=mobile&r=app.payment.index.set',
                data: {
                    money: moneynum,
                    deduct: zkbnum,
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