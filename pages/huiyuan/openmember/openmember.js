
var a, e, i = getApp(), s = i.requirejs("core"), n = i.requirejs("wxParse/wxParse"), 
    r = i.requirejs("biz/diyform"), d = i.requirejs("biz/goodspicker"), c = (i.requirejs("foxui"),
        i.requirejs("jquery"));
//   当前登录人的openid
var f = getApp();
var userinfo = f.getCache('userinfo');
console.log(userinfo)
var memberid=''
Page({
 
    /**
     * 页面的初始数据
     */
    data: {
        globalimg: i.globalData.appimg,
        total: 1,
        page: 1,
        loaded: !1,
        loading: !0,
        list: [],
        hydisp:'none',
        id:'',
        minprice:'',
        title:'',
        productprice:''
    },
    openhy: function (e) {
    //   var hyid= e.currentTarget.dataset.id
        memberid = e.currentTarget.dataset.id
    //   console.log(hyid)
      console.log(memberid)
        // wx.setStorageSync('hyid', hyid)
        e.currentTarget.dataset.minprice
        this.setData({
            hydisp: 'block',
            id:e.currentTarget.dataset.id,
            minprice:e.currentTarget.dataset.minprice,
            title: e.currentTarget.dataset.title,
            productprice: e.currentTarget.dataset.productprice
        })
    },
    pay: function () {
        var a = this;
        // let open = wx.getStorageSync('openid')
        // let hy = wx.getStorageSync('hyid')
        console.log(userinfo.openid)
        // console.log(hy)
        s.get("order/create/submit", {
            id: memberid,
            'goods[0][id]': memberid,
            'goods[0][goodsid]': memberid,
            openid: userinfo.openid
        }, function (f) {
            console.log(22222)
            
            console.log(f)
            var i = {
                loading: false,
                // order:f.orderid
            };
            a.setData(i)

            // wx.navigateTo({
            //     url: "/pages/order/pay/index?id=" + f.orderid
            // })
            wx.navigateTo({
                url: "/pages/order/create/index?id=" + memberid
            })
        })
       
    },
    hyClose:function(){
        this.setData({
            hydisp:"none"
        })
    },
    
    

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var a=this;
        s.get("goods/get_list", {
           page:1,
           cate:4,
           openid:userinfo.openid
        }, function (e) {
            console.log(111)
            console.log(e)
            var i = {
                loading: false,
                total: e.total,
                pagesize: e.pagesize,
                list: e.list
            };
           a.setData(i)
        })


        
        
    },
    explainhy: function () {
        wx.navigateTo({
            url: '../hygrade/hygrade',
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
        console.log(userinfo.openid)
        s.get("member", {
            openid: userinfo.openid
        }, function (u) {
            if (u.levelid != 0) {
                wx.reLaunch({
                    url: "/pages/huiyuan/membercenter/membercenter"
                })
            }

            // a.setData(ii)
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
    onShareAppMessage: function (res) {
        // return s.onShareAppMessage();
        var that = this;
        return {
            title: '原来微信步数可以当钱用，快来和我一起薅羊毛',
            path: '/pages/index/index?id=' + that.data.scratchId,
            success: function (res) {
                // 转发成功

                that.shareClick();
            },
            fail: function (res) {
                // 转发失败
            }
        }
    }
})