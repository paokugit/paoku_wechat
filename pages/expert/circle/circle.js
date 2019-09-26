var t = getApp(),
  a = t.requirejs("core"),
  s = t.requirejs("jquery");
var f = getApp(); 

var useropenid = "";

Page({
  data: { 
    globalimg: t.globalData.appimg, 
    showIcon: true,
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

    notlogindis: 'block'
  }, 

  
  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;
    var m = this;

    m.pageData();
  },

  // 数据请求
  pageData:function(){
    var m = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    a.get("drcircle.index.index",{
      openid: useropenid,
      page:m.data.page
    },function(e){
      console.log(e);
      wx.hideLoading()
      if(e.error == 0){ 
        let totalList = e.message.list;
        let totalPage = Math.ceil(e.message.total / 10);
      
        if (e.message.count > 0) {
          m.setData({
            isShow: true,
            updateData: e.message.count,
          })
          setTimeout(function () {
            m.setData({ isShow: false })
          }, 3000)
        }
        if (e.message.list.length == 0){
          m.setData({
            abcShow:true
          })
        }else{
          m.setData({
            dataList: m.data.dataList.concat(totalList),
            totalPage: totalPage,
            page: m.data.page + 1
          })
        }
      }else if(e.error == 1){
        wx.showToast({
          title: e.message,
          icon: 'none',
          duration: 2000
        })
      } 
    })
  },

  // 进入商品详情
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
          collectStatus = true;
          message[i].support = parseInt(message[i].support) + 1;
          message[i].zan_count = parseInt(message[i].zan_count) + 1;
          a.get("drcircle.my.support", {
            openid: useropenid,
            content_id: supportId,
            type: 1  
          }, function (e) {
            console.log(e);
            if(e.error == 2){
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
            content_id: supportId,
            type: 1
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

  // 图片上传
  chooseimage: function (options){
    let m = this;
    let select = options.currentTarget.dataset.select;
    let img_list = m.data.img_url;
    wx.chooseImage({
      count: 9 - img_list.length, 
      sizeType: ['compressed'], 
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
    var s = this;
    var src = event.currentTarget.dataset.src;
    var imgList = event.currentTarget.dataset.list;
    var listId = event.currentTarget.dataset.listid;
    let message = s.data.dataList;

    var imgArr = [];
    for (var i = 0; i < imgList.length; i++) {
      imgArr.push(imgList[i]);
    }
    wx.previewImage({
      current: src,
      urls: imgArr
    })
    a.get("drcircle.index.detail", {
      openid: useropenid,
      ciclre_id: listId
    }, function (e) {
      if(e.error == 0){
        for(let i in message){
          if(message[i].id == listId){
            message[i].view_count = parseInt(message[i].view_count) + 1
          }
        }
        s.setData({
          dataList: message
        })
      }
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

    m.getUserInfo();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
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
    this.pageData();
  },
})