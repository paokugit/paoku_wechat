var t = getApp().requirejs("core");
var ii = getApp();
var i = getApp();
// console.log(ii.globalData.appimg)
//   当前登录人的openid
var f = getApp();
var userinfo = f.getCache('userinfo');
var merchphone=""
Page({

  /**
   * 页面的初始数据
   */
    data: {
        globalimg: ii.globalData.appimg,
        level: 1,
        page: 1,
        list: [],
        // 组件所需的参数
        nvabarData: {
            showCapsule: 1, 
            title: '附近商家', 
            height: ii.globalData.height * 2 + 20,
        },
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getSet(), this.getList();
  },
    // 拨打电话
    tel: function (t) {
        console.log('phone')
        console.log(t)
        merchphone = t.currentTarget.dataset.mobile
        console.log(merchphone)
        wx.makePhoneCall({
            phoneNumber: merchphone,
        })
    },
    getList: function () {
        var e = this;
        var newpos = i.getCache("mypos");
        t.get("changce/merch/get_list", {
            page: e.data.page,
            lat: newpos.lat,
            lng: newpos.lng,
        }, function (t) {
            console.log(t)
            var a = {
                total: t.total,
                pagesize: t.pagesize,
                list: t.list,
                cates: t.cates,
                disopt: t.disopt,
            };
            t.list.length > 0 && (a.page = e.data.page + 1, a.list = e.data.list.concat(t.list),
                t.list.length < t.pagesize && (a.loaded = !0)), e.setData(a);
        }, this.data.show);
    },
    getSet: function () {
        var e = this;
    t.show = !0, e.setData(t);
       
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
      wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      this.data.loaded || this.data.list.length == this.data.total || this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})