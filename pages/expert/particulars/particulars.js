var t = getApp(),
  a = t.requirejs("core");
var f = getApp();

var useropenid = ""; 
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
    catid:''
  }, 

  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;

    var m = this; 
    m.data.comid = options.comid;
    m.detail();
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
        details: e.message,
        list: m.data.list.concat(totalList),
        totalPage: totalPage
      })
    })
  },

  // 点赞和取消
  support: function (e) {
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
        m.setData({
          list:[]
        })
        m.detail();
      })
    } else {
      a.get("drcircle.my.del_support", {
        openid: useropenid,
        content_id: supportid,
        type: 2
      }, function (e) {
        console.log(e)
        m.setData({
          list: []
        })
        m.detail();
      })
    }
  },


  showBtn:function(e){
    this.setData({
      sendShow:true,
      sendId: e.currentTarget.dataset.supportid
    })
  },
  // 输入内容
  formName: function (e) {
    this.setData({
      discuss: e.detail.value,
      focus: true
    })
  }, 
  // 留言
  sendBtn:function (e) {
    var m = this;
    a.get("drcircle.my.comment", {
      openid: useropenid,
      content: m.data.discuss,
      type:2,
      parent_id: m.data.sendId
    }, function (e) {
      console.log(e);
      if (e.error == 0) {
        m.setData({
          list: [],
          discuss:''
        })
        m.detail();
      }
    })
  },

  // 删除评论
  shadeCat: function (e) {
    var m = this;
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
    a.get("drcircle.my.del_comment", {
      openid: useropenid,
      comment_id: m.data.catid
    }, function (e) {
      m.setData({
        shadeShow: false,
        list:[],
        page:1
      })
      m.detail();
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