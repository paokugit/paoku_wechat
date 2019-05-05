// pages/index/moremerch/moremerch.js
var a, e, i = getApp(), s = i.requirejs("core"), n = i.requirejs("wxParse/wxParse"), o = i.requirejs("biz/diypage"),
  r = i.requirejs("biz/diyform"), d = i.requirejs("biz/goodspicker"), c = (i.requirejs("foxui"),
    i.requirejs("jquery"));
Page({

    /**
     * 页面的初始数据
     */
    data: {
        globalimg: i.globalData.appimg,
      total: 1,
      page: 1,
      loading: !0,
      disopt: [],
      cates: [],
        list:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var tt = this;
      // 首页附近异业商家
      var newpos = i.getCache("mypos");
      s.get("changce/merch/get_list", {
        page: 1,
        lat: newpos.lat,
        lng: newpos.lng,
      }, function (eve) {
        // console.log(newpos)
        // console.log(111)
        console.log(eve)
        var i = {
          loading: false,
          total: eve.total,
          pagesize: eve.pagesize,
          cates: eve.cates,
          disopt: eve.disopt,
          list: eve.list
        };
        tt.setData(i)
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
      //在标题栏中显示加载
      wx.showNavigationBarLoading()
      https.request({
        url: `${app.globalData.homeData}?pageNum=${this.data.pageNum}&pageSize=${this.data.pageSize}`,
        method: 'get'
      }).then(res => {
        timer1 = setTimeout(function () {
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
        }, 2000)
      }).catch(err => {
        console.log(err)
      })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
      let pageNum = this.data.pageNum;
      let pageSize = this.data.pageSize;
      pageNum++;
      let arr = this.data.questionList;
      https.request({
        url: `${app.globalData.homeData}?pageNum=${pageNum}&pageSize=${pageSize}`,
        method: 'get'
      }).then(res => {
        if (res.data.length == 0) {
          wx.showToast({
            title: '暂无数据',
            icon: 'none',
            duration: 2000
          })
        } else {
          res.data.forEach((item) => {
            arr.push(item);
          })
          this.setData({
            questionList: arr
          })
        }
      }).catch(err => {
        console.log(err)
      })
      this.setData({
        pageNum: pageNum
      })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
      console.log(1)
    }
})