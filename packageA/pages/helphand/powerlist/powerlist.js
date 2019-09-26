var t = getApp(),
  a = t.requirejs("core");
//   当前登录人的openid
var f = getApp();
var userinfo = f.getCache('userinfo');
var mid="";
var openid=""
var bmid=""
var bopenid=""
var bnickname=""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: t.globalData.appimg,
    type: 0,
    isopen: !1,
    page: 1,
    loaded: !1,
    loading: !0,
      step:'',
      bnickname:'',
     helplist:[],
      showIcon: true,

  },
  playbtn:function(){
        wx.switchTab({
            url: '/pages/index/index',
        })
    },
    inviteBtn:function(){
        wx.navigateTo({
            url: '/packageA/pages/helphand/friendhelp/friendhelp',
})
    },
    // 回到首页
    goIndex:function(){
        wx.switchTab({
            url: '/pages/index/index',
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
// 添加助力页传过来的参数
      console.log(options)
    //   被助力人的mid和openid和昵称
      bmid = options.mid
      bopenid=options.openid
      bnickname = options.nickname
      console.log(bnickname)
      this.setData({
          bnickname: bnickname
      })
    if(options.openid==""){
        openid = userinfo.openid;
    }else{
        openid = options.openid
    }
    var t = this;
    a.get("help/index/helplist", {
        mids: bmid,
        openid: openid
    }, function(a) {
        // console.log(mid)
      console.log(a)
      t.setData({
          helplist:a.helpList.slice(0,5)
      })
    })

    var tt=this
      a.get("refresh_step", {
          openid: userinfo.openid
      }, function (e) {
          tt.setData({
             step:e.result.step
          })
      })


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