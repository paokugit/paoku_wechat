var t = getApp(),
  a = t.requirejs("core"),
  s = t.requirejs("jquery");
var f = getApp();

var useropenid = ""; 

var indexreply = "";

var del_index = "";
Page({

  data: { 
    globalimg: t.globalData.appimg,
    showIcon: true,
    gloheight: t.globalData.gloheight,

    hShow: '1',
    listId:'', 
    detailList:{}, 
    page: 1, 
    totalPage: 0,
    newestList:[], 
    abcShow: false,
    shadeShow:false,
    catid:'',
    discuss:'',
    replyId:'',
    type_state:1, 
    focus:false,
    myopenid:'',
    hot:[],
 
    yi_zan: 'circle_parise@2.png',
    wei_zan: 'circle_parise@1.png',
    perch:'我也说几句...',

    notlogindis: 'block'
  },
  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;

    var m = this;
    m.setData({
      listId : options.listId,
      replyId: options.listId,
      myopenid: useropenid
    })

    wx.showLoading({
      title: '加载中...', 
      mask: true
    })
    m.detail();
    m.detailA();
    m.newest();
  },

  // 动态
  detail:function(){
    var m = this;
    a.get("drcircle.index.detail",{
      openid: useropenid,
      ciclre_id: m.data.listId
    },function(e){
      console.log(e);
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
      if(e.error == 0){
        m.setData({
          detailList: e.message
        })
      }else if(e.error == 1){
        wx.showModal({
          title: '提示',
          content: e.message,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              m.pagePrice();
            } else {
              console.log('用户点击取消')
              m.pagePrice();
            }
          }
        })
      }
    })
  },
  //热评
  detailA: function () {
    var m = this;
    a.get("drcircle.index.hot_comment", {
      openid: useropenid,
      ciclre_id: m.data.listId
    }, function (e) {
      console.log(e);
      if(e.error == 0){
        m.setData({
          hot: e.message.hot
        })
      } else if (e.error == 1){
        wx.showToast({
          title: e.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  // 最新评论
  newest:function(e){
    var m  = this;
    a.get("drcircle.index.comment",{
      openid: useropenid,
      ciclre_id: m.data.listId,
      type:1,
      page:m.data.page
    },function(e){
      console.log(e);
      if(e.error == 0){
        let totalList = e.message.list;
        let totalPage = Math.ceil(e.message.total / 10);
        m.setData({
          newestList: m.data.newestList.concat(totalList),
          totalPage: totalPage
        })
      } else if (e.error == 1){
        wx.showToast({
          title: e.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  // 点赞和取消
  support: function (e) {
    var m = this;
    let message = m.data.detailList;
    var supp = e.currentTarget.dataset.supp;
    let supportid = e.currentTarget.dataset.supportid;
    if (supp == 0) {
      a.get("drcircle.my.support", {
        openid: useropenid,
        content_id: supportid,
        type: 1
      }, function (e) {

        if(e.error == 0){
          message.support = parseInt(message.support + 1);
          message.zan_count = parseInt(message.zan_count) + 1;
          message.zan_list.unshift(e.message.avatar);
          m.setData({
            detailList: message
          })
        }
        if (e.error == 2) {
          wx.showToast({
            title: e.message,
            icon: 'none',
            duration: 2000
          })
        }
      })
    } else {
      a.get("drcircle.my.del_support", {
        openid: useropenid,
        content_id: supportid,
        type: 1
      }, function (e) {
        if(e.error == 0){
          message.support = parseInt(message.support - 1);
          message.zan_count = parseInt(message.zan_count) - 1;
          message.zan_list.shift();
          m.setData({
            detailList: message
          })
        }
        if (e.error == 2) {
          wx.showToast({
            title: e.message,
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  },
  supportA:function(e){
    var m = this;
    var index = e.currentTarget.dataset.index;
    let message = m.data.hot;
    let sutId = e.currentTarget.dataset.supportid;
    for (let i in message) {
      if (i == index) {
        var collectStatus = false
        if (message[i].support == 0) {
          collectStatus = true;
          message[i].support = parseInt(message[i].support) + 1;
          message[i].zan_count = parseInt(message[i].zan_count) + 1;
          a.get("drcircle.my.support", {
            openid: useropenid,
            content_id: sutId,
            type: 2
          }, function (e) {
            console.log(e);
            if (e.error == 2) {
              wx.showToast({
                title: e.message,
                icon: 'none',
                duration: 2000
              })
            }
          })
        } else {
          collectStatus = false;
          message[i].support = parseInt(message[i].support) - 1;
          message[i].zan_count = parseInt(message[i].zan_count) - 1;
          a.get("drcircle.my.del_support", {
            openid: useropenid,
            content_id: sutId,
            type: 2
          }, function (e) {
            console.log(e);
            if (e.error == 2) {
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
    m.setData({
      hot: message
    })
  },
  supportB: function (e) {
    var m = this;
    var index = e.currentTarget.dataset.index; 
    let message = m.data.newestList;
    let sutId = e.currentTarget.dataset.supportid;
    for (let i in message) { 
      if (i == index) {
        var collectStatus = false
        if (message[i].support == 0) { 
          collectStatus = true;
          message[i].support = parseInt(message[i].support) + 1;
          message[i].zan_count = parseInt(message[i].zan_count) + 1;
          a.get("drcircle.my.support", {
            openid: useropenid,
            content_id: sutId,
            type: 2
          }, function (e) {
            console.log(e);
            if (e.error == 2) {
              wx.showToast({
                title: e.message,
                icon: 'none',
                duration: 2000
              })
            }
          })
        } else {
          collectStatus = false;
          message[i].support = parseInt(message[i].support) - 1;
          message[i].zan_count = parseInt(message[i].zan_count) - 1;
          a.get("drcircle.my.del_support", {
            openid: useropenid,
            content_id: sutId,
            type: 2
          }, function (e) {
            console.log(e);
            if (e.error == 2) {
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
    m.setData({
      newestList: message
    })
  },

  dakai:function(e){
    var m = this;
    if (m.data.hShow == '1'){
      m.setData({
        hShow: '2'
      })
    }else{
      m.setData({
        hShow: '1'
      })
    }
    
  },

  // 预览
  previewImage: function (event) {
    var src = event.currentTarget.dataset.src;
    var imgList = event.currentTarget.dataset.list;
    var imgArr = [];
    for (var i = 0; i < imgList.length; i++) {
      imgArr.push(imgList[i]);
    }
    wx.previewImage({
      current: src,
      urls: imgArr
    })
  },

  // 动态删除
  deleteBtn:function(e){
    var m = this;
    wx.showModal({
      title: '提示',
      content: '确认删除吗？',
      success: function (res) {
        if (res.confirm) {
          a.get("drcircle.my.del_drcircle",{
            openid: useropenid,
            circle_id: m.data.listId
          },function(e){
            console.log(e);
            if(e.error == 0){
              wx.showToast({
                title: e.message,
                icon: 'success',
                duration: 2000
              })
              m.pagePrice();
            } else if (e.error == 1){
              wx.showToast({
                title: e.message,
                icon: 'none',
                duration: 2000
              })
            }
          })
        } 
      }
    })
  },
  pagePrice:function(){
    wx.setStorageSync('pageA', 1);
    wx.navigateBack({
      delta: 1, 
    })
  },
  
  // 删除评论
  shadeCat:function(e){
    var m = this;
    del_index = e.currentTarget.dataset.index;
    m.data.catid = e.currentTarget.dataset.catid;
    var dataOpenid = e.currentTarget.dataset.openid;
    if (dataOpenid == useropenid){
      m.setData({
        shadeShow:true
      })
    }
  },
  shadeShow:function(){
    var m = this;
    m.setData({
      shadeShow: false
    })
  },
  delBTn:function(){
    var m = this;
    let message = m.data.newestList;

    a.get("drcircle.my.del_comment",{
      openid: useropenid,
      comment_id: m.data.catid
    },function(e){
      if(e.error == 0){
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000
        })
        message.splice(del_index, 1);
        m.detailA();
        m.setData({
          shadeShow: false,
          newestList: message
        })
      } else if(e.error == 1){
        wx.showToast({
          title: e.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  // 留言
  formName: function (e) {
    this.setData({
      discuss: e.detail.value,
      focus:true
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

  replyBtn:function(e){
    indexreply = e.currentTarget.dataset.index;
    this.setData({
      focus:true,
      replyId:e.currentTarget.dataset.parentid,
      type_state: e.currentTarget.dataset.type,
      perch: '回复：' + e.currentTarget.dataset.name
    })
  },
  sendBtn:function(){  
    var m = this;
    wx.showLoading({
      title: '评论中...',
      mask: true
    })
    a.get("drcircle.my.comment",{
      openid: useropenid,
      content: m.data.discuss,
      type: m.data.type_state,
      parent_id: m.data.replyId
    },function(e){
      wx.hideLoading()
      if(e.error == 0){
        wx.showToast({
          title: '评论成功',
          icon: 'success',
          duration: 2000
        })
        if (m.data.type_state == 1) {

          m.dynamic();

        } else if (m.data.type_state == 2){
        
          m.critic();

        }
      } else if(e.error == 1){
        m.setData({ content:''});
        wx.showToast({
          title: e.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  // 回复动态
  dynamic:function(){
    var m = this;
    let message = m.data.newestList;
    a.get("drcircle.index.comment", {
      openid: useropenid,
      ciclre_id: m.data.listId,
      type: 1,
      page: 1
    }, function (e) {
      if(e.error == 0){
        message = [];
        message = e.message.list;
        wx.pageScrollTo({
          scrollTop: 380,
        })
        m.setData({ hot: [] })
        m.detailA();
        m.setData({
          newestList: message,
          discuss: '',
          abcShow: false,
          page: 1,
          totalPage: Math.ceil(e.message.total / 10)
        })
      }else if(e.error == 1){
        wx.showToast({
          title: e.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  // 回复评论
  critic:function(){
    var m = this;
    let message = m.data.newestList;

    let page = Math.ceil(indexreply / 10);
    if (page == 0){
      page = page+1
    }
    a.get("drcircle.index.comment", {
      openid: useropenid,
      ciclre_id: m.data.listId,
      type: 1,
      page: page
    }, function (e) {
      if(e.error == 0){
        let noew = e.message.list;
        for (var i = 0; i < noew.length; i++) {
          if (noew[i].id == m.data.replyId) {
            message.splice(indexreply, 1, noew[i])
          }
        }
        m.setData({
          newestList: message,
          discuss: ""
        })
      }else if(e.error == 1){
        wx.showToast({
          title: e.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  // 跳转详情
  commentBtn:function(e){
    let comid = e.currentTarget.dataset.comid;
    let twoid = e.currentTarget.dataset.twoid;
    wx.navigateTo({
      url: '/pages/expert/particulars/particulars?comid=' + comid + '&twoid=' + twoid,
    })
  },

  
  onUnload(){
  
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
    var m = this;
    m.getUserInfo();
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
    let page = this.data.page;
    let totalpage = this.data.totalPage;
    if (page < totalpage) {
      wx.showLoading({
        title: '加载中...',
      });
      this.setData({
        page: page + 1
      })
      this.newest();
    } else {
      this.setData({
        abcShow: true
      })
    }
    setTimeout(() => {
      wx.hideLoading()
    }, 1000)
  },

})