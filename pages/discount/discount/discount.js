var a, e, i = getApp(),
    s = i.requirejs("core");
//   当前登录人的openid
var f = getApp();
var merchid=''
var useropenid=''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: i.globalData.appimg,
        credit: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var userinfo = f.getCache('userinfo');
        console.log(userinfo)
        console.log(userinfo.merchInfo)
        useropenid = userinfo.openid
        if(userinfo.merchInfo==undefined || userinfo.merchInfo==false){
            merchid=undefined
        }else{
            merchid=userinfo.merchInfo.id
        }
        
    },
    getScancode: function() {
        var _this = this;
        // 允许从相机和相册扫码
        wx.scanCode({
            success: (res) => {
                console.log(res.path)
                wx.navigateTo({
                    url: '/' + res.path,
                })
            }
        })

    },
    accountbtn: function() {
        wx.navigateTo({
            url: '/pages/discount/zkbaccount/zkbaccount',
        })
    },
    codebtn: function() {
        if (merchid==undefined) {
            wx.showModal({
                title: '提示',
                content: '您还不是商家哦',
            })
        }else{
            wx.navigateTo({
                url: '/pages/discount/merchcode/merchcode',
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
        var a = this
        s.get("payment/index/getCredit", {
            openid: useropenid
        }, function (e) {
            console.log(e)
            a.setData({
                credit: e.result.credit3
            })
        })
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
        wx.showToast({
            icon: 'loading'
        })
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