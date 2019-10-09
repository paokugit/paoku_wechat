var a, e, i = getApp(),
  s = i.requirejs("core");
var f = getApp();
var useropenid = ''
var t = getApp(), j = t.requirejs("core"), p = t.requirejs("wxParse/wxParse");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mask: 0,
    globalimg: i.globalData.appimg,
    showIcon: true,
    gloheight: i.globalData.gloheight,
    color: '#01d7a1',
    underline: 0, 
    color1: '#333333',
    informtitle: '',
    informlist: [],
    weidux: 0,
    sixilist: [],
    sixinw: 0,
    siback: 'none',
    xiback: 'none',

    criticPage:1,
    totalPage:0,
    listCritic:[],
    abcShow: false,
    itemid:'',
    discuss: '',
    focus: false,
    perch:'我也说几句...',
    notlogindis: 'block'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid
    console.log(userinfo);
  },
  assistant: function () {
    var _that = this
    _that.setData({
      color: '#333333',
      color1: '#01d7a1',
      color2: '#333333',
      fontcss: '28rpx',
      fontcss1: '33rpx',
      fontcss2: '28rpx',
      underline: 1,
      mask: 2,
      listCritic: [],
      criticPage: 1,
      discuss: '', 
      focus: false
    })
  },

  discuss:function(){
    var _that = this
    _that.setData({
      color: '#333333',
      color1: '#333333',
      color2: '#01d7a1',
      fontcss: '28rpx',
      fontcss1: '28rpx',
      fontcss2: '33rpx',
      underline: 2,
      mask: 3,
      listCritic: [],
      criticPage:1,
      discuss: '',
      focus: false
    });
    _that.critic();
  },

  zan_tap: function (e) {
    var d = e.currentTarget.dataset.id
    var _that = this
    s.get("shop.notice.zan", {
      id: d,
      openid: useropenid,
      status: 1
    }, function (e) {

    })
    this.onShow()
  },
  zan_tap1: function (e) {
    var d = e.currentTarget.dataset.id
    var _that = this
    s.get("shop.notice.zan", {
      id: d,
      openid: useropenid,
      status: 0
    }, function (e) {

    })
    this.onShow()
  },

  inform: function () {
    var _that = this
    _that.setData({
      color: '#01d7a1',
      color1: '#333333',
      color2: '#333333',
      fontcss: '33rpx',
      fontcss1: '28rpx',
      fontcss2: '28rpx',
      underline: 0,
      mask: 0,
      listCritic:[],
      criticPage: 1,
      discuss: '',
      focus: false
    })
  },
  tiaozhuan: function (e) {
    var ss = e.currentTarget.dataset.id
    wx.navigateTo({
        url: '/packageA/pages/shop/notice/notification/detail?id=' + ss,
    })
  },

  // 授权昵称头像
  getUserInfo: function (e) {
    let that = this;
    wx.getSetting({
      success(res) {
        console.log(res)
        var userinfo = f.getCache('userinfo');
        console.log(userinfo)
        if (userinfo.nickname == '' || userinfo.avatarUrl == '') {
          wx.login({
            success: function (a) {
              a.code ? a.post("wxapp.login", {
                code: a.code
              }, function (a) {
                console.log(a)
                wx.getUserInfo({
                  success: function (info) {
                    console.log(info);
                    console.log(a.session_key);
                    a.get("wxapp/auth", {
                      data: info.encryptedData,
                      iv: info.iv,
                      sessionKey: a.session_key
                    }, function (eve) {
                      console.log(eve)
                      that.getInfo();
                    }
                    )
                  }
                });
              }) : s.alert("获取用户登录态失败:" + a.errMsg);

            }
          })

        }
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权=====")
          that.setData({
            notlogindis: 'none'
          })
        }
      }
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
    var a = this
    var hh = []
    // 私信
    s.get("shop.notice.email", {
      openid: useropenid
    }, function (e) {
      if (e.result.email > 0) {
        a.setData({
          sixilist: e.result.list,
          sixinw: e.result.email,
          siback: 'block',
        })
      } else {
        a.setData({
          sixilist: e.result.list,
          sixinw: e.result.email,
          siback: 'none'
        })
      }
    })
    //系统通知
    s.get("shop.notice.get_list", {
      page: 1,
      openid: useropenid
    }, function (e) {
      hh = e.list
      if (e.notice > 0) {
        a.setData({
          // mask: 0,
          informlist: e.list,
          weidux: e.notice,
          xiback: 'block',
        })
      }else{
        a.setData({
          // mask: 0,
          informlist: e.list,
          weidux: e.notice,
          xiback: 'none',
        })
      }
    })
    a.getUserInfo();
  },

  // 评论
  critic:function(){
    var m = this;
    s.get("drcircle.my.mycomment",{
      openid: useropenid,
      page: m.data.criticPage
    },function(e){
      console.log(e);
      let totalList = e.message.list;
      let totalPage = Math.ceil(e.message.total / 8);
      m.setData({
        mask: 3,
        listCritic: m.data.listCritic.concat(totalList),
        totalPage: totalPage
      })
    })
  },
  // 跳转详情
  dynamicBtn:function(e){
    var isdel = e.currentTarget.dataset.isdel;
    var circleid = e.currentTarget.dataset.circleid;
    if(isdel == 0){
      wx.navigateTo({
        url: '/pages/expert/discuss/discuss?listId=' + circleid,
      })
    }else{
      wx.showToast({
        icon: 'none',
        title: '此动态已被删除...',
        duration: 2000
      })
    }
  },

  // 回复按钮
  replyBtn:function(e){
    var itemid = e.currentTarget.dataset.itemid;
    this.setData({
      itemid: itemid,
      focus: true,
      perch: '回复：' + e.currentTarget.dataset.name
    })
  },
  // 回复内容
  formName: function (e) {
  
    this.setData({
      discuss: e.detail.value
    })
  },  
  //输入聚焦
  foucus: function (e) {
    var that = this;
    that.setData({
      inputBottom: e.detail.height
    })
  },

  //失去聚焦
  blur: function (e) {
    var that = this;
    that.setData({
      inputBottom: 0
    })
  },
  // 留言
  sendBtn: function () {
    var m = this;

    var message = m.data.listCritic;
    let sutid = m.data.itemid;
    console.log(message);
    console.log(m.data.itemid);

    wx.showLoading({
      title: '评论中...',
      mask: true
    })
    s.get("drcircle.my.comment", {
      openid: useropenid,
      content: m.data.discuss,
      type: 2,
      parent_id: m.data.itemid
    }, function (e) {
      console.log(e);
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
      if (e.error == 0) {
        wx.showToast({
          title: '回复成功',
          icon: 'none',
          duration: 2000
        })
        
        for(var i = 0; i< message.length; i++){
          if (message[i].id == sutid){
            message[i].reply = parseInt(message[i].reply) + 1
          }
        }

        m.setData({
          discuss: '',
          focus: false,
          listCritic:message
        })

      }else{
        wx.showToast({
          title: e.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  // 上拉加载
  lower: function (e) {
    let page = this.data.criticPage;
    let totalpage = this.data.totalPage;
    if (page < totalpage) {
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
      this.setData({
        criticPage: page + 1
      })
      this.critic();
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
    } else {
      this.setData({
        abcShow: true
      })
    }
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