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
    abcShow:false,

    yi_zan:'circle_parise@2.png',
    wei_zan:'circle_parise@1.png',
    pagecount:''
  }, 

  
  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;
    var m = this;

    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    m.pageData();
  },


  pageData:function(){
    var m = this;
    a.get("drcircle.index.index",{
      openid: useropenid,
      page:m.data.page
    },function(e){
      console.log(e);  
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
      let totalList = e.message.list;
      let totalPage = Math.ceil(e.message.total / 10);

      if (e.message.count > 0) {
        m.setData({
          isShow: true
        })
        setTimeout(function () {
          m.setData({ isShow: false })
        }, 5000)
      }

      m.setData({
        updateData:e.message.count,
        dataList: m.data.dataList.concat(totalList),
        totalPage: totalPage,
        pagecount:m.data.page
      })
    })
  },

  tuijianBtn:function(e){
    let id = e.currentTarget.dataset.tuijianid;
    wx.navigateTo({
      url: '/pages/goods/detail/index?id=' + id,
    })
  },  

  // 点赞与取消
  support:function(e){
    var m = this;

    var index = e.currentTarget.dataset.index;
    var message = this.data.dataList;
    var supportId = e.currentTarget.dataset.supportid;

    for (let i in message) { 
      if (i == index) { 
        var collectStatus = false
        if (message[i].support == 0) { 
          collectStatus = true
          message[i].support = parseInt(message[i].support) + 1
          message[i].zan_count = parseInt(message[i].zan_count) + 1
          
          a.get("drcircle.my.support", {
            openid: useropenid,
            content_id: supportId,
            type: 1  
          }, function (e) {
            console.log(e);
          })

        } else {
          collectStatus = false
          message[i].support = parseInt(message[i].support) - 1
          message[i].zan_count = parseInt(message[i].zan_count) - 1

          a.get("drcircle.my.del_support", {
            openid: useropenid,
            content_id: supportId,
            type: 1
          }, function (e) {
            console.log(e);
          })
          
        }
      }
    }
    m.setData({
      dataList: message
    })
  },

  //是否有上次保存的信息 
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

  // 图片上传
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
          wx.showLoading({
            title: '上传中...',
            mask: true
          })
          wx.uploadFile({
            url: 'https://paokucoin.com/app/ewei_shopv2_api.php?i=1&r=util.uploader.upload&file=file',
            filePath: res.tempFilePaths[i],
            name: "file",
            header: { 'content-type': 'multipart/form-data' },
            success: function (n) {
              
              var o = JSON.parse(n.data);
              img_list.push(o.files[0].url);
              file_list.push(o.files[0].filename);

              if (file_list.length == res.tempFilePaths.length){
                setTimeout(function () {
                  wx.hideLoading()
                }, 2000);
                m.setData({
                  img_url: [],
                  img_file: []
                });
                wx.hideLoading();
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

  // 图片预览
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

    let pageA = wx.getStorageSync('pageA');
    let pageB = wx.getStorageSync('pageB');
    console.log(pageA);
    if(pageA == 1 || pageB == 2){
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
      
      wx.removeStorage({
        key: 'pageA',
        success: function (res) {
          console.log(res);
        }
      });
      wx.removeStorage({
        key: 'pageB',
        success: function (res) {
          console.log(res);
        }
      });
      m.setData({
        dataList: [],
        page: 1,
        abcShow: false
      })
      m.pageData();
      
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
    }

    m.setData({
      cartoon: false,
      cartoonA: true,
      cartoonB: false
    })
    m.data.img_url = [];
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  onPageScroll: function (e) {
    if (e.scrollTop > 0){
      this.setData({
        cartoon: false,
        cartoonA:true,
        cartoonB:false
      })
    }
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