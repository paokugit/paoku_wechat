// packageA/pages/setpassword/set/set.js
var a, e, i = getApp(),
    s = i.requirejs("core");
var f = getApp();
var userinfo = f.getCache('userinfo');
console.log(userinfo)

var useropenid = ""; 



Page({

    /**
     * 页面的初始数据
     */
    data: {
      globalimg: i.globalData.appimg,
      showIcon: true,
      list:[],
      speedId:'',
      isSelect:1,
      remain:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      var userinfo = f.getCache('userinfo');
      useropenid = userinfo.openid

      var m = this;
      m.list();
    },

    list:function(){
      var m = this;
      s.get("payment.limit",{},function(e){
        console.log(e);
        if (e.status == 1){
          m.setData({
            list: e.result.list,
            remain: e.result.remain,
            speedId: e.result.list[0].id
          })
        } else if (e.status == 0){
          wx.showToast({
            title: e.result.message,
            icon: 'none',
            duration: 2000
          })
        }
      })
    },

    // 列表点击事件
    list_btn: function (e) {
      this.setData({
        isSelect: e.currentTarget.dataset.id,
        speedId:e.currentTarget.dataset.id
      })
    },


    pay_btn: function (e) {
      var m = this;
      s.get("payment.limit_order", {
        openid: useropenid,
        id: m.data.speedId
      }, function (e) {
        console.log(e);
        if(e.status == 1){
          wx.showLoading({
            mask: true
          });
          wx.requestPayment({
            timeStamp: e.result.timeStamp,
            nonceStr: e.result.nonceStr,
            package: e.result.package,
            signType: 'MD5',
            paySign: e.result.paySign,
            success(res) {
              console.log(res);
              wx.showToast({
                title: '购买成功',
                icon: 'success',
                duration: 3000
              })
              wx.hideLoading();
              m.list();
              m.setData({
                isSelect: 1
              })
            },
            fail(res) {
              console.log(res);
              wx.hideLoading();
            }
          })
        } else if (e.status == 0){
          wx.showToast({
            title: e.result.message,
            icon: 'none',
            duration: 2000
          })
        }
      })
    },

    // setbtn: function() {
    //     wx.navigateTo({
    //         url: '/packageA/pages/setpassword/setpassword/setpassword',
    //     })
    // },
    
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