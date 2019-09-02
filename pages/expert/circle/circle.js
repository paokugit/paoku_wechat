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
    showBall:false,
    img_url:[],
    img_file:[],
    cartoon: false,
    cartoonA: true,
    cartoonB: false,

    page: 1,
    totalPage: 0,
    updateData:0,
    dataList:[],
    isShow:false,
    abcShow:false
  }, 

  
  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;
    var m = this;
    m.pageData();
  },


  pageData:function(){
    var m = this;
    a.get("drcircle.index.index",{
      openid: useropenid,
      page:m.data.page
    },function(e){
      console.log(e);  
      let totalList = e.message.list;
      let totalPage = Math.ceil(e.message.total / 10);
      m.setData({
        updateData:e.message.count,
        dataList: m.data.dataList.concat(totalList),
        totalPage: totalPage
      })
    })
  },

  support:function(e){
    var m = this;
    var supportId = e.currentTarget.dataset.supportid;
    var supp = e.currentTarget.dataset.supp;
    if (supp == 0){
      a.get("drcircle.my.support", {
        openid: useropenid,
        content_id: supportId,
        type: 1  
      }, function (e) {
        if (e.error == 0) {
          m.setData({
            dataList: []
          })
          m.pageData();
        }
      })
    }else{
      a.get("drcircle.my.del_support", {
        openid: useropenid,
        content_id: supportId,
        type: 1
      }, function (e) {
        if (e.error == 0) {
          m.setData({
            dataList: []
          })
          m.pageData();
        }
      })
    }
  },

  imgBall: function (options){
    var m = this;
    a.get("drcircle.my.log", {
      openid: useropenid
    }, function (e) {
      if(e.error == 0){
        wx.navigateTo({
          url: '/pages/expert/issue/issue',
        })
      }else{
        m.setData({
          showBall: true
        })
      }
    })
  },

  chooseimage: function (options){
    let m = this;
    let select = options.currentTarget.dataset.select;
    let img_list = m.data.img_url;
    wx.chooseImage({
      count: 9 - img_list.length, 
      sizeType: ['original', 'compressed'], 
      sourceType: [select], 
      success: function (res) {
        
        let file_list = m.data.img_file; 
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          wx.uploadFile({
            url: 'https://paokucoin.com/app/ewei_shopv2_api.php?i=1&r=util.uploader.upload&file=file',
            filePath: res.tempFilePaths[i],
            name: "file",
            header: { 'content-type': 'multipart/form-data' },
            success: function (n) {
              var o = JSON.parse(n.data);
              img_list.push(o.files[0].url);
              file_list.push(o.files[0].filename);
              if (i == res.tempFilePaths.length-1){
                wx.navigateTo({
                  url: '/pages/expert/issue/issue?imgList=' + img_list + '&fileList=' + file_list,
                })
              }
            }
          })
        };
      }
    }),
    m.setData({
      showBall: false
    })
  },
  showBall: function (e) {
    this.setData({
      showBall: false
    })
  },
  dakai:function(){
    
    var m = this;
    if (m.data.cartoon == true){
      m.setData({
        cartoon:false,
        cartoonA:true,
        cartoonB:false
      })
    }else{
      m.setData({
        cartoon: true,
        cartoonA: false,
        cartoonB:true
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

  onShow: function () {
    var m = this;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
    let json = currPage.data.mydata;
    if (json != undefined) {
      m.data.dataList = [];
      if (json.pageB == 1) {
        m.pageData();
        console.log(m.data.dataList);
      }
    }
    
    if (m.data.updateData != 0){
      m.setData({
        isShow: true
      })
      setTimeout(function(){
        m.setData({
          isShow: false
        })
      },2000)
    }
    m.data.img_url = [];
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
      this.pageData();
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