var t = getApp(),
  a = t.requirejs("core");
var f = getApp();

var useropenid = ""; 

var indexreply = "";
Page({

  data: {
    globalimg: t.globalData.appimg,
    nvabarData: {
      showCapsule: 1,
      title: '达人圈', 
      height: t.globalData.height * 2 + 20,
    },

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
    wei_zan: 'circle_parise@1.png'
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
      m.setData({
        detailList:e.message
      })
    })
  },
  //热评
  detailA: function () {
    var m = this;
    a.get("drcircle.index.detail", {
      openid: useropenid,
      ciclre_id: m.data.listId
    }, function (e) {
      m.setData({
        hot: e.message.hot
      })
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
      let totalList = e.message.list;
      let totalPage = Math.ceil(e.message.total / 10);
      m.setData({
        newestList: m.data.newestList.concat(totalList),
        totalPage: totalPage
      })
    })
  },

  // 点赞和取消
  support: function (e) {
    var m = this;
    var supp = e.currentTarget.dataset.supp;
    let supportid = e.currentTarget.dataset.supportid;
    var type = e.currentTarget.dataset.type;
    if (supp == 0) {
      a.get("drcircle.my.support", {
        openid: useropenid,
        content_id: supportid,
        type: type
      }, function (e) {
        if (e.error == 0) {
          if (type == 1){
            m.detail();
          }else{
            m.setData({
              hot:[],
              newestList: [],
              page:1
            })
            m.detailA();
            m.newest();
          }
        }
      })
    } else {
      a.get("drcircle.my.del_support", {
        openid: useropenid,
        content_id: supportid,
        type: type
      }, function (e) {
        if (e.error == 0) {
          if (type == 1) {
            m.detail();
          } else {
            m.setData({ 
              hot: [], 
              newestList:[],
              page: 1
            })
            m.detailA();
            m.newest();
          }
        }
      })
    }
  },
  supportA: function (e) {
    var m = this;
    var index = e.currentTarget.dataset.index;
    var message = m.data.newestList;
    let sutId = e.currentTarget.dataset.supportid;
    for (let i in message) { 
      if (i == index) {
        var collectStatus = false
        if (message[i].support == 0) { 
          collectStatus = true
          message[i].support = parseInt(message[i].support) + 1
          message[i].zan_count = parseInt(message[i].zan_count) + 1

          a.get("drcircle.my.support", {
            openid: useropenid,
            content_id: sutId,
            type: 2
          }, function (e) {
            m.setData({
              hot: []
            })
            m.detailA();
          })
        } else {
          collectStatus = false
          message[i].support = parseInt(message[i].support) - 1
          message[i].zan_count = parseInt(message[i].zan_count) - 1

          a.get("drcircle.my.del_support", {
            openid: useropenid,
            content_id: sutId,
            type: 2
          }, function (e) {
            m.setData({
              hot: []
            })
            m.detailA();
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
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
            m.pagePrice();
          })
        } 
      }
    })
  },
  pagePrice:function(){
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      mydata: {
        pageB: 1
      }
    })
    wx.navigateBack({
      delta: 1, 
    })
  },
  
  // 删除评论
  shadeCat:function(e){
    var m = this;
    m.data.catid = e.currentTarget.dataset.catid;
    console.log(m.data.catid)
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
    console.log(m.data.catid)
    a.get("drcircle.my.del_comment",{
      openid: useropenid,
      comment_id: m.data.catid
    },function(e){
      console.log(e);
      if(e.error == 0){
        m.setData({
          shadeShow:false,
          hot:[],
          newestList: []
        })
        m.detailA();
        m.newest();
      }else{
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

  replyBtn:function(e){
    indexreply = e.currentTarget.dataset.index;
    this.setData({
      focus:true,
      replyId:e.currentTarget.dataset.parentid,
      type_state: e.currentTarget.dataset.type
    })
  },
  sendBtn:function(){  
    var m = this;
    wx.showLoading({
      title: '评论中...',
      mask: true
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    a.get("drcircle.my.comment",{
      openid: useropenid,
      content: m.data.discuss,
      type: m.data.type_state,
      parent_id: m.data.replyId
    },function(e){

      if(e.error == 0){
        wx.showToast({
          title: '评论成功...',
          icon: 'success',
          duration: 2000
        })
        if (m.data.type_state == 1) {

          m.dynamic();

        } else if (m.data.type_state == 2){
        
          m.critic();

        }
      } else {
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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