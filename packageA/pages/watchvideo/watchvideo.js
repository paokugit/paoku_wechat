var t = getApp(),
  a = t.requirejs("core"),
  s = t.requirejs("jquery");
var f = getApp();

var useropenid = "";
var videoid = "";
var videotit = "";
var viderimg = "";

var upvideoid = "";

var touchstartY = "";
var cartoon = 1;
var imgurl = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: t.globalData.appimg,
    showIcon: true,
    gloheight: t.globalData.gloheight,

    myvideo:{},
    criticList:[],
    hinttime:6,
    hintshow:false,
    notlogindis: 'block'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;
    videoid = options.id;
    let m = this;

    m.videoList();
  },

  videoList:function(){
    let m = this;
    a.get("seckill.list.sale_detail",{
      openid: useropenid,
      id: videoid,
    },function(e){
      console.log(e);
      if(e.status == 1){
        videotit = e.result.detail.title;
        viderimg = e.result.detail.thumb;
        upvideoid = e.result.detail.id;

        a.get("goods/poster/sharegoodsimg", {
          id: upvideoid,
        }, function (e) {
          imgurl = e.url
        });
        m.setData({
          myvideo: e.result.detail,
          criticList: e.result.comment
        })
      } else if (e.status == 0){
        wx.showToast({
          title: e.result.message,
          icon: 'none',
          duration: 2000
        })
      }
    });
  },
 
  //触摸开始事件
  touchstart: function (e) {
    touchstartY = e.touches[0].clientY;
  },

  // 触摸结束
  touchend:function(e){
    let b = this;
    let touchendY = e.changedTouches[0].pageY;
    if (touchendY - touchstartY < -80) {
      b.uplist();
    }
    if (touchendY - touchstartY > 80) {
      b.downlist();
    }
  },

  // 视频播放结束
  bindended: function (e) {
    let m = this;
    var animation = wx.createAnimation();
    var animation1 = wx.createAnimation();

    m.setData({
      hintshow: true
    })

    // 倒计时
    let countdown = setInterval(function(){
      var second = m.data.hinttime-1;
      if(second == 0){
        m.uplist();
        clearInterval(countdown);
        clearInterval(move);
        animation1.scale(1).step();
        m.setData({
          hintshow: false,
          hinttime: 6,
          ani1: animation1.export()
        });
      }else if(second > 0){
        m.setData({
          hinttime: second
        });
      }
    },1000)
    
    // 缩放移动
    let move = setInterval(function(){
      if (cartoon == 1){
        animation.translate(-8, 0).step();
        animation1.scale(1.1).step();
        cartoon = 2;
      } else if (cartoon == 2){
        animation.translate(0, 0).step();
        animation1.scale(1).step();
        cartoon = 1;
      }
      m.setData({
        ani: animation.export(),
        ani1: animation1.export()
      });
    },500);
  },
  
  uplist:function(op){
    let m = this;
    a.get("seckill.list.sale_detail",{
      openid:useropenid,
      id: upvideoid,
      type:'up'
    },function(e){
      console.log(e);
      if (e.status == 1) {
        upvideoid = e.result.detail.id;
        m.setData({
          myvideo: e.result.detail,
          criticList: e.result.comment
        })
      } else if (e.status == 0){
        wx.showToast({
          title: e.result.message,
          icon: 'none',
          duration: 2000
        })
      } else if (e.status == 2) {
        wx.showToast({
          title: '我是有底线的>_<',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  downlist:function(op){
    console.log(upvideoid);
    let m = this;
    a.get("seckill.list.sale_detail", {
      openid: useropenid,
      id: upvideoid,
      type: 'down'
    }, function (e) {
      console.log(e);
      if (e.status == 1) {
        upvideoid = e.result.detail.id;
        m.setData({
          myvideo: e.result.detail,
          criticList: e.result.comment
        })
      } else if (e.status == 0) {
        wx.showToast({
          title: e.result.message,
          icon: 'none',
          duration: 2000
        })
      } else if (e.status == 2) {
        wx.showToast({
          title: '我是第一个o_o',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  
  // 点赞
  videozan:function(op){
    let m = this;
    let message = m.data.myvideo;
    a.get("seckill.list.zan",{
      openid: useropenid,
      goodsid: op.currentTarget.dataset.zanid
    },function(e){  
      console.log(e);
      if (e.status == 1){
        if (e.result.status == 0){
          message.fav = message.fav - 1;
          message.fav_count = message.fav_count-1;
          console.log('123');
        } else if (e.result.status == 1){
          message.fav = message.fav + 1;
          message.fav_count = message.fav_count + 1;
          console.log('456');
        } 
        m.setData({
          myvideo: message
        })
      } else if (e.status == 0) {
        wx.showToast({
          title: e.result.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  // 查看商品
  criticbtn:function(e){
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/goods/detail/index?id=' + e.currentTarget.dataset.id,
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
    this.getUserInfo();
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
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log('456');
      return {
        title: videotit,
        path: '/packageA/pages/watchvideo/watchvideo?id=' + videoid,
        imageUrl: imgurl
      }
    }
  }
})