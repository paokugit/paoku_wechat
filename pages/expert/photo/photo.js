var t = getApp(),
  a = t.requirejs("core");
var f = getApp();

var useropenid = "";

Page({
  data: {
    globalimg: t.globalData.appimg,
    nvabarData: {
      showCapsule: 1,
      title: '相册',
      height: t.globalData.height * 2 + 20,
    },
    showBall: false,
    img_url:[],
    img_file:[],

    today:1,
    sumList:[],
    page: 1,
    totalPage: 0,
    
  },

  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;
    var m = this;

    m.myList();
  },

  myList:function(){
    var m = this;
    a.get("drcircle.my.mylist",{
      openid: useropenid,
      page: m.data.page
    },function(e){
      console.log(e);
      let totalList = e.message.list;
      var arr = m.data.sumList.concat(totalList);
      if (m.data.sumList.length != 0){  
        var res = [];
        var narr = [];
        for (var i = 0; i < arr.length; i++) {
          var n = res.indexOf(arr[i].type);
          if (n == -1) {
            res.push(arr[i].type);
            narr.push({ type: arr[i].type,time:arr[i].time, dt: arr[i].dt })
          } else {
            for (var j = 0; j < arr[i].dt.length; j++) {
              narr[n].dt.push(arr[i].dt[j])   
            }
          }
        }
        arr = narr;
      }
      
      let totalPage = Math.ceil(e.message.total / 10);
      m.setData({
        sumList: arr,
        totalPage: totalPage
      })
    })
    
  },


  imgBall: function (options) {
    var m = this;
    a.get("drcircle.my.log", {
      openid: useropenid
    }, function (e) {
      if (e.error == 0) {
        wx.navigateTo({
          url: '/pages/expert/issue/issue',
        })
      } else {
        m.setData({
          showBall: true
        })
      }
    })
  },

  showBall: function (e) {
    this.setData({
      showBall: false
    })
  },

  chooseimage: function (options) {
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
              if (i == res.tempFilePaths.length - 1) {
                wx.navigateTo({
                  url: '/pages/expert/issue/issue?imgList=' + img_list + '&fileList=' + file_list,
                })
              }
            }
          })
        }
      }
    }),
    m.setData({
      showBall: false
    })
  },
  
  onShow: function () {
    var m = this;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
    let json = currPage.data.mydata;
    if (json != undefined){
      m.data.sumList = [];
      if (json.pageB == -1){
        m.myList()
      }  
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
    var m = this;
    let page = m.data.page;
    let totalpage = m.data.totalPage;
    if (page <= totalpage) {
      wx.showLoading({
        title: '加载中...',
      });
      m.setData({
        page: page + 1
      })
      m.myList();
    } else {
      m.setData({
        isShow: 1
      })
    }
    setTimeout(() => {
      wx.hideLoading()
    }, 1000)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})