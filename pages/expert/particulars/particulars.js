var t = getApp(),
  a = t.requirejs("core");
var f = getApp();

var useropenid = ""; 

var del_index = "";
Page({
  data: {
    globalimg: t.globalData.appimg,
    nvabarData: {
      showCapsule: 1,
      title: '评论详情',
      height: t.globalData.height * 2 + 20,
    },

    page: 1,
    totalPage: 0,
    abcShow:false, 
    comid:'',
    details:{},
    list:[],
    shadeShow: false,
 
    discuss: '',
    sendShow:false,

    sendId:'',
    catid:'',

    yi_zan: 'circle_parise@2.png',
    wei_zan: 'circle_parise@1.png',
    twoid:''
  }, 

  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;

    var m = this; 
    m.data.comid = options.comid;
    m.data.sendId = options.comid;
    
    m.setData({
      twoid : options.twoid
    })
    console.log(options.twoid);


    m.detail();
    m.detailA();
  },

  detail:function(){
    var m = this;
    a.get("drcircle.index.comment_detail",{
      openid: useropenid,
      comment_id: m.data.comid,
      type:1,
      page: m.data.page
    },function(e){
      console.log(e);
      let totalList = e.message.comment;
      let totalPage = Math.ceil(e.message.comment_total / 10);
      m.setData({
        list: m.data.list.concat(totalList),
        totalPage: totalPage
      })
    })
  },
  detailA: function () {
    var m = this;
    a.get("drcircle.index.comment_detail", {
      openid: useropenid,
      comment_id: m.data.comid,
      type: 1,
      page: m.data.page
    }, function (e) {
      console.log(e);
      m.setData({
        details: e.message
      })
    })
  },

  // 点赞和取消
  support: function (e) {
    var m = this;
    var index = e.currentTarget.dataset.index;
    let message = m.data.list;
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
            console.log(e);
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
            console.log(e);
          })
        }
      }
    }
    m.setData({
      list: message
    })
  },
  supportA: function (e) {
    var m = this;
    var supp = e.currentTarget.dataset.supp;
    var supportid = e.currentTarget.dataset.supportid;
    if (supp == 0) {
      a.get("drcircle.my.support", {
        openid: useropenid,
        content_id: supportid,
        type: 2
      }, function (e) {
        console.log(e)
        m.detailA();
      })
    } else {
      a.get("drcircle.my.del_support", {
        openid: useropenid,
        content_id: supportid,
        type: 2
      }, function (e) {
        console.log(e)
        m.detailA();
      })
    }
  },

  // 留言
  showBtn:function(e){
    this.setData({
      sendShow:true,
      sendId: e.currentTarget.dataset.supportid
    })
  },
  formName: function (e) {
    this.setData({
      discuss: e.detail.value,
      focus: true
    })
  }, 
  sendBtn:function (e) {
    var m = this;
    let message = m.data.list;
    wx.showLoading({
      title:'评论中...',
      mask:true
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    a.get("drcircle.my.comment", {
      openid: useropenid,
      content: m.data.discuss,
      type:2,
      parent_id: m.data.sendId
    }, function (e) {
      if(e.error == 0){
        a.get("drcircle.index.comment_detail", {
          openid: useropenid,
          comment_id: m.data.comid,
          type: 1,
          page: 1
        }, function (e) {
          message = [];
          message = e.message.comment        
          m.detailA();
          wx.pageScrollTo({
            scrollTop: 0,
          })
          m.setData({
            list: message,
            discuss: '',
            abcShow: false,
            page:1,
            totalPage : Math.ceil(e.message.comment_total / 10)
          })
        })
      } else {
        wx.showToast({
          title: e.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  
  // 删除评论
  shadeCat: function (e) {
    var m = this;
    del_index = e.currentTarget.dataset.index;
    m.data.catid = e.currentTarget.dataset.catid;
    
    var dataOpenid = e.currentTarget.dataset.openid;
    if (dataOpenid == useropenid) {
      m.setData({
        shadeShow: true
      })
    }
  },
  shadeShow: function () {
    var m = this;
    m.setData({
      shadeShow: false
    })
  },
  delBTn: function () {
    var m = this;
    let message = m.data.list;
    a.get("drcircle.my.del_comment", {
      openid: useropenid,
      comment_id: m.data.catid
    }, function (e) {
      if(e.error == 0){
        message.splice(del_index, 1);
        m.detailA();
        m.setData({
          shadeShow: false,
          list: message
        })
      }
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
      this.detail();
    } else {
      this.setData({
        abcShow: true
      })
    }
    setTimeout(() => {
      wx.hideLoading()
    }, 1000)
  }
})