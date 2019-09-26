var a, e, i = getApp(),
    s = i.requirejs("core");
var f = getApp();
var moneycount = ''
var actualnum = ''
var deductnum = ''
var merchid=''
var itemid = ''
var timestamp = ''
var noncestr = ''
var pack = ''
var signtype = ''
var paysign = ''
var param_deduct=''
var merchantid = ''
var useropenid=''
var errormsg=""
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
      showIcon: true,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (t) {
        var userinfo = f.getCache('userinfo');
        useropenid=userinfo.openid
        // merchid=userinfo.merchInfo.id
        var b = decodeURIComponent(t.scene);
        var i = s.str2Obj(b);
        t.id = i.id;
        console.log(i.mid)
        if (i.mid == undefined) {
            merchantid = t.mid
        } else {
            merchantid = i.mid
        }
        var a = this
        s.get("payment/index/getset", {
            cate: 2,
            merchid: merchantid,
            page: 1,
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
        this.setData({
            moneynum: e.detail.value,
        })
        console.log(moneycount)
        // 获取折扣
        s.get("payment/index/getDeduct", {
            money: moneycount,
            cate: 2,
            merchid: merchantid,
            openid: useropenid
        }, function (e) {
            console.log(e)
            if(e.status==0){
                param_deduct = 0
                actualnum = moneycount
                b.setData({
                    caloriecount:'余额不足',
                    actualcount: moneycount,
                })
            } else if (e.status == -1){
                param_deduct = 0
                actualnum = moneycount
                b.setData({
                    caloriecount: '暂无折扣',
                    actualcount: moneycount,
                })
            } else if (e.status == 2){
                param_deduct = 0
                actualnum = moneycount
                b.setData({
                    caloriecount: '无符合的折扣优惠',
                    actualcount: moneycount,
                })
            } else{
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
        // var tt=this
        console.log(actualnum, param_deduct, useropenid, merchantid)
        s.get("payment/index/order_cs", {
            money: actualnum,
            rebate: param_deduct,
            cate: 2,
            merchid: merchantid,
            openid: useropenid
        }, function (eve) {
            console.log(eve)
            if(eve.status==0){
                errormsg=eve.result.message
                wx.showModal({
                    title: '提示',
                    content: errormsg,
                })
            }else{  
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
                        console.log(res)
                        console.log('成功')
                        setTimeout(function () {
                            wx.reLaunch({
                                url: '/pages/rebate/discount/discount',
                            })
                        }, 200)
                    },
                    'fail': function (res) {
                        console.log('取消')
                    },
                    'complete': function (res) { }
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var t = this
        s.get("payment/index/getCredit", {
            openid: useropenid
        }, function (e) {
            console.log(e)
            t.setData({
                usercredit: e.result.credit3
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