var t = getApp(),
  a = t.requirejs("core");
var f = getApp();

var useropenid = ""; 
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
    catid:''
  },
  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;

    var m = this;
    m.setData({
      listId : options.listId
    })
  
    m.detail();
    m.newest();
  },

  detail:function(){
    var m = this;
    a.get("drcircle.index.detail",{
      openid: useropenid,
      ciclre_id: m.data.listId
    },function(e){
      console.log(e);
      m.setData({
        detailList:e.message
      })
    })
  },
  newest:function(e){
    var m  = this;
    a.get("drcircle.index.comment",{
      openid: useropenid,
      ciclre_id: m.data.listId,
      type:1,
      page:m.data.page
    },function(e){
      console.log(e) 
      let totalList = e.message.list;
      let totalPage = Math.ceil(e.message.total / 10);
      m.setData({
        newestList: m.data.newestList.concat(totalList),
        totalPage: totalPage
      })
    })
  },

  support: function (e) {
    var m = this;
    var supp = e.currentTarget.dataset.supp;
    var supportid = e.currentTarget.dataset.supportid;
    var type = e.currentTarget.dataset.type;
    var reP = e.currentTarget.dataset.rep;
    console.log(supp, supportid, type, reP)
    console.log(m.data.newestList);
    if (supp == 0) {
      a.get("drcircle.my.support", {
        openid: useropenid,
        content_id: supportid,
        type: type
      }, function (e) {
        if (e.error == 0) {
          if(reP != 1){
            m.detail();
          }else{
            m.setData({
              newestList: []
            })
            console.log(m.data.newestList)
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
          if (reP != 1) {
            m.detail();
          } else {
            
            m.setData({
              newestList:[]
            })
            console.log(m.data.newestList)
            m.newest();
          }
        }
      })
    }
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

  deleteBtn:function(e){
    var m = this;
    wx.showModal({
      title: '提示',
      content: '确认删除吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          a.get("drcircle.my.del_drcircle",{
            openid: useropenid,
            circle_id: m.data.listId
          },function(e){
            console.log(e);
            m.pagePrice();
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
          })
        } else {
          console.log('用户点击取消')
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

  shadeCat:function(e){
    var m = this;
    m.data.catid = e.currentTarget.dataset.catid
    m.setData({
      shadeShow:true
    })
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
    })
  },


  // sendBtn:function(){  
  //   var m = this;
  //   a.get("drcircle.my.comment",{
  //     openid: useropenid,

  //   },function(){

  //   })
  // },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  onUnload:function(){
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      mydata: {
        pageB: 1
      }
    })
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