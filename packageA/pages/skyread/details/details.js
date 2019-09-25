var t = getApp(),
  a = t.requirejs("core"),
  b = t.requirejs("wxParse/wxParse"),
  s = t.requirejs("jquery");
var f = getApp();

var useropenid = "";
var readid = "";
var artTit = ""; 
var readmusic = "";
var music_title = "";
var isPlayingMusic = true;
var removeid = "";
var del_index = "";

var back = wx.getBackgroundAudioManager();
 
Page({
  data: {
    globalimg: t.globalData.appimg,
    nvabarData: {
      showCapsule: 1, 
      title: "每日必读",
      height: t.globalData.height * 2 + 20, 
    },
    publish:false,
    focus:false,
    releaseText:'',
    background:'background: #99efd9;',
    isshow:false,
    shadeShow:false,
    musicShow:true,

    articleTit:"",
    articleImg:'',
    articleTime:'',
    music_title:"",
    page:1,
    totalPage:1,
    commentList:[],
    yi_zan: 'circle_parise@2.png',
    wei_zan: 'circle_parise@1.png',
    notlogindis: 'block'
  },


  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;
    readid = options.id;

    var b = this;
    b.details();
    b.comment();
  },

  // 文本
  details:function(e){
    var m = this;
    wx.showToast({ 
      title: '加载中', 
      icon: 'loading', 
      duration: 1000 
    });
    a.get("myown.reading.detail",{
      readid: readid
    },function(e){
      console.log(e);
      wx.hideLoading()
      if(e.error == 0){
        artTit = e.message.title;
        readmusic = e.message.music;
        music_title = e.message.music_title;

        // back.src = readmusic;
        // back.title = music_title;
        // back.play();
        // back.onEnded(() => {
        //   console.log("音乐播放结束");
        //   back.play();
        // })
        // isPlayingMusic = false
        player();
        function player() {
          back.title = music_title;
          back.src = readmusic;
          back.onEnded(() => {
            player();
          })
        }

        b.wxParse("wxParseData", "html", e.message.content, m, "25"), 
        m.setData({
          articleTit:e.message.title,
          articleImg: e.message.detail_img,
          articleTime: e.message.create_time,
          music_title: e.message.music_title
        })
      }
    })
  },

  // 评论
  comment:function(e){
    var n = this;
    a.get("myown.reading.comment",{
      page:n.data.page,
      readid: readid
    },function(e){
      console.log(e);
      if(e.error == 0){
        if(e.message.list.length == 0){
          n.setData({
            isshow: true
          })
        }
        let totalCount = Math.ceil(e.message.count / 10);
        let totalList = e.message.list
        n.setData({
          totalPage: totalCount,
          commentList: n.data.commentList.concat(totalList)
        })
      } else if (e.error == 1){
        wx.showModal({
          title: '提示',
          content: e.message,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else {
              console.log('用户点击取消')
            }
          }
        })
      }

    })
  },

  // 音乐暂停
  bindback: function () {
    var that = this;
    if (isPlayingMusic == true){
      back.pause();
      isPlayingMusic = false;
      that.setData({
        musicShow:false
      })
    }else{
      player();
      function player() {
        back.title = music_title;
        back.src = readmusic;
        back.onEnded(() => {
          player();
        })
      }
      isPlayingMusic = true;
      that.setData({
        musicShow: true
      })
    }
  },


  // 输入框
  gaysText:function(e) {
    var m = this;
    let background = m.data.background;
    if (e.detail.value.length > 0){
      background = 'background: #01d7a1;';
    }else{
      background = 'background: #99efd9;';
    }
    this.setData({
      releaseText: e.detail.value,
      background: background
    })
  },

  //输入聚焦
  foucus: function (e) {
    var that = this;
    that.setData({
      inputBottom: e.detail.height-60
    })
  },

  //失去聚焦
  blur: function (e) {
    var that = this;
    that.setData({
      inputBottom: 0
    })
  },

  // 写评论
  writebtn:function(e){
    this.setData({
      publish: true
    })
  },
  publishbtn: function (e) {
    this.setData({
      publish: false,
      focus:false
    })
  },
  focusbtn: function (e) {
    this.setData({
      focus: true
    })
  },

  // 评论发布
  issuebtn:function(e){
    var s = this;
    wx.showToast({
      title: '发布中',
      icon: 'loading',
      duration: 1000
    });
    a.get("myown.reading.com", {
      openid: useropenid,
      readid: readid,
      comment: s.data.releaseText
    }, function (e){
      wx.hideLoading();
      if(e.error == 0){
        wx.showToast({
          title: e.message,
          icon: 'success',
          duration: 2000
        })
        s.fabu();
      }else{
        wx.showToast({
          title: e.message,
          icon: 'none',
          duration: 2000
        })
      }
      s.setData({
        publish: false,
        focus: false,
        releaseText:'',
        background : 'background: #99efd9;'
      })
    })
  },
  fabu:function(e){
    let s = this;
    let message = s.data.commentList;
    a.get("myown.reading.comment", {
      page: 1,
      readid: readid
    }, function (e) {
      if (e.error == 0) {
        s.setData({
          commentList: e.message.list,
          page:1,
          isshow: false
        })
      }
    }) 
  },

  // 点赞
  imgZan:function(e){
    var w = this;
    let commentid = e.currentTarget.dataset.commentid;
    let index = e.currentTarget.dataset.index;
    let message = w.data.commentList;

    for (let i in message) { 
      if(i == index){
        var collectStatus = false
        if (message[i].myzan == 0) {
          collectStatus = true
          a.get("myown.reading.support",{
            openid: useropenid,
            comment_id: commentid
          },function(e){
            console.log(e);
            if(e.error == 0){
              message[i].myzan = parseInt(message[i].myzan) + 1;
              message[i].zan = parseInt(message[i].zan) + 1;
              w.setData({
                commentList: message
              })
            }else if(e.error == 1){
              wx.showToast({
                title: e.message,
                icon: 'none',
                duration: 2000
              })
            }
          }) 
        }else{
          collectStatus = false
          a.get("myown.reading.del_support", {
            openid: useropenid,
            comment_id: commentid
          }, function (e) {
            console.log(e);
            if (e.error == 0) {
              message[i].myzan = parseInt(message[i].myzan) - 1;
              message[i].zan = parseInt(message[i].zan) - 1;
              w.setData({
                commentList: message
              })
            } else if (e.error == 1) {
              wx.showToast({
                title: e.message,
                icon: 'none',
                duration: 2000
              })
            }
          }) 
        }
      }
    }
  },

  // 删除评论
  shadeCat:function(e){
    let openid = e.currentTarget.dataset.openid;
    removeid = e.currentTarget.dataset.commentid;
    del_index = e.currentTarget.dataset.index;
    if (openid == useropenid){
      this.setData({
        shadeShow:true
      })
    }
  },
  shadeShow:function(e){
    this.setData({
      shadeShow: false
    })
  },
  delBTn:function(e){
    let p = this;
    let message = p.data.commentList;
    a.get("myown.reading.del_comment",{
      openid:useropenid,
      comment_id: removeid
    },function(e){
      console.log(e);
      if (e.error == 0) {
        message.splice(del_index, 1);
        for(let i in message){
          if (message[i].id == removeid){
            console.log(i);
            message.splice(i,1);
          }
        }
      }
      wx.showToast({
        title: e.message,
        icon: 'none',
        duration: 2000
      })
      p.setData({
        shadeShow: false,
        commentList: message
      })
    })
  },

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
    back.stop();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },
  
  lower:function(e){
    let page = this.data.page;
    let totalCount = this.data.totalPage;
    if (page < totalCount) {
      wx.showLoading({
        title: '加载中...',
      });
      this.setData({
        page: page + 1
      })
      this.comment();
      wx.hideLoading()
    } else {
      this.setData({
        isshow: true
      })
    }
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
    console.log(ops);
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log('123');
      return {
        title: artTit,
        path: '/packageA/pages/skyread/details/details?id=' + readid,
        imageUrl: this.data.articleImg
      }
    }
  }
})