// pages/discount/scancode/scancode.js
var a, e, i = getApp(),
    s = i.requirejs("core");
//   当前登录人的openid
var f = getApp();
var merchid=''
var moneycount = ''
var actualnum = ''
var deductnum = ''
var itemid = ''
var timestamp = ''
var noncestr = ''
var pack = ''
var signtype = ''
var paysign = ''
var param_deduct = ''
var merchantid=''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: i.globalData.appimg,
        moneynum: '',
        fulllist: [],
        usercredit: '',
        caloriecount: '',
        actualcount: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (t) {
        var userinfo = f.getCache('userinfo');
        merchid=userinfo.merchInfo.id
        console.log(merchid)
        var b = decodeURIComponent(t.scene);
        var i = s.str2Obj(b);
        t.id = i.id;
        console.log(t)
        console.log(i.mid)
        if(i.mid==undefined){
            merchantid=t.mid
        }else{
            merchantid = i.mid
        }
        console.log(merchantid)
        console.log(b)
         // 修改卡路里列表页的数据
        var a = this
        s.get("payment/index/getset", {
            cate: 1,
            merchid: merchantid,
            page: 1
        }, function (e) {
            console.log(e)
            a.setData({
                fulllist: e.result.list
            })
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    //   获取用户输入的金额
    moneyInput: function (e) {
        var b = this
        moneycount = e.detail.value
       b.setData({
            moneynum: e.detail.value,
        })
        s.get("payment/index/getDeduct", {
            money: moneycount,
            cate: 1,
            merchid: merchantid,
            openid: userinfo.openid
        }, function (e) {
            console.log(e)
            if (e.status == 0) {
                param_deduct = 0
                actualnum = moneycount
                b.setData({
                    caloriecount: '余额不足',
                    actualcount: moneycount
                })
            } else if (e.status == -1) {
                param_deduct = 0
                actualnum = moneycount
                b.setData({
                    caloriecount: '暂无折扣',
                    actualcount: moneycount,
                })
            }else if(e.status==2){
                param_deduct = 0
                actualnum = moneycount
                b.setData({
                    caloriecount: '无符合的折扣优惠',
                    actualcount: moneycount,
                })
            } else {
                deductnum = e.result.list.deduct
                param_deduct = e.result.list.deduct
                actualnum = parseFloat(moneycount - e.result.list.deduct).toFixed(2)
                console.log(deductnum, actualnum, param_deduct)
                b.setData({
                    caloriecount: e.result.list.deduct,
                    actualcount: parseFloat(moneycount - e.result.list.deduct).toFixed(2)
                })
            }
        })

    },
    //   立即买单
    paymentbtn: function () {
        console.log(actualnum, param_deduct, userinfo.openid, merchantid)
        s.get("payment/index/order_cs", {
            money: actualnum,
            rebate: param_deduct,
            cate: 1,
            merchid: merchantid,
            openid: userinfo.openid
        }, function (eve) {
            console.log(eve)
            timestamp = eve.result.timeStamp
            noncestr = eve.result.nonceStr
            pack = eve.result.package
            signtype = eve.result.signType
            paysign = eve.result.paySign
            wx.requestPayment(
                {
                    'timeStamp': timestamp,
                    'nonceStr': noncestr,
                    'package': pack,
                    'signType': 'MD5',
                    'paySign': paysign,
                    'success': function (res) {
                        console.log('成功')
                        setTimeout(function () {
                            wx.reLaunch({
                                url: '/pages/discount/discount/discount',
                            })
                        }, 200)
                    },
                    'fail': function (res) {
                        console.log('取消')
                    },
                    'complete': function (res) { }
                })
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var t = this
        s.get("payment/index/getCredit", {
            openid: userinfo.openid
        }, function (e) {
            console.log(e)
            t.setData({
                usercredit: e.result.credit1
            })
        })
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